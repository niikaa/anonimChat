<template>
  <div class="home-pg">
    <v-container class="container-toped">
      <v-layout row wrap class="main-pad">
        <v-flex xs12 md6>
          <h1 class="ann-h1">
            Chat with your Facebook friends anonymously.
          </h1>
          <span class="ann-under-h1">
            <ul>
<li>Message your friend so that you know about him/her but he/she can't track you down</li>
<li>Message your friend so that you don't know about him/her but she/he knows about you</li>
<li>Message your friend so that you don't know about him/her and she/he doesn't know about you too</li>

            </ul>
          </span>
        </v-flex>
        <v-flex xs12 md6>
          <v-card class="white--text auth-card">
            <v-card-text class="px-100">
              <h4 class="ann-h4">
                Sign up or Login with facebook
              </h4>
              <div class="ann-centered">
                <div class="text-xs-center">
                  <v-btn v-if="!Authentication.isLoggedIn" round large color="light-blue darken-1" @click="loginWithFacebook()">Log in</v-btn>
                  <v-btn v-else round large color="light-blue darken-1" @click="logOutWithFacebook()">Log out</v-btn>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import AuthMixin from '../mixins/authenticate'
import { mapState } from 'vuex'
export default {
  mixins:[AuthMixin],
  computed: mapState ([
    'Authentication'
  ])
}
</script>
