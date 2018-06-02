<template>
  <div v-if="GreenChat.conversation_id" class="fill-area">
    <AppComponentLoader v-if="GreenChat.conversation_isFetching"></AppComponentLoader>
    <div class="subheader dark-text">
      Friend info
    </div>
    <hr class="divider light-background">
    <div class="chat-container">
        <v-layout row v-for="(item, index) in GreenChat.messages" :key="index">
          <v-flex xs-12 v-if="item.sender_id === Authentication.userResponse.id">
            <div class="chat-my-msg">
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
      <form>
        <v-layout row>
          <v-flex xs-12>
            <input v-model="userMessage" type="text" class="chat-input" >
            <div class="overed-rows">
              <v-btn type="button" flat icon color="blue" @click="handleSendMSG()">
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
import ComponentLoader from '../components/Loaders/ComponentLoader'
import { sendGreenMessage } from '../../constants'
export default {
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
    ]),
    handleSendMSG() {
      const data = {
        conversation_id: this.GreenChat.conversation_id,
        sender_id: this.Authentication.userResponse.id,
        chat_message: this.userMessage,
        date: Date.now
      }
      if (this.userMessage !== '') {
        this.$http.post(sendGreenMessage, {data}).then(response => {
          if (response.body.status === 200) {
            this.GRAddMessage(data)
            this.userMessage = ''
          } else {

          }
        }, () => {

        })
      }
    }
  },
  components: {
    AppComponentLoader: ComponentLoader
  },
  mounted () {
    setTimeout(() => {
      this.GRChangeChatFetchStatus(false)
    },300)
  },
  watch: {
    isFetching(oldVal, newVal) {
      setTimeout(() => {
        this.GRChangeChatFetchStatus(false)
      },300)
    }
  }
}
</script>

