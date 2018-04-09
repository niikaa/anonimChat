import Vue from 'vue'

const state = {
  active_friend: null,
  card_isFetcing: true,
  conversation_id: null,
  conversation_isFetching: true,
}

const mutations =  {
  GRSetActiveFriend(state, active_friend){
    state.conversation_id = null
    state.conversation_isFetching = true
    state.card_isFetcing = true
    state.active_friend = active_friend
  },
  GRRemoveActiveFriend(state, payload) {
    state.card_isFetcing = true
    state.active_friend = null
  },
  GRChangeCardFetchStatus(state, payload) {
    state.card_isFetcing = payload
  },
  GRSetConversation(state, payload) {
    state.card_isFetcing = true
    state.active_friend = null
    state.conversation_isFetching = true
    state.conversation_id = payload
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
  },
  GRSetConversation:({commit}, payload) => {
    commit('GRSetConversation', payload)
  }
}

export default {
  state,
  mutations,
  actions,
}
