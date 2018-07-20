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
        <v-list-tile-title class="dark-text">{{ data.last_message.chat_message }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <div class="conversation_date">Date: {{longDate(data.date)}}</div>
    </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DateMixin from '../../mixins/date'
import { openConversation, openBlueConversation, getConversation } from '../../../constants'
export default {
  props: ['data', 'type'],
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
      return this.data.last_message.seen
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
        if(this.Authentication.userResponse.id != this.data.last_message.sender_id){
            this.$http.post(openConversation, {conversation_id: this.data._id, }).then(response => {
            if (response.body.status === 200) {
                this.data.last_message.seen = true;
            }
            }, () => {
            })
        }
    },
    processSeen(){
      if(this.Authentication.userResponse.id == this.data.last_message.sender_id){
        this.data.last_message.seen = true;
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
