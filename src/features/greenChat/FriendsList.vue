<template>
  <div class="left-fixed-container">
    <v-list subheader>
      <v-subheader class="dark-text">Friends</v-subheader>
        <v-divider class="light-background "></v-divider>
        <div class="fixed-height-scroll" v-if="Authentication.userResponse">
          <template v-for="(item, index) in Authentication.userResponse.friends.data">
            <AppFriend :type="'green'" :data="item" :key="index"></AppFriend>
          </template>
        </div>
      </v-list>
  </div>
</template>

<script>
import Friend from '../components/Friend'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    AppFriend: Friend
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
