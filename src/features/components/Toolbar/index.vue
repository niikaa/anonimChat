<template>
  <v-toolbar fixed dark :color="tColor">
    <v-toolbar-title class="white--text">Anonim chat</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn flat small @click="redirectToGreenChat">
      Green
    </v-btn>
    <v-btn flat small @click="redirectToBlueChat">
      Blue
    </v-btn>
    <v-btn flat small @click="redirectToRedChat">
      Red
    </v-btn>
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
import { mapState } from 'vuex'
import {getNotifications} from '../../../constants'
export default {
  mixins:[AuthMixin],
  data() {
    return {
      tColor: 'grey lighten-1'
    }
  },
  computed: {
    ...mapState([
      'Authentication'
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

  methods: {
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
    getNotifications(fb_id){
      console.log(fb_id)
      this.$http.get(getNotifications, {params: {fb_id: fb_id}}).then(response => {
        console.log(response)
        if (response.body.status === 200) {
          
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
      this.getNotifications(newval.id)
    }
  }
}
</script>

