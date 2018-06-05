import { mapActions, mapState } from 'vuex'
import socket from '../../socket'
import {getConversations } from '../../constants'

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
    redirectToChat(name){
        this.$http.get(getConversations, {params: {chatName: name, fb_id: this.Authentication.userResponse.id}}).then(response => {
            if (response.body.status === 200) {
                this.GRAddConversation(response.body.data)
                console.log(response.body.data)
            } else {

            }
        }, () => {

        })
           // if(name === 'green'){
        //     this.$router.push({name: 'GreenChat'})
        // }
    }
  },
}
