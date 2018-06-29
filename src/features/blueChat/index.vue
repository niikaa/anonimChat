<template>
  <v-container>
    <AppFriendsList></AppFriendsList>
    <div class="middle-fixed-container">
      <AppComponentLoader v-if="BlueChat.loading"></AppComponentLoader>
      <AppFriendCard></AppFriendCard>
    </div>
  </v-container>
</template>

<script>
import FriendsList from './FriendsList'
import ComponentLoader from '../components/Loaders/ComponentLoader'
import FriendCard from './FriendCard'
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
  }
}
</script>

<style>

</style>
