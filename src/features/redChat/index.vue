<template>
  <v-container>
    <AppFriendsList></AppFriendsList>
  </v-container>
</template>

<script>
import FriendsList from './FriendsList'
import ComponentLoader from '../components/Loaders/ComponentLoader'
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
  }
}
</script>

<style>

</style>
