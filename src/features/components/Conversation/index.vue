<template>
<div>
  <div v-if="type == 'green'" class="reltv-ann" v-bind:class="{ notSeenClass: !seen , activeConversationGreen: GreenChat.conversation_id == data._id}">
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

    <div v-if="type == 'blue'" class="reltv-ann" v-bind:class="{ notSeenClass: !seen , activeConversationBlue: BlueChat.conversation_id == data._id}">
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

    <div v-if="type == 'red'" class="reltv-ann" v-bind:class="{ notSeenClass: !seen , activeConversationRed: RedChat.conversation_id == data._id}">
    <v-list-tile avatar @click="handleClick()">
      <v-list-tile-avatar>
        <img v-if="iAmTarget" :src="'https://graph.facebook.com/' + data.initiator_id + '/picture'"/>
        <img v-else :src="'https://graph.facebook.com/' + data.target_id + '/picture'"/>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title class="dark-text">{{ data.messages[data.messages.length - 1].chat_message }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <div class="conversation_date">Date: {{data.date}}</div>
    </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { openConversation, openBlueConversation } from '../../../constants'
export default {
  props: ['data', 'type'],
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
  computed: {
    ...mapState ([
      'Authentication',
      'GreenChat',
      'BlueChat',
      'RedChat'
    ])
  },
  methods: {
    ...mapActions([
      'GRSetConversation',
      'GRAddConversationMessages',
      'BLSetConversation',
      'BLAddConversationMessages',
      'RDSetConversation',
      'RDAddConversationMessages',
      'GRRemoveFromUnreadConversations',
      'BLRemoveFromUnreadConversations',
      'RDRemoveFromUnreadConversations'
    ]),
    handleClick(){
      if(this.type == 'green'){
        this.GRSetConversation(this.data._id)
        this.GRAddConversationMessages(this.data.messages)
        if (this.GreenChat.unreadConversations.includes(this.data._id)) {
          this.GRRemoveFromUnreadConversations(this.data._id)
        }
      }else if(this.type == 'blue'){
        this.BLSetConversation(this.data._id)
        this.BLAddConversationMessages(this.data.messages)
        if (this.BlueChat.unreadConversations.includes(this.data._id)) {
          this.BLRemoveFromUnreadConversations(this.data._id)
        }
      }else if(this.type == 'red'){
        this.RDSetConversation(this.data._id)
        this.RDAddConversationMessages(this.data.messages)
        if (this.RedChat.unreadConversations.includes(this.data._id)) {
          this.RDRemoveFromUnreadConversations(this.data._id)
        }
      }
      if(this.Authentication.userResponse.id != this.data.messages[this.data.messages.length - 1].sender_id){
        this.$http.post(openConversation, {conversation_id: this.data._id, }).then(response => {
          if (response.body.status === 200) {
            this.data.messages[this.data.messages.length - 1].seen = true;
            this.seen = true;
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
      this.iAmTarget = false
      this.convGender = this.data.target_gender
    }else if(this.data.target_id == this.Authentication.userResponse.id){
      this.iAmTarget = true
      this.iAmInitiator = false;
      this.convGender = this.data.initiator_gender;
    }
  },
  updated() {
    if(this.data.initiator_id == this.Authentication.userResponse.id){
      this.iAmInitiator = true
      this.iAmTarget = false
      this.convGender = this.data.target_gender
    }else if(this.data.target_id == this.Authentication.userResponse.id){
      this.iAmTarget = true
      this.iAmInitiator = false;
      this.convGender = this.data.initiator_gender;
    }

    if(this.Authentication.userResponse.id == this.data.messages[this.data.messages.length - 1].sender_id){
      this.seen = true;
    }
    else{
      if(this.type == 'green'){
        if(this.GreenChat.conversation_id != this.data._id)
        this.seen = this.data.messages[this.data.messages.length - 1].seen;
      }else if(this.type == 'blue'){
        if(this.BlueChat.conversation_id != this.data._id)
        this.seen = this.data.messages[this.data.messages.length - 1].seen;
      }else if(this.type == 'red'){
        if(this.RedChat.conversation_id != this.data._id)
        this.seen = this.data.messages[this.data.messages.length - 1].seen;
      }
    }
  },
}
</script>


<style>
  .notSeenClass,
  .notSeenClass .dark-text {
    font-weight: bold !important;
  }
  .activeConversationBlue{
    background-color: #42a5f5;
  }
  .activeConversationRed{
    background-color: #ef5350;
  }
  .activeConversationGreen{
    background-color: #66bb6a;
  }
</style>
