<template>
  <div class="left-fixed-container">
    <div class="blur-comp" v-if="BlueChat.loading"></div>
    <v-list subheader>
      <v-subheader class="dark-text">Friends</v-subheader>
        <v-divider class="light-background "></v-divider>
        <AppSpinner></AppSpinner>
        <div class="fixed-height-scroll" v-if="Authentication.friends_obj">
          <template v-for="(item, index) in arrayShuffle(Authentication.friends_obj)">
            <AppFriend :data="item" :key="index"></AppFriend>
          </template>
        </div>
      </v-list>
  </div>
</template>

<script>
import BlueFriend from '../components/Friend/BlueFriend'
import { mapState, mapActions } from 'vuex'
import Spinner from './Spinner'
import SharedMixin from '../mixins/shared'
export default {
  mixins: [SharedMixin],
  components: {
    AppFriend: BlueFriend,
    AppSpinner: Spinner,
  },
  computed: {
    ...mapState ([
      'Authentication',
      'BlueChat'
    ]),
    isFetching() {
      return this.Authentication.isFetching
    }
  },
  methods: {
    ...mapActions([
      'setActiveFriends'
    ]),
  },
  mounted () {
    setInterval(() => {
      this.setActiveFriends(this.Authentication.friends_ids)
    }, 2500)
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
