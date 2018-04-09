<template>
  <div v-if="GreenChat.active_friend" class="fill-area">
    <div class="subheader dark-text">
      Friend info
    </div>
    <hr class="divider light-background">
    <div class="fixed-height-scroll">
      <v-layout row>
        <v-flex xs-12>
          <v-btn flat icon color="blue" @click="handleClose()">
            <v-icon>close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs-12 class="ann-centered">
          <v-avatar class="fr-card-avatar">
            <img v-if="GreenChat.active_friend.gender === genders.male" src="/static/icons/male.png"/>
            <img v-if="GreenChat.active_friend.gender === genders.female" src="/static/icons/female.png"/>
            <img v-if="!GreenChat.active_friend.gender || (GreenChat.active_friend.gender !== genders.male && GreenChat.active_friend.gender !== genders.female)" src="/static/icons/bgender.png"/>
          </v-avatar>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs-12 class="ann-centered">
          <h4>
            One of your friend
          </h4>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs-12 class="ann-centered overfl-hddn">
          <p class="ch-card-description">
            Now you can start conversation with your friend,
            feel free, he has no chance to to guess your identity,
            unless you give it.
          </p>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs-12 class="ann-centered overfl-hddn">
          <v-btn color="blue light-txt-bold">
            <v-icon left>chat</v-icon>
            Start
          </v-btn>
        </v-flex>
      </v-layout>
      <div class="nn-md-divider"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      types: {
        green: 'green',
        red: 'red',
        blue: 'blue',
      },
      genders: {
        male: 'male',
        female: 'female'
      }
    }
  },
  computed: {
    ...mapState([
      'GreenChat'
    ])
  },
  methods: {
    ...mapActions([
      'GRRemoveActiveFriend',
      'GRChangeCardFetchStatus'
    ]),
    handleClose() {
      this.GRRemoveActiveFriend()
    }
  }
}
</script>
