import Vue from 'vue'
import { getActiveFriends } from '../../constants'

const state = {
  active_friends: [],
  notSound: true
}

const mutations = {
  setActiveFriends(state, activeFriends) {
    state.active_friends = activeFriends;
  },
  changeNotSound(state, payload) {
    state.notSound = payload
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
  changeNotSound:({commit}, payload) => {
    commit('changeNotSound', payload)
  }
}

export default {
  state,
  actions,
  mutations,
}
