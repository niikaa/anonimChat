<template>
  <v-container>
    <AppFriendsList></AppFriendsList>
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
  }
}
</script>

<style>

</style>
