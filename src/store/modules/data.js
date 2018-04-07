import Vue from 'vue'
import { getActiveFriends } from '../../server/constants'
import router from '../../router'

const state = {
  active_friends: []
}

const mutations = {
  setActiveFriends(state, activeFriends){
    state.active_friends = activeFriends;
  }
}

const actions = {
  setActiveFriends:({commit}, payload) => {
    Vue.http.get(getActiveFriends, {params: {friends: payload}}).then(response => {
      if (response.body.status === 200) {
        commit('setActiveFriends', response.body.data)
      } else {
        commit('setActiveFriends', [])
      }
    }, () => {
      commit('setActiveFriends', [])
    })
  },
}

export default {
  state,
  actions,
  mutations,
}
