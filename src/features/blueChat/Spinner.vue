<template>
  <div class="ann-centered">
    <v-btn fab dark small color="red" @click="spin('spinner-mobile-btn', 500)" id="spinner-mobile-btn">
      <v-icon dark>autorenew</v-icon>
    </v-btn>
    <div id="wrapper">
      <div id="wheel" ref="blue_wheel">
          <div id="inner-wheel">
              <div class="sec  sec_bl"></div>
              <div class="sec  sec_bl"></div>
              <div class="sec  sec_bl"></div>
              <div class="sec  sec_bl"></div>
              <div class="sec  sec_bl"></div>
              <div class="sec  sec_bl"></div>
          </div>
          <div id="spin"  @click="spin('inner-wheel', 5500)">
              <div id="inner-spin"></div>
          </div>
          <div id="shine"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    data() {
      return {
        clicks: 0,
        countCLicks: 0,
        interrupted: false
      }
    },
    beforeDestroy() {
      this.BLSetLoading(false)
      this.interrupted = true
    },
    methods: {
      ...mapActions([
        'BLSetActiveFriend',
        'BLRemoveActiveFriend',
        'BLRemoveActiveConversation',
        'BLSetLoading',
      ]),
      getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      },
      spin(idOfSpinnerElement, interval) {
        this.BLRemoveActiveConversation()
        this.BLRemoveActiveFriend()
        this.BLSetLoading(true)
        let degree = 1800
        this.clicks ++
        this.countCLicks ++
        let newDegree = degree*this.clicks
        let extraDegree = Math.floor(Math.random() * (360 - 1 + 1)) + 1
        let totalDegree = newDegree+extraDegree
        let secs = document.getElementsByClassName('sec_bl')
        for (var i = 0; i < secs.length; i++) {
          if (!this.interrupted) {
            let t = this.$refs.blue_wheel
            let noY = 0
            let c = 0
            let n = 700
            let interval = setInterval(() => {
              c++
              if (c === n) {
                clearInterval(interval)
              }
              var rect = t.getBoundingClientRect()
              let aoY = rect.top + document.body.scrollTop
              if(aoY < 23.89 && !this.interrupted){
                let curEl = document.getElementById("spin")
                if (curEl.classList)
                  curEl.classList.add('spin')
                else
                  curEl.className += ' ' + 'spin'
                setTimeout(() => {
                  let curEl = document.getElementById("spin")
                  if (curEl.classList)
                    curEl.classList.remove('spin')
                  else
                    curEl.className = curEl.className.replace(new RegExp('(^|\\b)' + 'spin'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
                }, 100)
              }
            }, 10)
            window.document.getElementById(idOfSpinnerElement).style.transform = 'rotate(' + totalDegree + 'deg)'
          }
        }
        setTimeout(() => {
          this.countCLicks--
          if (this.countCLicks == 0 && !this.interrupted) {
            let rand = this.getRandomInt(this.$store.state.Authentication.friends_obj.length);
            let randFriend = this.$store.state.Authentication.friends_obj[rand]
            this.BLSetActiveFriend(randFriend)
            this.BLSetLoading(false)
          }
        },interval)
      }
    }
  }
</script>

