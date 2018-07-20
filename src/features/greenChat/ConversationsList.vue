<template>
  <div class="right-fixed-container">
    <div class="blur-comp" v-if="GreenChat.loading"></div>
    <v-list subheader>
      <v-subheader class="dark-text">
        <p class="header-pharagraph">
          Conversations
        </p>
      </v-subheader>
        <v-divider class="light-background "></v-divider>
        <div class="fixed-height-scroll">
          <div v-infinite-scroll="scrollConversations" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
              <template v-for="(item, index) in GreenChat.conversations">
                <AppGreenConversation :key="index" :data="item" ></AppGreenConversation>
              </template>
          </div>
        </div>
      </v-list>
  </div>
</template>

<script>
import ConvMixin from '../mixins/conversations'
import GreenConversation from '../components/Conversations/greenConv.vue'
import { mapState, mapActions } from 'vuex'

export default {
  mixins:[ConvMixin],
  data() {
    return {
    }
  },
  components: {
    AppGreenConversation: GreenConversation
  },
  computed: {
    ...mapState ([
      'GreenChat'
    ]),
    // isFetching() {
    //   return this.Authentication.isFetching
    // }
  },
  methods: {
    ...mapActions([
      'GRClearConversation',
      'GRConversationsScrollDown',
      'GRConversationsScrollInitiate'
    ]),
    scrollConversations(){
      this.getConversationsForGreen(this.GreenChat.skip, this.GreenChat.limit)
      this.GRConversationsScrollDown();
    }
  },
  beforeMount () {
    this.GRConversationsScrollInitiate()
    this.GRClearConversation();
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
