import Vue from 'vue'

const state = {
  active_friend: null,
  card_isFetcing: true,
  conversation_id: null,
  conversation_isFetching: true,
  messages: [],
  conversations: [],
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
  },
  GRChangeChatFetchStatus(state, payload) {
    state.conversation_isFetching = payload
  },
  GRAddMessage(state, payload) {
    state.messages.push(payload)
  },
  GRClearMessages(state, payload) {
    state.messages = []
  },
  GRAddConversation(state, payload){
    state.conversations = state.conversations.concat(payload)
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
  },
  GRChangeChatFetchStatus:({commit}, payload) => {
    commit('GRChangeChatFetchStatus', payload)
  },
  GRAddMessage:({commit}, payload) => {
    commit('GRAddMessage', payload)
  },
  GRClearMessages:({commit}, payload) => {
    commit('GRClearMessages', payload)
  },
  GRAddConversation:({commit}, payload) => {
    commit('GRAddConversation', payload)
  }
}

export default {
  state,
  mutations,
  actions,
}
