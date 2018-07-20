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
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState([
      'RedChat'
    ])
  },
  methods: {
    ...mapActions([
      'RDSetConversation',
      'RDClearMessages'
    ]),
  },
  // created(){
  //   if(this.$route.query.conversation){
  //     this.RDClearMessages() 
  //     this.RDSetConversation(this.$route.query.conversation)
  //   }
  // },
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
