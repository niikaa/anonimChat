<template>
  <div v-if="BlueChat.conversation_id" class="fill-area">
    <audio ref="bluemessagesound" src="/static/sounds/intuition.mp3"></audio>
    <AppComponentLoader v-if="BlueChat.conversation_isFetching"></AppComponentLoader>
    <v-subheader class="subheader dark-text">
      Friend info
    </v-subheader>

    <emoji-picker @emoji="insert" :search="search">
        <div class="emoji-invoker" slot="emoji-invoker" slot-scope="{ events }" v-on="events" >
            <button type="button" style="zoom: 250%; color: #42a5f5">&#9786</button>
        </div>
        
        <div class="emojis-container" slot="emoji-picker" slot-scope="{ emojis, insert, display }">
            <div>
                <div>
                    <input type="text" v-model="search">
                </div>
                <div>
                    <div v-for="(emojiGroup, category) in emojis" :key="category">
                        <div v-if="category == 'People' || category == 'Nature' || category == 'Objects'">
                          <h5>{{ category }}</h5>
                          <div>
                              <span
                                  v-for="(emoji, emojiName) in emojiGroup"
                                  :key="emojiName"
                                  @click="insert(emoji)"
                                  :title="emojiName"
                                  style="cursor:pointer"
                              >{{ emoji }}</span>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </emoji-picker>


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
            <input v-model="userMessage" type="text" class="chat-input"  @focus="handleFocus()">
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
import { sendMessage , openConversation} from '../../constants'
import socket from '../../socket'
import EmojiPicker from 'vue-emoji-picker'

export default {
  mixins:[ConvMixin],
  data() {
    return {
      userMessage: '',
      search: ''
    }
  },
  components: {
    EmojiPicker,
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
      'BLRemoveActiveConversation',
      'BLRemoveFromUnreadConversations',
      'BLSeenOnFocus'
    ]),
    insert(emoji) {
      this.userMessage += emoji
    },
    handleSendMSG() {
      const data = {
        conversation_id: this.BlueChat.conversation_id,
        sender_id: this.Authentication.userResponse.id,
        chat_message: this.userMessage
      }
      if (this.userMessage.trim() !== '') {
        this.userMessage = ''
        this.$http.post(sendMessage, {data}).then(response => {
          if (response.body.status === 200) {
            socket.emit('SEND_BLUE_CHAT_MESSAGE', {message: response.body.message, initTargets: response.body.initTargets, targetTargets: response.body.targetTargets, conversation_id: this.BlueChat.conversation_id })
          } else {
          }
        }, () => {
          this.userMessage = ''
        })
      }
    },
    handleFocus() {
      if (this.BlueChat.unreadConversations.includes(this.BlueChat.conversation_id)) {
        this.BLRemoveFromUnreadConversations(this.BlueChat.conversation_id)
      }
      if(this.BlueChat.messages[this.BlueChat.messages.length - 1]){
        if(this.Authentication.userResponse.id != this.BlueChat.messages[this.BlueChat.messages.length - 1].sender_id){
          this.$http.post(openConversation, {conversation_id: this.BlueChat.conversation_id, }).then(response => {
          }, () => {
          })
          this.BLSeenOnFocus(this.BlueChat.conversation_id)
        }
      }
    },
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
        if(this.BlueChat.conversation_id == data.conversation_id) {
          if (this.Authentication.userResponse.id !== data.sender_id) {
            this.$refs.bluemessagesound.play()
          }
          this.BLAddMessage(data)
        }
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
