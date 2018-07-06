<template>
  <div v-if="BlueChat.conversation_id" class="fill-area">
    <AppComponentLoader v-if="BlueChat.conversation_isFetching"></AppComponentLoader>
    <v-subheader class="subheader dark-text">
      Friend info
    </v-subheader>
    <v-divider class="divider light-background"></v-divider>
    <div class="chat-container" id="ablaku">
        <v-layout row v-for="(item, index) in BlueChat.messages" :key="index">
          <v-flex xs-12 v-if="item.sender_id === Authentication.userResponse.id">
            <div class="chat-my-msg color-blue-lighten-background">
              {{item.chat_message}}
            </div>
          </v-flex>
          <v-flex xs-12 v-else>
            <div class="chat-partner-msg">
              {{item.chat_message}}
            </div>
          </v-flex>
        </v-layout>
    </div>
    <div class="bottom-line">
      <form v-on:submit.prevent @keyup.enter.prevent="handleSendMSG()">
        <v-layout row>
          <v-flex xs-12>
            <input v-model="userMessage" type="text" class="chat-input" >
            <div class="overed-rows">
              <v-btn type="button" flat icon color="blue lighten-1" @click="handleSendMSG()">
                <v-icon>send</v-icon>
              </v-btn>
            </div>
          </v-flex>
        </v-layout>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ConvMixin from '../mixins/conversations'
import ComponentLoader from '../components/Loaders/ComponentLoader'
import { sendBlueMessage } from '../../constants'
import socket from '../../socket'
export default {
  mixins:[ConvMixin],
  data() {
    return {
      userMessage: ''
    }
  },
  computed: {
    ...mapState([
      'Authentication',
      'BlueChat',
    ]),
    isFetching() {
      return this.BlueChat.conversation_isFetching
    }
  },
  methods: {
    ...mapActions([
      'BLChangeChatFetchStatus',
      'BLAddMessage',
      'BLConnectMessageSocket',
      'BLRemoveActiveConversation'
    ]),
    handleSendMSG() {
      const data = {
        conversation_id: this.BlueChat.conversation_id,
        sender_id: this.Authentication.userResponse.id,
        chat_message: this.userMessage
      }
      if (this.userMessage !== '') {
        this.$http.post(sendBlueMessage, {data}).then(response => {
          if (response.body.status === 200) {
            socket.emit('SEND_BLUE_CHAT_MESSAGE', {message: response.body.message, targets: response.body.targets, conversation_id: this.BlueChat.conversation_id })
          } else {
          }
          this.userMessage = ''
        }, () => {
          this.userMessage = ''
        })
      }
    }
  },
  components: {
    AppComponentLoader: ComponentLoader
  },
  updated() {
    if (this.$el.querySelector) {
      this.$el.querySelector(".chat-container").scrollTop = this.$el.querySelector(".chat-container").scrollHeight;
    }
  },
  beforeDestroy(){
    this.BLRemoveActiveConversation();
  },

  mounted () {
    if(!this.BlueChat.messageSocketConnected){
      socket.on('BLUE_CHAT_MSG_RECEIVE', (data) => {
        this.manageNewConversationForBlue(data.conversation_id)
        this.BLAddMessage(data)
      })
      this.BLConnectMessageSocket();
    }
    setTimeout(() => {
      this.BLChangeChatFetchStatus(false)
    }, 300)
  },
  watch: {
    isFetching(oldVal, newVal) {
      setTimeout(() => {
        this.BLChangeChatFetchStatus(false)
      }, 300)
    }
  }
}
</script>
