<template>
  <v-toolbar fixed dark :color="tColor">
    <v-toolbar-title class="white--text">Anonim chat</v-toolbar-title>
    <v-spacer></v-spacer>
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
export default {
  mixins:[AuthMixin],
  data() {
    return {
      tColor: 'grey lighten-1'
    }
  },
  computed: mapState ([
    'Authentication'
  ]),
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
    }
  },
  computed: {
    curROute() {
      return this.$route.path
    }
  },
  watch: {
    curROute(newv, oldv) {
      this.calcToolColor(newv)
    }
  }
}
</script>

