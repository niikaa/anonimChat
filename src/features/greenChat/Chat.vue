<template>
  <div v-if="GreenChat.conversation_id" class="fill-area">
    <audio ref="greenmessagesound" src="/static/sounds/intuition.mp3"></audio>
    <AppComponentLoader v-if="GreenChat.conversation_isFetching"></AppComponentLoader>
    <v-subheader class="subheader dark-text">
      Friend info
    </v-subheader>
    <v-divider class="divider light-background"></v-divider>
    <div class="chat-container" id="ablaku">
        <v-layout row v-for="(item, index) in GreenChat.messages" :key="index">
          <v-flex xs-12 v-if="item.sender_id === Authentication.userResponse.id">
            <div class="chat-my-msg color-green-lighten-background">
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
            <input v-model="userMessage" type="text" class="chat-input" @focus="handleFocus()" >
            <div class="overed-rows">
              <v-btn type="button" flat icon color="green lighten-1" @click="handleSendMSG()">
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
import { sendMessage, openConversation } from '../../constants'
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
      'GreenChat',
    ]),
    isFetching() {
      return this.GreenChat.conversation_isFetching
    }
  },
  methods: {
    ...mapActions([
      'GRChangeChatFetchStatus',
      'GRAddMessage',
      'GRConnectMessageSocket',
      'GRRemoveActiveConversation',
      'GRRemoveFromUnreadConversations',
      'GRSeenOnFocus'
    ]),
    handleFocus() {
      if (this.GreenChat.unreadConversations.includes(this.GreenChat.conversation_id)) {
        this.GRRemoveFromUnreadConversations(this.GreenChat.conversation_id)
      }
      if(this.GreenChat.messages[this.GreenChat.messages.length - 1]){
        if(this.Authentication.userResponse.id != this.GreenChat.messages[this.GreenChat.messages.length - 1].sender_id){
          this.$http.post(openConversation, {conversation_id: this.GreenChat.conversation_id, }).then(response => {
          }, () => {
          })
          this.GRSeenOnFocus(this.GreenChat.conversation_id)
        }
      }
    },
    handleSendMSG() {
      const data = {
        conversation_id: this.GreenChat.conversation_id,
        sender_id: this.Authentication.userResponse.id,
        chat_message: this.userMessage
      }
      if (this.userMessage.trim() !== '') {
        this.userMessage = ''
        this.$http.post(sendMessage, {data}).then(response => {
          if (response.body.status === 200) {
            socket.emit('SEND_GREEN_CHAT_MESSAGE', {message: response.body.message,initTargets: response.body.initTargets, targetTargets: response.body.targetTargets, conversation_id: this.GreenChat.conversation_id })
          } else {
          }
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
    this.GRRemoveActiveConversation();
  },

  mounted () {
    if(!this.GreenChat.messageSocketConnected){
      socket.on('GREEN_CHAT_MSG_RECEIVE', (data) => {
        this.manageNewConversationForGreen(data.conversation_id)
        if(this.GreenChat.conversation_id == data.conversation_id) {
          if (this.Authentication.userResponse.id !== data.sender_id) {
            this.$refs.greenmessagesound.play()
          }
          this.GRAddMessage(data)
        }
      })
      this.GRConnectMessageSocket();
    }
    setTimeout(() => {
      this.GRChangeChatFetchStatus(false)
    }, 300)
  },
  watch: {
    isFetching(oldVal, newVal) {
      setTimeout(() => {
        this.GRChangeChatFetchStatus(false)
      }, 300)
    }
  }
}
</script>
