<template>
  <div class="reltv-ann">
    <v-list-tile avatar @click="handleClick()">
      <v-list-tile-avatar>
        <img v-if="convGender === genders.male" src="/static/icons/male.png"/>
        <img v-if="convGender === genders.female" src="/static/icons/female.png"/>
        <img v-if="!convGender || (convGender !== genders.male && convGender !== genders.female)" src="/static/icons/bgender.png"/>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title class="dark-text">{{ data.messages[data.messages.length - 1].chat_message }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <div class="conversation_date">Date: {{data.date}}</div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: ['data'],
  data() {
    return {
      iAmInitiator:false,
      iAmTarget:false,
      convGender: null,
      genders: {
        male: 'male',
        female: 'female'
      }
    }
  },
  computed: mapState ([
    'Authentication',
    'GreenChat'
  ]),
  methods: {
    ...mapActions([
      'GRSetConversation',
      'GRAddConversationMessages'
    ]),
    handleClick(){
      this.GRSetConversation(this.data._id)
      this.GRAddConversationMessages(this.data.messages)
    }
  },
  beforeMount(){
    if(this.data.initiator_id == this.Authentication.userResponse.id){
      this.iAmInitiator = true
      this.convGender = this.data.target_gender
    }else if(this.data.target_id == this.Authentication.userResponse.id){
      this.iAmTarget = true
      this.convGender = this.data.initiator_gender;
    }
  }
}
</script>
