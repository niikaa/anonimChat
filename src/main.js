import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import { store } from './store'
import infiniteScroll from 'vue-infinite-scroll';
import { EmojiPickerPlugin } from 'vue-emoji-picker'
import { directive as onClickOutside } from 'vue-on-click-outside'

Vue.directive('on-click-outside', onClickOutside)
Vue.use(EmojiPickerPlugin)
Vue.use(VueResource)

Vue.use(Vuetify, {
  theme: {
    primary: '#3498db',
    secondary: '#ecf0f1',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})
Vue.use(infiniteScroll)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
