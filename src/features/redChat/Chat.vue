<template>
  <div v-if="RedChat.conversation_id" class="fill-area">
    <AppComponentLoader v-if="RedChat.conversation_isFetching"></AppComponentLoader>
    <v-subheader class="subheader dark-text">
      Friend info
    </v-subheader>

    <emoji-picker @emoji="insert" :search="search">
        <div class="emoji-invoker" slot="emoji-invoker" slot-scope="{ events }" v-on="events" >
            <button type="button" style="zoom: 250%; color: red">&#9786</button>
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
import EmojiPicker from 'vue-emoji-picker'
import InfiniteLoading from 'vue-infinite-loading';

export default {
  mixins:[ConvMixin],
  data() {
    return {
      userMessage: '',
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
    insert(emoji) {
      this.userMessage += emoji
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
    InfiniteLoading,
    EmojiPicker
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
        if(this.RedChat.conversation_id == data.conversation_id)
          this.RDAddMessage(data)
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
