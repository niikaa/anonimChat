<template>
  <div class="right-fixed-container">
    <div class="blur-comp" v-if="BlueChat.loading"></div>
    <v-list subheader>
      <v-subheader class="dark-text">
        <p class="header-pharagraph">
          Conversations
        </p>
      </v-subheader>
        <v-divider class="light-background "></v-divider>
        <div class="fixed-height-scroll">
          <div v-infinite-scroll="scrollConversations" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
              <template v-for="(item, index) in BlueChat.conversations">
                <AppBlueConversation :key="index" :data="item" ></AppBlueConversation>
              </template>
          </div>
        </div>
      </v-list>
  </div>
</template>

<script>
import ConvMixin from '../mixins/conversations'
import BlueConversation from '../components/Conversations/blueConv.vue'
import { mapState, mapActions } from 'vuex'

export default {
  mixins:[ConvMixin],
  data() {
    return {
    }
  },
  components: {
    AppBlueConversation: BlueConversation
  },
  computed: {
    ...mapState ([
      'BlueChat'
    ]),
    // isFetching() {
    //   return this.Authentication.isFetching
    // }
  },
  methods: {
    ...mapActions([
      'BLClearConversation',
      'BLConversationsScrollDown',
      'BLConversationsScrollInitiate'
    ]),
    scrollConversations(){
      this.getConversationsForBlue(this.BlueChat.skip, this.BlueChat.limit)
      this.BLConversationsScrollDown();
    }
  },
  beforeMount () {
    this.BLConversationsScrollInitiate()
    this.BLClearConversation();
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
