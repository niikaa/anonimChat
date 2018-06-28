<template>
  <v-container>
    <AppFriendsList></AppFriendsList>
    <AppConversationsList></AppConversationsList>
    <div class="middle-fixed-container">
      <AppComponentLoader v-if="GreenChat.loading"></AppComponentLoader>
      <AppChat></AppChat>
      <AppFriendCard></AppFriendCard>
    </div>
  </v-container>
</template>

<script>
import FriendsList from './FriendsList'
import ComponentLoader from '../components/Loaders/ComponentLoader'
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
    AppComponentLoader: ComponentLoader,
  }
}
</script>

<style>

</style>
