<template>
<div>
    <div class="reltv-ann" v-bind:class="{ notSeenClass: !seen , activeConversationRed: RedChat.conversation_id == data._id}">
    <v-list-tile avatar @click="handleClick()">
      <v-list-tile-avatar>
        <img v-if="iAmTarget" :src="'https://graph.facebook.com/' + data.initiator_id + '/picture'"/>
        <img v-else :src="'https://graph.facebook.com/' + data.target_id + '/picture'"/>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title class="dark-text">{{ data.messages[data.messages.length - 1].chat_message }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <div class="conversation_date">Date: {{longDate(data.date)}}</div>
    </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { openConversation, openBlueConversation } from '../../../constants'
import DateMixin from '../../mixins/date'
export default {
  props: ['data'],
  mixins: [DateMixin],
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
      'RDSetConversation',
      'RDAddConversationMessages',
      'RDRemoveFromUnreadConversations'
    ]),
    handleClick(){
        this.RDSetConversation(this.data._id)
        this.RDAddConversationMessages(this.data.messages)
        if (this.RedChat.unreadConversations.includes(this.data._id)) {
            this.RDRemoveFromUnreadConversations(this.data._id)
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
  .activeConversationRed{
    background-color: #ef5350;
  }
</style>
