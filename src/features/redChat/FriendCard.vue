<template>
  <div v-if="RedChat.active_friend" class="fill-area">
    <AppComponentLoader v-if="RedChat.card_isFetcing"></AppComponentLoader>
    <v-subheader class="subheader dark-text">
      Friend info
    </v-subheader>
    <v-divider class="divider light-background"></v-divider>
    <div class="fixed-height-scroll">
      <v-layout row>
        <v-flex xs-12>
          <v-btn flat icon color="red" @click="handleClose()">
            <v-icon>close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs-12 class="ann-centered">
          <v-avatar class="fr-card-avatar">
            <img :src="'https://graph.facebook.com/' + RedChat.active_friend.id + '/picture?type=large'"/>
          </v-avatar>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs-12 class="ann-centered">
          <h4 class="color-red-lighten">
            {{ RedChat.active_friend.name }}
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
          <v-btn color="red light-txt-bold" @click="handleStart()">
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
import { createRedConversation } from '../../constants'

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
      'RedChat',
      'Authentication'
    ]),
    isFetching() {
      return this.RedChat.card_isFetcing
    }
  },
  methods: {
    ...mapActions([
      'RDRemoveActiveFriend',
      'RDChangeCardFetchStatus',
      'RDSetConversation',
      'RDClearMessages'
    ]),
    handleClose() {
      this.RDRemoveActiveFriend()
    },
    handleStart() {
      const data = {
        chat_type_initiator: 'red',
        initiator_id: this.Authentication.userResponse.id,
        initiator_gender: this.Authentication.userResponse.gender,
        chat_type_target: 'blue',
        target_id: this.RedChat.active_friend.id,
        target_gender: this.RedChat.active_friend.gender
      }
      this.RDClearMessages()
      this.$http.post(createRedConversation, {data}).then(response => {
        if (response.body.status === 200) {
          this.RDSetConversation(response.body.data._id)
        }
      })
    }
  },
  components: {
    AppComponentLoader: ComponentLoader
  },
  mounted () {
    setTimeout(() => {
      this.RDChangeCardFetchStatus(false)
    },300)
  },
  watch: {
    isFetching(oldVal, newVal) {
      setTimeout(() => {
        this.RDChangeCardFetchStatus(false)
      },300)
    }
  }
}
</script>
