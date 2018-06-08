import { mapActions, mapState } from 'vuex'
import socket from '../../socket'
import {getConversationsGreen, getConversationGreen } from '../../constants'

export default {
  data() {
    return {

    }
  },
  computed: mapState ([
    'Authentication',
    'GreenChat'
  ]),
  methods: {
    ...mapActions([
        'GRAddConversations',
        'GRAddConversation'
    ]),
    getConversations(skip, limit){
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
    manageNewConversation(id){
      var self = this
        var timer = setInterval(function(){
          if(self.Authentication.userResponse){
            clearInterval(timer);
            self.$http.get(getConversationGreen, {params: {conversation_id: id}}).then(response => {
              console.log(response.body)
              if (response.body.status === 200) {
                console.log(response.body.data)
                self.GRAddConversation(response.body.data[0])
              } else {
  
              }
            }, () => {
  
            })
          }
        }, 200)
    }
  },
}
