<template>
  <v-container>
    <AppFriendsList></AppFriendsList>
    <div class="middle-fixed-container">
      <AppChat></AppChat>
    </div>
  </v-container>
</template>

<script>
import FriendsList from './FriendsList'
import Chat from './Chat'
export default {
  components: {
    AppFriendsList: FriendsList,
    AppChat: Chat,
  }
}
</script>

<style>

</style>
