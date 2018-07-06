<template>
  <div v-if="BlueChat.active_friend" class="fill-area">
    <AppComponentLoader v-if="BlueChat.card_isFetcing"></AppComponentLoader>
    <v-subheader class="subheader dark-text">
      Friend info
    </v-subheader>
    <v-divider class="divider light-background"></v-divider>
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
            <img v-if="BlueChat.active_friend.gender === genders.male" src="/static/icons/male.png"/>
            <img v-if="BlueChat.active_friend.gender === genders.female" src="/static/icons/female.png"/>
            <img v-if="!BlueChat.active_friend.gender || (BlueChat.active_friend.gender !== genders.male && BlueChat.active_friend.gender !== genders.female)" src="/static/icons/bgender.png"/>
          </v-avatar>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs-12 class="ann-centered">
          <h4 class="color-blue-lighten">
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
          <v-btn color="blue light-txt-bold" @click="handleStart()">
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
import ComponentLoader from '../components/Loaders/ComponentLoader'
import { createBlueConversation } from '../../constants'

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
      'BlueChat',
      'Authentication'
    ]),
    isFetching() {
      return this.BlueChat.card_isFetcing
    }
  },
  methods: {
    ...mapActions([
      'BLRemoveActiveFriend',
      'BLChangeCardFetchStatus',
      'BLSetConversation',
      'BLClearMessages'
    ]),
    handleClose() {
      this.BLRemoveActiveFriend()
    },
    handleStart() {
      const data = {
        chat_type_initiator: 'blue',
        initiator_id: this.Authentication.userResponse.id,
        initiator_gender: this.Authentication.userResponse.gender,
        chat_type_target: 'red',
        target_id: this.BlueChat.active_friend.id,
        target_gender: this.BlueChat.active_friend.gender
      }
      this.BLClearMessages()
      this.$http.post(createBlueConversation, {data}).then(response => {
        if (response.body.status === 200) {
          this.BLSetConversation(response.body.data._id)
        }
      })
    }
  },
  components: {
    AppComponentLoader: ComponentLoader
  },
  mounted () {
    setTimeout(() => {
      this.BLChangeCardFetchStatus(false)
    },300)
  },
  watch: {
    isFetching(oldVal, newVal) {
      setTimeout(() => {
        this.BLChangeCardFetchStatus(false)
      },300)
    }
  }
}
</script>
