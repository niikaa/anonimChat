import Vue from 'vue'
import Vuex from 'vuex'
import Authentication from './modules/authenticate'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
      Authentication,
  }
})
