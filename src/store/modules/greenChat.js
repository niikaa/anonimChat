import Vue from 'vue'

const state = {
  active_friend: null,
  card_isFetcing: true,
}

const mutations =  {
  GRSetActiveFriend(state, active_friend){
    state.card_isFetcing = true
    state.active_friend = active_friend
  },
  GRRemoveActiveFriend(state, payload) {
    state.card_isFetcing = true
    state.active_friend = null
  },
  GRChangeCardFetchStatus(state, payload) {
    state.card_isFetcing = payload
  }
}

const actions = {
  GRSetActiveFriend:({commit}, payload) => {
    commit('GRSetActiveFriend', payload)
  },
  GRRemoveActiveFriend:({commit}, payload) => {
    commit('GRRemoveActiveFriend', payload)
  },
  GRChangeCardFetchStatus:({commit}, payload) => {
    commit('GRChangeCardFetchStatus', payload)
  }
}

export default {
  state,
  mutations,
  actions,
}
