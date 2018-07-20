<template>
  <div v-if="RedChat.conversation_id" class="fill-area">
  <audio ref="redmessagesound" src="/static/sounds/intuition.mp3"></audio>
    <AppComponentLoader v-if="RedChat.conversation_isFetching"></AppComponentLoader>
    <v-subheader class="subheader dark-text">
      Messages
      <div class="message-sound-btn">
        <v-btn flat icon color="red lighten-1" @click="changeNotificationSound()">
          <v-icon v-if="notificationSound">music_note</v-icon>
          <v-icon v-else>music_off</v-icon>
        </v-btn>
      </div>
    </v-subheader>
    <AppEmojiComponent v-model="userMessage" :userMessage="userMessage" color="#ef5350"></AppEmojiComponent>
    <v-divider class="divider light-background"></v-divider>
    <div class="chat-container" id="ablaku" ref="scrollWrapperRed">
      <infinite-loading @infinite="doScroll" direction="top" ref="infiniteLoading" :distance="0" >
          <span slot="no-more">
            Start of conversation
          </span>
        </infinite-loading>
        <v-layout row v-for="(item, index) in RedChat.messages" :key="index">
          <v-flex xs-12 v-if="item.sender_id === Authentication.userResponse.id">
            <div class="chat-my-msg color-red-lighten-background">
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
            <input v-model="userMessage" type="text" class="chat-input" @focus="handleFocus()">
            <div class="overed-rows">
              <v-btn type="button" flat icon color="red lighten-1" @click="handleSendMSG()">
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
import { sendMessage, openConversation, getMessages, getConversation } from '../../constants'
import socket from '../../socket'
import InfiniteLoading from 'vue-infinite-loading';
import EmojiComponent from '../components/Emoji'

export default {
  mixins:[ConvMixin],
  data() {
    return {
      userMessage: '',
      notificationSound: true,
      search: '',
      skip: 0,
      limit: 50,
      notScroll: false,
      height: 0
    }
  },
  computed: {
    ...mapState([
      'Authentication',
      'RedChat',
    ]),
    isFetching() {
      return this.RedChat.conversation_isFetching
    },
    conversationId() {
      return this.RedChat.conversation_id
    }
  },
  methods: {
    ...mapActions([
      'RDChangeChatFetchStatus',
      'RDAddMessage',
      'RDConnectMessageSocket',
      'RDRemoveActiveConversation',
      'RDRemoveFromUnreadConversations',
      'RDSeenOnFocus',
      'RDStickConversationMessages',
      'RDClearMessages'
    ]),
    changeNotificationSound() {
      this.notificationSound = !this.notificationSound
    },
    handleSendMSG() {
      const data = {
        conversation_id: this.RedChat.conversation_id,
        sender_id: this.Authentication.userResponse.id,
        chat_message: this.userMessage
      }
      if (this.userMessage.trim() !== '') {
        this.userMessage = ''
        this.$http.post(sendMessage, {data}).then(response => {
          if (response.body.status === 200) {
            socket.emit('SEND_RED_CHAT_MESSAGE', {message: response.body.message, initTargets: response.body.initTargets, targetTargets: response.body.targetTargets, conversation_id: this.RedChat.conversation_id })
            // socket.emit('SEND_BLUE_CHAT_MESSAGE', {message: response.body.message, targets: response.body.targets, conversation_id: this.RedChat.conversation_id })
          } else {
          }
        }, () => {
          this.userMessage = ''
        })
      }
    },
    handleFocus() {
      if (this.RedChat.unreadConversations.includes(this.RedChat.conversation_id)) {
        this.RDRemoveFromUnreadConversations(this.RedChat.conversation_id)
      }
      if(this.RedChat.messages[this.RedChat.messages.length - 1]){
        if(this.Authentication.userResponse.id != this.RedChat.messages[this.RedChat.messages.length - 1].sender_id){
          this.$http.post(openConversation, {conversation_id: this.RedChat.conversation_id, }).then(response => {
          }, () => {
          })
          this.RDSeenOnFocus(this.RedChat.conversation_id)
        }
      }
    },
    getMessagesPagination(callback){
      if(this.RedChat.conversation_id){
        this.$http.get(getMessages,{params: {conversation_id: this.RedChat.conversation_id, skip: this.skip, limit: this.limit }}).then(response => {
            if (response.body.status === 200) {
              if(response.data.data.messages){
                this.RDStickConversationMessages(response.data.data.messages)
                if(callback) callback(false, true);
              }
              else if(callback) callback(true, false);
              if (this.RedChat.unreadConversations.includes(this.RedChat.conversation_id)) {
                this.RDRemoveFromUnreadConversations(this.RedChat.conversation_id)
              }
            }
        },()=>{
        })
      }
    },
    doScroll($state){
      this.notScroll = true;
      this.skip += this.limit;
      var self = this
      this.getMessagesPagination(function(stop, go) {
        if(go){
          self.height = self.$refs.scrollWrapperRed.scrollHeight
          $state.loaded()
        }
        else if (stop){
          $state.loaded()
          $state.complete()
        }
      });
    }
  },
  components: {
    AppComponentLoader: ComponentLoader,
    AppEmojiComponent: EmojiComponent,
    InfiniteLoading,
  },
  updated() {
    if (this.$el.querySelector && !this.notScroll) {
      this.$el.querySelector(".chat-container").scrollTop = this.$el.querySelector(".chat-container").scrollHeight;
    }
    this.notScroll = false;
  },
  beforeDestroy(){
    this.RDRemoveActiveConversation();
  },

  mounted () {
    if(!this.RedChat.messageSocketConnected){
      socket.on('RED_CHAT_MSG_RECEIVE', (data) => {
        this.skip++;
        this.manageNewConversationForRed(data.conversation_id)
        if(this.RedChat.conversation_id == data.conversation_id) {
          if (this.Authentication.userResponse.id !== data.sender_id && this.notificationSound) {
            this.$refs.redmessagesound.play()
          }
          this.RDAddMessage(data)
        }
      })
      this.RDConnectMessageSocket();
    }
    setTimeout(() => {
      this.RDChangeChatFetchStatus(false)
    }, 300)
  },
  watch: {
    isFetching(oldVal, newVal) {
      setTimeout(() => {
        this.RDChangeChatFetchStatus(false)
      }, 300)
    },
    conversationId(oldVal, newVal) {
      this.skip = 0;
      this.limit = 50;
      if(this.$refs.infiniteLoading)
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')

      this.RDClearMessages()
      this.getMessagesPagination()
    },
    height: function(newVal,oldVal){
      var diff = newVal - oldVal;
      this.$refs.scrollWrapperRed.scrollTop = diff + 60
    }
  }
}
</script>
