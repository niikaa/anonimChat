<template>
  <div class="reltv-ann">
    <v-list-tile v-if="computedType === types.green" avatar @click="handleClick()">
      <v-list-tile-avatar>
        <!--es aris realuri profilis surati-->
        <!--<img :src="'https://graph.facebook.com/' + data.id + '/picture'"/>-->
        <img v-if="data.gender === genders.male" src="/static/icons/male.png"/>
        <img v-if="data.gender === genders.female" src="/static/icons/female.png"/>
        <img v-if="!data.gender || (data.gender !== genders.male && data.gender !== genders.female)" src="/static/icons/bgender.png"/>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title class="dark-text">{{ data.name }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <div v-if="isActive" class="active-usr"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
   props: ['type', 'data'],
   data() {
     return {
      types: {
        green: 'green',
        red: 'red',
        blue: 'blue',
      },
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
        'GRSetActiveFriendId',
      ]),
     handleClick() {
      this.GRSetActiveFriendId(this.data.id)
     }
   }
}
</script>
