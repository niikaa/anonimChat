<template>
  <div v-if="GreenChat.conversation_id" class="fill-area">
    <audio ref="greenmessagesound" src="/static/sounds/intuition.mp3"></audio>
    <AppComponentLoader v-if="GreenChat.conversation_isFetching"></AppComponentLoader>
    <v-subheader class="subheader dark-text">
      Messages
      <div class="message-sound-btn">
        <v-btn flat icon color="green lighten-1" @click="changeNotificationSound()">
          <v-icon v-if="notificationSound">music_note</v-icon>
          <v-icon v-else>music_off</v-icon>
        </v-btn>
      </div>
    </v-subheader>
    <AppEmojiComponent v-model="userMessage" :userMessage="userMessage" color="#66bb6a"></AppEmojiComponent>
    <v-divider class="divider light-background"></v-divider>
    <div class="chat-container" id="ablaku" ref="scrollWrapperGreen" infinite-wrapper>
      <infinite-loading @infinite="doScroll" direction="top" ref="infiniteLoading" :distance="0" >
        <span slot="no-more">
          Start of conversation
        </span>
      </infinite-loading>
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
import { sendMessage, openConversation, getConversation, getMessages } from '../../constants'
import socket from '../../socket'
import EmojiComponent from '../components/Emoji'
import InfiniteLoading from 'vue-infinite-loading'

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
      'GreenChat',
    ]),
    isFetching() {
      return this.GreenChat.conversation_isFetching
    },
    conversationId() {
      return this.GreenChat.conversation_id
    }
  },
  methods: {
    ...mapActions([
      'GRChangeChatFetchStatus',
      'GRAddMessage',
      'GRConnectMessageSocket',
      'GRRemoveActiveConversation',
      'GRRemoveFromUnreadConversations',
      'GRSeenOnFocus',
      'GRStickConversationMessages',
      'GRClearMessages'
    ]),
    changeNotificationSound() {
      this.notificationSound = !this.notificationSound
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
    },
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
    getMessagesPagination(callback){
      if(this.GreenChat.conversation_id){
        this.$http.get(getMessages,{params: {conversation_id: this.GreenChat.conversation_id, skip: this.skip, limit: this.limit }}).then(response => {
            if (response.body.status === 200) {
              if(response.data.data.messages){
                this.GRStickConversationMessages(response.data.data.messages)
                if(callback) callback(false, true);
              }
              else if(callback) callback(true, false);
              if (this.GreenChat.unreadConversations.includes(this.GreenChat.conversation_id)) {
                this.GRRemoveFromUnreadConversations(this.GreenChat.conversation_id)
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
          self.height = self.$refs.scrollWrapperGreen.scrollHeight
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
    InfiniteLoading
  },
  updated() {
    if (this.$el.querySelector && !this.notScroll) {
      this.$el.querySelector(".chat-container").scrollTop = this.$el.querySelector(".chat-container").scrollHeight;
    }
    this.notScroll = false;
  },
  beforeDestroy(){
    this.GRRemoveActiveConversation();
  },
  mounted () {
    if(!this.GreenChat.messageSocketConnected){
      socket.on('GREEN_CHAT_MSG_RECEIVE', (data) => {
        this.skip++;
        this.manageNewConversationForGreen(data.conversation_id)
        if(this.GreenChat.conversation_id == data.conversation_id) {
          if (this.Authentication.userResponse.id !== data.sender_id && this.notificationSound) {
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
    },
    conversationId(oldVal, newVal) {
      this.skip = 0;
      this.limit = 50;
      if(this.$refs.infiniteLoading)
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')

      this.GRClearMessages()
      this.getMessagesPagination()
    },
    height: function(newVal,oldVal){
      var diff = newVal - oldVal;
      this.$refs.scrollWrapperGreen.scrollTop = diff + 60
    }
  }
}
</script>
