<template>
<div>
    <div class="reltv-ann" v-bind:class="{ notSeenClass: !seen , activeConversationBlue: BlueChat.conversation_id == data._id}">
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
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { openConversation, openBlueConversation } from '../../../constants'
export default {
  props: ['data', 'type'],
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
  computed: {
    ...mapState ([
      'Authentication',
      'GreenChat',
      'BlueChat',
      'RedChat'
    ]),
    seen(){
      return this.data.messages[this.data.messages.length - 1].seen
    }
  },

  methods: {
    ...mapActions([
      'BLSetConversation',
      'BLAddConversationMessages',
      'BLRemoveFromUnreadConversations'
    ]),
    handleClick(){
        this.BLSetConversation(this.data._id)
        this.BLAddConversationMessages(this.data.messages)
        if (this.BlueChat.unreadConversations.includes(this.data._id)) {
          this.BLRemoveFromUnreadConversations(this.data._id)
        }
        if(this.Authentication.userResponse.id != this.data.messages[this.data.messages.length - 1].sender_id){
            this.$http.post(openConversation, {conversation_id: this.data._id, }).then(response => {
            if (response.body.status === 200) {
                this.data.messages[this.data.messages.length - 1].seen = true;
            }
            }, () => {
            })
        }
    },
    processSeen(){
      if(this.Authentication.userResponse.id == this.data.messages[this.data.messages.length - 1].sender_id){
        this.data.messages[this.data.messages.length - 1].seen = true;
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
    }
  },
  beforeMount(){
    this.processSeen();
  },
  updated() {
    this.processSeen();
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
</style>
