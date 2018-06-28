<template>
  <div class="left-fixed-container">
    <v-list subheader>
      <v-subheader class="dark-text">Friends</v-subheader>
        <v-divider class="light-background "></v-divider>
        <AppSpinner></AppSpinner>
        <div class="fixed-height-scroll" v-if="Authentication.friends_obj">
          <template v-for="(item, index) in Authentication.friends_obj">
            <AppFriend :type="'green'" :data="item" :key="index"></AppFriend>
          </template>
        </div>
      </v-list>
  </div>
</template>

<script>
import Friend from '../components/Friend'
import { mapState, mapActions } from 'vuex'
import Spinner from './Spinner'
export default {
  components: {
    AppFriend: Friend,
    AppSpinner: Spinner,
  },
  computed: {
    ...mapState ([
      'Authentication'
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
