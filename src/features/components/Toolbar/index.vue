<template>
  <v-toolbar fixed dark color="blue lighten-1">
    <v-toolbar-title class="white--text">Title</v-toolbar-title>
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
  computed: mapState ([
    'Authentication'
  ])
}
</script>

