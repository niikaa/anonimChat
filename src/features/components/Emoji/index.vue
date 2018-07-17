<template>
  <emoji-picker @emoji="insert" :search="search">
      <div class="emoji-invoker" slot="emoji-invoker" slot-scope="{ events }" v-on="events" >
        <button type="button" style="zoom: 250%; color: green">&#9786</button>
      </div>
      <div class="emojis-container" slot="emoji-picker" slot-scope="{ emojis, insert, display }">
        <div>
          <div>
            <input type="text" v-model="search" placeholder="search...">
          </div>
          <div>
            <div v-for="(emojiGroup, category) in emojis" :key="category">
              <div v-if="category == 'People' || category == 'Nature' || category == 'Objects'">
                <h5>{{ category }}</h5>
                <div>
                  <span v-for="(emoji, emojiName) in emojiGroup"
                      :key="emojiName"
                      @click="insert(emoji)"
                      :title="emojiName"
                      style="cursor:pointer"
                  >{{ emoji }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </emoji-picker>
  </div>
</template>

<script>
import EmojiPicker from 'vue-emoji-picker'
import Emojis from './emojis'
export default {
  props: ['userMessage'],
  data() {
    return {
      search: 's'
    }
  },
  methods: {
    insert(emoji) {
      this.$emit('input', this.userMessage + emoji)
    },
    replaceEmoji(str) {
      this.$emit('input', str)
    }
  },
  components: {
    EmojiPicker,
  },
  watch: {
    userMessage(newval, oldval) {
      let keys = Object.keys(Emojis)
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        if (newval.includes(key)) {
          const newUserMessage = newval.replace(key, Emojis[key])
          this.replaceEmoji(newUserMessage)
        }
      }
    }
  }
}
</script>
