<template>
  <div v-if="GreenChat.conversation_id" class="fill-area">
    <AppComponentLoader v-if="GreenChat.conversation_isFetching"></AppComponentLoader>
    <div class="subheader dark-text">
      Friend info
    </div>
    <hr class="divider light-background">
    <div class="chat-container">
      <v-layout row>
        <v-flex xs-12>
          <div class="chat-my-msg">
            Gamarjoba
          </div>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs-12>
          <div class="chat-partner-msg">
            Gamarjoba
          </div>
        </v-flex>
      </v-layout><v-layout row>
        <v-flex xs-12>
          <div class="chat-my-msg">
            Gamarjoba
          </div>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs-12>
          <div class="chat-partner-msg">
            Gamarjoba
          </div>
        </v-flex>
      </v-layout>
    </div>
    <div class="bottom-line">
      <form>
        <v-layout row>
          <v-flex xs-12>
            <input type="text" class="chat-input" >
            <div class="overed-rows">
              <v-btn flat icon color="blue">
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
export default {
  computed: {
    ...mapState([
      'GreenChat'
    ]),
    isFetching() {
      return this.GreenChat.conversation_isFetching
    }
  },
  methods: {
    ...mapActions([
      'GRChangeChatFetchStatus'
    ])
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

