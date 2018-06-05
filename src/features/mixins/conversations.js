import { mapActions, mapState } from 'vuex'
import socket from '../../socket'

export default {
  data() {
    return {

    }
  },
  computed: mapState ([

  ]),
  methods: {
    ...mapActions([
        
    ]),
    redirectToChat(name){
        if(name === 'green')
            this.$router.push({name: 'GreenChat'})
    }
  },
}
