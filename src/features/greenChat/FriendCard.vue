<template>
  <div v-if="GreenChat.active_friend" class="fill-area">
    <AppComponentLoader v-if="GreenChat.card_isFetcing"></AppComponentLoader>
    <v-subheader class="subheader dark-text">
      Friend info
    </v-subheader>
    <v-divider class="divider light-background"></v-divider>
    <div class="fixed-height-scroll">
      <v-layout row>
        <v-flex xs-12>
          <v-btn flat icon color="green lighten-1" @click="handleClose()">
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
          <h4 class="color-green-lighten">
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
          <v-btn color="green lighten-1 light-txt-bold" @click="handleStart()">
            <v-icon left>chat_bubble</v-icon>
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
import ComponentLoader from '../components/Loaders/ComponentLoader'
import { createGreenConversation } from '../../constants'
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
      'GreenChat',
      'Authentication'
    ]),
    isFetching() {
      return this.GreenChat.card_isFetcing
    }
  },
  methods: {
    ...mapActions([
      'GRRemoveActiveFriend',
      'GRChangeCardFetchStatus',
      'GRSetConversation',
      'GRClearMessages'
    ]),
    handleClose() {
      this.GRRemoveActiveFriend()
    },
    handleStart() {
      const data = {
        chat_type_initiator: 'green',
        initiator_id: this.Authentication.userResponse.id,
        initiator_gender: this.Authentication.userResponse.gender,
        chat_type_target: 'green',
        target_id: this.GreenChat.active_friend.id,
        target_gender: this.GreenChat.active_friend.gender
      }
      this.GRClearMessages()
      this.$http.post(createGreenConversation, {data}).then(response => {
        if (response.body.status === 200) {
          this.GRSetConversation(response.body.data._id)
        }
      })
    }
  },
  components: {
    AppComponentLoader: ComponentLoader
  },
  mounted () {
    setTimeout(() => {
      this.GRChangeCardFetchStatus(false)
    },300)
  },
  watch: {
    isFetching(oldVal, newVal) {
      setTimeout(() => {
        this.GRChangeCardFetchStatus(false)
      },300)
    }
  }
}
</script>
