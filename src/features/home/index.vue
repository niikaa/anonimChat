<template>
  <div>
      <sweet-modal overlay-theme="dark" modal-theme="dark" ref="green_chat" title="Green Chat Instructions">
        This feature gives you the ability to chat with your facebook friends anonymously so that
        you have no idea who you're texting and the one you're texting also has no idea about who you're.
        Sometimes It's really fun to mess with your friends, ask them questions and just play the game where 
        you have to guess who It is you're messaging to. So, It's 100% anonymous from both side(your and your partner).
      </sweet-modal>

      <sweet-modal overlay-theme="dark" modal-theme="dark" ref="red_chat" title="Red Chat Instructions">
        This feature gives you the ability to chat with your facebook friends anonymously so that
        you know who you're texting but she/he has no idea who you're. Why not? Sometimes we want to fuck with specific person
        and we never want him/her to know who we're. So, It's 50% anonymous. You know your partner, but she/he doesn't know who you're. 
      </sweet-modal>

      <sweet-modal overlay-theme="dark" modal-theme="dark" ref="blue_chat" title="Blue Chat Instructions">
        This feature gives you the ability to chat with your facebook friends anonymously so that
        you have no idea who you're texting, but the one you're texting knows who you're. You can tell people
        how you hate them or things like that. Sometimes we want to be known, but we never want to know who we're giving our secrets.
        So It's 50% anonymous, you don't know your partner, but she/he knows who you're.
      </sweet-modal>


    <v-layout row wrap class="menu-pad">
      <v-flex xs12 md4 class="ann-card green-card">
        <div class="text-xs-center verticaly-cnt">
          <h3 class="ann-h3">Green Chat</h3>
          
          <div class="text-xs-center ann-separated-line">
            <v-badge overlap color="red" class="separated-badge">
              <span slot="badge">{{GreenChat.unreadConversations.length}}</span>
              <v-icon large color="grey lighten-4" >
                chat_bubble
              </v-icon>
            </v-badge>
            <v-badge overlap color="red" class="separated-badge">
              <v-icon @mouseover="openGreenNotifications" large color="grey lighten-4" >
                announcement
              </v-icon>
               
            </v-badge>
          </div>
          <div class="text-xs-center ann-separated-line">
            <v-btn @click="redirectToGreenChat()" round large color="grey lighten-4">
              <span class="text-green"> Enter </span>
            </v-btn>
          </div>
        </div>
      </v-flex>

      <v-flex xs12 md4 class="ann-card blue-card">
        <div class="text-xs-center verticaly-cnt">
          <h3 class="ann-h3">Blue Chat</h3>
          <div class="text-xs-center ann-separated-line">
            <v-badge overlap color="red" class="separated-badge">
              <span slot="badge">{{BlueChat.unreadConversations.length}}</span>
              <v-icon  large color="grey lighten-4" >
                chat_bubble_outline
              </v-icon>
            </v-badge>
            <v-badge overlap color="red" class="separated-badge">
              <v-icon @mouseover="openBlueNotifications" large color="grey lighten-4" >
                announcement
              </v-icon>
            </v-badge>
          </div>
          <div class="text-xs-center ann-separated-line">
            <v-btn @click="redirectToBlueChat()" round large color="grey lighten-4">
              <span class="text-blue"> Enter </span>
            </v-btn>
          </div>
        </div>
      </v-flex>

      <v-flex xs12 md4 class="ann-card red-card">
        <div class="text-xs-center verticaly-cnt">
          <h3 class="ann-h3">Red Chat</h3>
          <div class="text-xs-center ann-separated-line">
            <v-badge overlap color="blue lighten-2" class="separated-badge">
              <span slot="badge">{{RedChat.unreadConversations.length}}</span>
              <v-icon large color="grey lighten-4" >
                chat
              </v-icon>
            </v-badge>
            <v-badge overlap color="red" class="separated-badge">
              <v-icon  @mouseover="openRedNotifications" large color="grey lighten-4" >
                announcement
              </v-icon>
            </v-badge>
          </div>

          <div class="text-xs-center ann-separated-line">
            <v-btn @click="redirectToRedChat()" round large color="grey lighten-4">
              <span class="text-red"> Enter </span>
            </v-btn>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
export default {
  data(){
    return{
      showGreenNotification:false,
    }
  },
  computed: {
    ...mapState([
      'Authentication',
      'BlueChat',
      'RedChat',
      'GreenChat'
    ])
  },
 
  methods: {
    redirectToGreenChat(){
      this.$router.push({name: 'GreenChat'})
    },
    redirectToBlueChat(){
      this.$router.push({name: 'BlueChat'})
    },
    redirectToRedChat(){
      this.$router.push({name: 'RedChat'})
    },
    openRedNotifications(){
      this.$refs.red_chat.open();
    },
    openBlueNotifications(){
      this.$refs.blue_chat.open();
    },
    openGreenNotifications(){
      this.$refs.green_chat.open();
    }
  },
  components:{
    SweetModal,
		SweetModalTab
  }
  
  
}
</script>

