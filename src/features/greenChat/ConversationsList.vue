<template>
  <div class="right-fixed-container">
    <v-list subheader>
      <v-subheader class="dark-text">Conversations</v-subheader>
        <v-divider class="light-background "></v-divider>
        <div class="fixed-height-scroll">
          <div v-infinite-scroll="scrollConversations" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
              <template v-for="(item, index) in GreenChat.conversations">
                <AppConversation :key="index" :data="item"></AppConversation>
              </template>
          </div>
        </div>
      </v-list>
  </div>
</template>

<script>
import ConvMixin from '../mixins/conversations'
import Conversation from '../components/Conversation'
import { mapState, mapActions } from 'vuex'

export default {
  mixins:[ConvMixin],
  data() {
    return {
      skip: 0,
      limit: 20
    }
  },
  components: {
    AppConversation: Conversation
  },
  computed: {
    ...mapState ([
      'GreenChat'
    ]),
    isFetching() {
      return this.Authentication.isFetching
    }
  },
  methods: {
    ...mapActions([
      'setActiveFriends'
    ]),
    scrollConversations(){
      this.getConversations(this.skip, this.limit)
      this.skip += this.limit
    }
  },
  beforeMount () {
    //this.getConversations()
  },
  watch: {
    isFetching(oldVal, newVal) {
      if (newVal) {
        this.setActiveFriends(this.Authentication.friends_ids)
      }
    }
  }
}
</script>
