import { mapActions, mapState } from 'vuex'
import socket from '../../socket'
import {getConversationsGreen, getConversation } from '../../constants'
import {getConversationsBlue} from '../../constants'

export default {
  data() {
    return {

    }
  },
  computed: mapState ([
    'Authentication',
    'GreenChat',
    'BlueChat'
  ]),
  methods: {
    ...mapActions([
        'GRAddConversations',
        'GRAddConversation',
        'BLAddConversations',
        'BLAddConversation'
    ]),

    // for green

    getConversationsForGreen(skip, limit){
      var self = this
        var timer = setInterval(function(){
          if(self.Authentication.userResponse){
            clearInterval(timer);
            self.$http.get(getConversationsGreen, {params: {chatName: 'green', fb_id: self.Authentication.userResponse.id, skip: skip, limit: limit}}).then(response => {
              if (response.body.status === 200) {
                  if(response.body.data.length)
                  self.GRAddConversations(response.body.data)
              } else {
  
              }
            }, () => {
  
            })
          }
        }, 200)
    },
    manageNewConversationForGreen(id){
      var self = this
        var timer = setInterval(function(){
          if(self.Authentication.userResponse){
            clearInterval(timer);
            self.$http.get(getConversation, {params: {conversation_id: id}}).then(response => {
              if (response.body.status === 200) {
                self.GRAddConversation(response.body.data[0])
              } else {
  
              }
            }, () => {
  
            })
          }
        }, 200)
    },

    //for blue

    getConversationsForBlue(skip, limit){
      var self = this
        var timer = setInterval(function(){
          if(self.Authentication.userResponse){
            clearInterval(timer);
            self.$http.get(getConversationsBlue, {params: {chatName: 'blue', fb_id: self.Authentication.userResponse.id, skip: skip, limit: limit}}).then(response => {
              if (response.body.status === 200) {
                  if(response.body.data.length)
                  self.BLAddConversations(response.body.data)
              } else {
  
              }
            }, () => {
  
            })
          }
        }, 200)
    },
    manageNewConversationForBlue(id){
      var self = this
        var timer = setInterval(function(){
          if(self.Authentication.userResponse){
            clearInterval(timer);
            self.$http.get(getConversation, {params: {conversation_id: id}}).then(response => {
              if (response.body.status === 200) {
                self.BLAddConversation(response.body.data[0])
              } else {
  
              }
            }, () => {
  
            })
          }
        }, 200)
    }
  },
}
