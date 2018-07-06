<template>
  <v-container>
    <AppFriendsList></AppFriendsList>
    <AppConversationsList></AppConversationsList>
    <div class="middle-fixed-container">
      <AppComponentLoader v-if="RedChat.loading"></AppComponentLoader>
      <AppFriendCard></AppFriendCard>
      <AppChat></AppChat>
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
      'RedChat'
    ])
  },
  components: {
    AppFriendsList: FriendsList,
    AppComponentLoader: ComponentLoader,
    AppFriendCard: FriendCard,
    AppChat: Chat,
    AppConversationsList: ConversationsList
  }
}
</script>

<style>

</style>
