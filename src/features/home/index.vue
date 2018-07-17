<template>
  <div>
    <v-layout row wrap class="menu-pad">
      <v-flex xs12 md4 class="ann-card green-card">
        <div class="text-xs-center verticaly-cnt">
          <h3 class="ann-h3">Green chat</h3>
          <div class="text-xs-center ann-separated-line">
            <v-badge overlap color="red" class="separated-badge">
              <span slot="badge">{{GreenChat.unreadConversations.length}}</span>
              <v-icon large color="grey lighten-4" >
                chat_bubble
              </v-icon>
            </v-badge>
            <v-badge overlap color="red" class="separated-badge">
              <v-icon large color="grey lighten-4" >
                announcement
              </v-icon>
            </v-badge>
          </div>
          <div class="text-xs-center ann-separated-line">
            <v-btn @click="redirectToGreenChat()" round large color="grey lighten-4">
              <span class="text-green"> View </span>
            </v-btn>
          </div>
        </div>
      </v-flex>

      <v-flex xs12 md4 class="ann-card blue-card">
        <div class="text-xs-center verticaly-cnt">
          <h3 class="ann-h3">Blue chat</h3>
          <div class="text-xs-center ann-separated-line">
            <v-badge overlap color="red" class="separated-badge">
              <span slot="badge">{{BlueChat.unreadConversations.length}}</span>
              <v-icon large color="grey lighten-4" >
                chat_bubble_outline
              </v-icon>
            </v-badge>
            <v-badge overlap color="red" class="separated-badge">
              <v-icon large color="grey lighten-4" >
                announcement
              </v-icon>
            </v-badge>
          </div>
          <div class="text-xs-center ann-separated-line">
            <v-btn @click="redirectToBlueChat()" round large color="grey lighten-4">
              <span class="text-blue"> View </span>
            </v-btn>
          </div>
        </div>
      </v-flex>

      <v-flex xs12 md4 class="ann-card red-card">
        <div class="text-xs-center verticaly-cnt">
          <h3 class="ann-h3">Red chat</h3>
          <div class="text-xs-center ann-separated-line">
            <v-badge overlap color="blue lighten-2" class="separated-badge">
              <span slot="badge">{{RedChat.unreadConversations.length}}</span>
              <v-icon large color="grey lighten-4" >
                chat
              </v-icon>
            </v-badge>
            <v-badge overlap color="red" class="separated-badge">
              <v-icon large color="grey lighten-4" >
                announcement
              </v-icon>
            </v-badge>
          </div>

          <div class="text-xs-center ann-separated-line">
            <v-btn @click="redirectToRedChat()" round large color="grey lighten-4">
              <span class="text-red"> View </span>
            </v-btn>
          </div>
        </div>
      </v-flex>

      <v-flex xs12 md3 class="ann-card yellow-card">
        <div class="text-xs-center verticaly-cnt">
          <h3 class="ann-h3">Comming soon</h3>
        </div>
      </v-flex>
      <v-flex xs12 md3 class="ann-card orange-card">
        <div class="text-xs-center verticaly-cnt">
          <h3 class="ann-h3">Comming soon</h3>
        </div>
      </v-flex>
      <v-flex xs12 md3 class="ann-card violet-card">
        <div class="text-xs-center verticaly-cnt">
          <h3 class="ann-h3">Comming soon</h3>
        </div>
      </v-flex>
      <v-flex xs12 md3 class="ann-card gray-card">
        <div class="text-xs-center verticaly-cnt">
          <h3 class="ann-h3">Comming soon</h3>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
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
    }
  },
}
</script>

