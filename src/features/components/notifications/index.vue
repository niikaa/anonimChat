<template>
  <div class="not-container" ref="notcontainer">

  </div>
</template>

<script>
import GreenNotifications from './alert'
import socket from '../../../socket'
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      renderedNotifications: []
    }
  },
  computed: {
    ...mapState([
      'Authentication',
      'BlueChat',
      'RedChat',
      'GreenChat'
    ]),
    userId() {
      return this.Authentication.userResponse
    }
  },
  mounted() {
    socket.on('GREEN_CHAT_MSG_RECEIVE', (data) => {
      if (!this.renderedNotifications.includes(data.conversation_id) && this.userId.id !== data.sender_id
          && data.conversation_id !== this.GreenChat.conversation_id) {
        this.createNotification(data.conversation_id, data.chat_message, null, 'green')
      }
    })
    socket.on('BLUE_CHAT_MSG_RECEIVE', (data) => {
      if (!this.renderedNotifications.includes(data.conversation_id) && this.userId.id !== data.sender_id
          && data.conversation_id !== this.BlueChat.conversation_id) {
        this.createNotification(data.conversation_id, data.chat_message, null, 'blue')
      }
    })
    socket.on('RED_CHAT_MSG_RECEIVE', (data) => {
      if (!this.renderedNotifications.includes(data.conversation_id) && this.userId.id !== data.sender_id
          && data.conversation_id !== this.RedChat.conversation_id) {
        this.createNotification(data.conversation_id, data.chat_message, data.sender_id, 'red')
      }
    })
  },
  components: {
    AppGreenNotifications: GreenNotifications,
  },
  methods: {
    createNotification(id, message, sender_id, color) {
      this.renderedNotifications.push(id)
      const ComponentClass = Vue.extend(GreenNotifications)
      var instance = new ComponentClass({
          propsData: { text: message, img: sender_id ? 'https://graph.facebook.com/' + sender_id + '/picture' : null, header: 'New message', id: id, color: color }
      })
      instance.$mount()
      this.$refs.notcontainer.appendChild(instance.$el)
      setTimeout(() => {
        this.$refs.notcontainer.removeChild(instance.$el)
        const index = this.renderedNotifications.indexOf(id);
        if (index > -1) {
          this.renderedNotifications.splice(index, 1);
        }
      }, 3000);
    }
  },
}
</script>


