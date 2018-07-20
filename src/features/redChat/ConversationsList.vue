<template>
  <div class="right-fixed-container">
    <div class="blur-comp" v-if="RedChat.loading"></div>
    <v-list subheader>
      <v-subheader class="dark-text">
        <p class="header-pharagraph">
          Conversations
        </p>
      </v-subheader>
        <v-divider class="light-background "></v-divider>
        <div class="fixed-height-scroll">
          <div v-infinite-scroll="scrollConversations" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
              <template v-for="(item, index) in RedChat.conversations">
                <AppRedConversation :key="index" :data="item" ></AppRedConversation>
              </template>
          </div>
        </div>
      </v-list>
  </div>
</template>

<script>
import ConvMixin from '../mixins/conversations'
import RedConversation from '../components/Conversations/redConv.vue'
import { mapState, mapActions } from 'vuex'

export default {
  mixins:[ConvMixin],
  data() {
    return {
    }
  },
  components: {
    AppRedConversation: RedConversation
  },
  computed: {
    ...mapState ([
      'RedChat'
    ]),
    // isFetching() {
    //   return this.Authentication.isFetching
    // }
  },
  methods: {
    ...mapActions([
      'RDClearConversation',
      'RDConversationsScrollDown',
      'RDConversationsScrollInitiate'
    ]),
    scrollConversations(){
      this.getConversationsForRed(this.RedChat.skip, this.RedChat.limit)
      this.RDConversationsScrollDown();
    }
  },
  beforeMount () {
    this.RDConversationsScrollInitiate()
    this.RDClearConversation();
  },

  watch: {
    // isFetching(oldVal, newVal) {
    //   if (newVal) {
    //     this.setActiveFriends(this.Authentication.friends_ids)
    //   }
    // }
  }
}
</script>
