import Vue from 'vue'
import Vuex from 'vuex'
import Authentication from './modules/authenticate'
import Data from './modules/data'
import GreenChat from './modules/greenChat'
import BlueChat from './modules/blueChat'
import RedChat from './modules/redChat'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
      Authentication,
      Data,
      GreenChat,
      BlueChat,
      RedChat
  }
})
