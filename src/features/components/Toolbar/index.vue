<template>
  <v-toolbar fixed dark color="blue lighten-1">
    <v-toolbar-title class="white--text">Title</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon >
      <v-icon>https</v-icon>
    </v-btn>

    <!--<v-btn icon v-if="$store.state.Authentication.isLoggedIn" @click="logOutWithFacebook()">
      <v-icon>exit_to_app</v-icon>
    </v-btn>-->

  </v-toolbar>
</template>

<script>

  export default {

  }
</script>

