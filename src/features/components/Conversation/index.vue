<template>
  <div class="reltv-ann" v-bind:class="{ notSeenClass: !seen , activeConversation: GreenChat.conversation_id == data._id}">
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
    <div class="conversation_date">Data: {{data.date}}</div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { openGreenConversation } from '../../../constants'
export default {
  props: ['data'],
  data() {
    return {
      seen: false,
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
      if(this.Authentication.userResponse.id != this.data.messages[this.data.messages.length - 1].sender_id){
        this.$http.post(openGreenConversation, {conversation_id: this.data._id, }).then(response => {
          if (response.body.status === 200) {
            this.data.messages[this.data.messages.length - 1].seen = true;
            this.seen = true;
            //socket.emit('SEND_GREEN_CHAT_MESSAGE', {message: response.body.message, targets: response.body.targets, conversation_id: this.GreenChat.conversation_id })
          }
        }, () => {
        })
      }
    }
  },
  beforeMount(){
    if(this.Authentication.userResponse.id == this.data.messages[this.data.messages.length - 1].sender_id){
      this.seen = true;
    }else{
      this.seen = this.data.messages[this.data.messages.length - 1].seen;
    }
    if(this.data.initiator_id == this.Authentication.userResponse.id){
      this.iAmInitiator = true
      this.convGender = this.data.target_gender
    }else if(this.data.target_id == this.Authentication.userResponse.id){
      this.iAmTarget = true
      this.convGender = this.data.initiator_gender;
    }
  },

  updated() {
    if(this.Authentication.userResponse.id == this.data.messages[this.data.messages.length - 1].sender_id){
      this.seen = true;
    }
    else{
      if(this.GreenChat.conversation_id != this.data._id)
        this.seen = this.data.messages[this.data.messages.length - 1].seen;
    }
  },
}
</script>


<style>
  .notSeenClass,
  .notSeenClass .dark-text {
    font-weight: bold !important;
  }
  .activeConversation{
    background-color: #42a5f5;
  }
</style>
