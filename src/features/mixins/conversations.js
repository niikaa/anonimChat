import { mapActions, mapState } from 'vuex'
import socket from '../../socket'
import {getConversationsGreen } from '../../constants'

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
        'GRAddConversation'
    ]),
    getConversations(skip, limit){
      var self = this
        var timer = setInterval(function(){
          if(self.Authentication.userResponse){
            clearInterval(timer);
            self.$http.get(getConversationsGreen, {params: {chatName: 'green', fb_id: self.Authentication.userResponse.id, skip: skip, limit: limit}}).then(response => {
              if (response.body.status === 200) {
                  console.log(response.body.data)
                  if(response.body.data.length)
                  self.GRAddConversation(response.body.data)
              } else {
  
              }
            }, () => {
  
            })
          }
        }, 200)
    }
  },
}
