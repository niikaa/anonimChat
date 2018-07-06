<template>
  <v-container>
    <AppFriendsList></AppFriendsList>
    <AppConversationsList></AppConversationsList>
    <div class="middle-fixed-container">
      <AppComponentLoader v-if="BlueChat.loading"></AppComponentLoader>
      <AppFriendCard></AppFriendCard>
      <AppChat></AppChat>
    </div>
  </v-container>
</template>

<script>
import FriendsList from './FriendsList'
import ComponentLoader from '../components/Loaders/ComponentLoader'
import FriendCard from './FriendCard'
import Chat from './Chat'
import ConversationsList from './ConversationsList'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'BlueChat'
    ])
  },
  components: {
    AppFriendsList: FriendsList,
    AppFriendCard: FriendCard,
    AppComponentLoader: ComponentLoader,
    AppChat: Chat,
    AppConversationsList: ConversationsList,
  }
}
</script>

<style>

</style>
