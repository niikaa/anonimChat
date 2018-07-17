<template>
  <div class="reltv-ann">
    <v-list-tile avatar @click="handleClickRed()">
      <v-list-tile-avatar>
        <img :src="'https://graph.facebook.com/' + data.id + '/picture'"/>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title class="dark-text">
         {{ data.name }}
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <div v-if="isActive" class="active-usr"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
   props: ['data'],
   data() {
     return {
      genders: {
        male: 'male',
        female: 'female'
      },
     }
   },
   computed: {
    ...mapState ([
      'Data'
    ]),
    isActive() {
      for (let i = 0; i < this.Data.active_friends.length; i++) {
        if (this.Data.active_friends[i].fb_id === this.data.id) {
          return true
        }
      }
      return false
    },
    computedType() {
      return this.type
    },
   },
   methods: {
     ...mapActions([
        'RDSetActiveFriend'
      ]),
     handleClickRed() {
       this.RDSetActiveFriend(this.data)
     }
   }
}
</script>
