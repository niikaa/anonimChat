<template>
  <div class="home-pg">
    <v-container class="container-toped">
      <v-layout row wrap class="main-pad">
        <v-flex xs12 md6>
          <h1 class="ann-h1">
            Opinions do matter, use them to build yourself!
          </h1>
          <span class="ann-under-h1">
            Are your friends really on your side? Get honest feedbacks and know what you don’t!
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
                  <v-btn round large color="light-blue darken-1">Log in</v-btn>
                  <!--<v-btn round large color="light-blue darken-1">Log out</v-btn>-->
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
export default {

}
</script>
