<template>
  <div class="reltv-ann">
    <v-list-tile avatar @click="handleClick()">
      <v-list-tile-avatar>
        <img  src="/static/icons/bgender.png"/>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title class="dark-text">{{ data.messages[0].chat_message }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <div class="conversation_date">Data 32 23422 322 33</div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: ['data'],
  methods: {
    handleClick(){
      console.log("clicked")
    }
  },

}
</script>
