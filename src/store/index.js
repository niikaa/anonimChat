import Vue from 'vue'
import Vuex from 'vuex'
import Authentication from './modules/authenticate'
import Data from './modules/data'
import GreenChat from './modules/greenChat'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
      Authentication,
      Data,
      GreenChat
  }
})
