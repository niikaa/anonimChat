<template>
  <div class="pst-rlt">
    <v-btn icon @click="openMenu">
      <v-badge right color="green lighten-1">
         <v-icon>settings</v-icon>
      </v-badge>
    </v-btn>
    <div v-if="show" class="dropdown-container" v-on-click-outside="closeMenu">
      <div class="dropdown-item header-dr-it">
        Settings
      </div>
      <div class="dropdown-item">
        Notification:
        <v-btn flat icon color="grey" @click="changeNotificationSound()">
          <v-icon v-if="Data.notSound">music_note</v-icon>
          <v-icon v-else>music_off</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { mixin as onClickOutside } from 'vue-on-click-outside'
export default {
  mixins: [onClickOutside],
  data() {
    return {
      show: false,
    }
  },
  computed: {
    ...mapState([
      'Data'
    ])
  },
  mounted() {
    const currentState = window.localStorage.getItem('notification-sound')
    if (currentState == 1) this.changeNotSound(true)
    else this.changeNotSound(false)
  },
  methods: {
    ...mapActions([
      'changeNotSound'
    ]),
    openMenu() {
      this.show = true
    },
    closeMenu() {
      this.show = false
    },
    changeNotificationSound() {
      this.changeNotSound(!this.Data.notSound)
      window.localStorage.setItem('notification-sound', this.Data.notSound ? 1 : 0)
    }
  }
}
</script>
