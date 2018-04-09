<template>
  <v-container>
    <AppFriendsList></AppFriendsList>
    <div class="middle-fixed-container">
      <!--<AppChat></AppChat>-->
      <!--<div v-if="GreenChat.active_friend_id">
        asdasd
      </div>-->
      <AppFriendCard></AppFriendCard>
    </div>
  </v-container>
</template>

<script>
import FriendsList from './FriendsList'
import FriendCard from './FriendCard'
import Chat from './Chat'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'GreenChat'
    ])
  },
  components: {
    AppFriendsList: FriendsList,
    AppChat: Chat,
    AppFriendCard: FriendCard,
  }
}
</script>

<style>

</style>
