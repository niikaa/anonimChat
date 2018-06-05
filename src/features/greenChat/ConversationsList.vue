<template>
  <div class="right-fixed-container">
    <v-list subheader>
      <v-subheader class="dark-text">Conversations</v-subheader>
        <v-divider class="light-background "></v-divider>

      </v-list>
  </div>
</template>

<script>
import Conversation from '../components/Conversation'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    AppConversation: Conversation
  }
}
</script>
