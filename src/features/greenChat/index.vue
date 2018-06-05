<template>
  <v-container>
    <AppFriendsList></AppFriendsList>
    <AppConversationsList></AppConversationsList>
    <div class="middle-fixed-container">
      <AppChat></AppChat>
      <AppFriendCard></AppFriendCard>
    </div>
  </v-container>
</template>

<script>
import FriendsList from './FriendsList'
import ConversationsList from './ConversationsList'
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
    AppConversationsList: ConversationsList,
  }
}
</script>

<style>

</style>
