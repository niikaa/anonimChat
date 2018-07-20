<template>
  <v-toolbar fixed dark :color="tColor">
    <v-toolbar-title class="white--text">Anonim chat</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="Authentication.isLoggedIn" icon @click="redirectToHome">
      <v-badge right color="green lighten-1">
         <v-icon>public</v-icon>
      </v-badge>
    </v-btn>
    <v-btn v-if="Authentication.isLoggedIn" icon @click="redirectToGreenChat">
      <v-badge right color="green lighten-1">
        <span v-if="GreenChat.unreadConversations.length > 0" slot="badge">{{GreenChat.unreadConversations.length }}</span>
        <v-icon>chat_bubble</v-icon>
      </v-badge>
    </v-btn>
    <v-btn v-if="Authentication.isLoggedIn" icon @click="redirectToBlueChat">
      <v-badge right color="blue lighten-1">
        <span v-if="BlueChat.unreadConversations.length > 0" slot="badge">{{BlueChat.unreadConversations.length }}</span>
        <v-icon>chat_bubble_outline</v-icon>
      </v-badge>
    </v-btn>
    <v-btn v-if="Authentication.isLoggedIn" icon @click="redirectToRedChat">
      <v-badge right color="red lighten-1">
        <span v-if="RedChat.unreadConversations.length > 0" slot="badge">{{RedChat.unreadConversations.length }}</span>
        <v-icon>chat</v-icon>
      </v-badge>
    </v-btn>
    <AppSettings></AppSettings>
    <v-btn v-if="!Authentication.isLoggedIn" icon @click="loginWithFacebook()">
      <v-icon>https</v-icon>
    </v-btn>
    <v-btn v-else icon @click="logOutWithFacebook()">
      <v-icon>exit_to_app</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import AuthMixin from '../../mixins/authenticate'
import { mapState, mapActions } from 'vuex'
import {getNotifications} from '../../../constants'
import socket from '../../../socket'
import Settings from './Settings'
export default {
  mixins:[AuthMixin],
  data() {
    return {
      tColor: 'grey lighten-1',
    }
  },
  components: {
    AppSettings: Settings
  },
  computed: {
    ...mapState([
      'Authentication',
      'BlueChat',
      'RedChat',
      'GreenChat'
    ]),
    userId() {
      return this.Authentication.userResponse
    },
    curROute() {
      return this.$route.path
    }
  },
  beforeMount() {
    this.calcToolColor(this.curROute)
  },
  mounted() {
    socket.on('GREEN_CHAT_MSG_RECEIVE', (data) => {
      if (!this.GreenChat.unreadConversations.includes(data.conversation_id) && this.userId.id !== data.sender_id) {
        this.GRAddIntoUnreadConversations(data.conversation_id)
      }
    })
    socket.on('BLUE_CHAT_MSG_RECEIVE', (data) => {
      if (!this.BlueChat.unreadConversations.includes(data.conversation_id) && this.userId.id !== data.sender_id) {
        this.BLAddIntoUnreadConversations(data.conversation_id)
      }
    })
    socket.on('RED_CHAT_MSG_RECEIVE', (data) => {
      if (!this.RedChat.unreadConversations.includes(data.conversation_id) && this.userId.id !== data.sender_id) {
        this.RDAddIntoUnreadConversations(data.conversation_id)
      }
    })
  },
  methods: {
    ...mapActions([
      'RDSetUnreadConversations',
      'GRSetUnreadConversations',
      'BLSetUnreadConversations',
      'GRAddIntoUnreadConversations',
      'BLAddIntoUnreadConversations',
      'RDAddIntoUnreadConversations',
    ]),
    calcToolColor(newv) {
      const cArray = ['blue', 'red', 'green']
      const routeColor = newv.substring(1).split('_')[0]
      if (!cArray.includes(routeColor))
        this.tColor = 'blue lighten-1'
      else
        this.tColor = routeColor + ' lighten-1'
    },
    redirectToGreenChat(){
      this.$router.push({name: 'GreenChat'})
    },
    redirectToBlueChat(){
      this.$router.push({name: 'BlueChat'})
    },
    redirectToRedChat(){
      this.$router.push({name: 'RedChat'})
    },
    redirectToHome(){
      this.$router.push({name: 'Home'})
    },
    getNotifications(fb_id){
      this.$http.get(getNotifications, {params: {fb_id: fb_id}}).then(response => {
        if (response.body.status === 200) {
          let redNotifications = []
          let blueNotifications = []
          let greenNotifications = []
          for (let i = 0; i < response.body.data.length; i++) {
            let item = response.body.data[i]
            let chatType
            if (item.initiator_id === fb_id) chatType = item.chat_type_initiator
            else chatType = item.chat_type_target
            if (chatType === "red") redNotifications.push(item._id)
            else if (chatType === "blue") blueNotifications.push(item._id)
            else greenNotifications.push(item._id)
          }
          this.RDSetUnreadConversations(redNotifications)
          this.BLSetUnreadConversations(blueNotifications)
          this.GRSetUnreadConversations(greenNotifications)
        } else {

        }
      }, () => {

      })
    }
  },
  watch: {
    curROute(newv, oldv) {
      this.calcToolColor(newv)
    },
    userId(newval, oldval){
      if (newval) {
        if (newval.id) {
          this.getNotifications(newval.id)
        }
      }
    }
  }
}
</script>

