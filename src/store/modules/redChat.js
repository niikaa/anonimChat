import Vue from 'vue'

const state = {
  loading: false,
  active_friend: null,
  card_isFetcing: true,
  conversation_id: null,
  conversation_isFetching: true,
  messages: [],
  conversations: [],
  skip: 0,
  limit: 20,
  messageSocketConnected: false,
  unreadConversations: []
}

const mutations =  {
  RDSetActiveFriend(state, active_friend){
    state.conversation_id = null
    state.conversation_isFetching = true
    state.card_isFetcing = true
    state.active_friend = active_friend
  },
  RDRemoveActiveConversation(state, payload){
    state.conversation_id = null;
  },
  RDRemoveActiveFriend(state, payload) {
    state.card_isFetcing = true
    state.active_friend = null
  },
  RDChangeCardFetchStatus(state, payload) {
    state.card_isFetcing = payload
  },
  RDSetConversation(state, payload) {
    state.card_isFetcing = true
    state.active_friend = null
    state.conversation_isFetching = true
    state.conversation_id = payload
  },
  RDChangeChatFetchStatus(state, payload) {
    state.conversation_isFetching = payload
  },
  RDAddMessage(state, payload) {
    state.messages.push(payload)
  },
  RDAddConversationMessages(state, payload){
    state.messages = []
    state.messages = state.messages.concat(payload)
  },
  RDClearMessages(state, payload) {
    state.messages = []
  },
  RDAddConversations(state, payload){
    state.conversations = state.conversations.concat(payload)
  },
  RDClearConversation(state, payload){
    state.conversations = []
  },
  RDConversationsScrollInitiate(state, payload){
    state.skip = 0;
    state.limit = 20;
  },
  RDConversationsScrollDown(state, payload){
    state.skip += state.limit
  },
  RDConnectMessageSocket(state, payload){
    state.messageSocketConnected = true;
  },
  RDDisconnectMessageSocket(state, payload){
    state.messageSocketConnected = false;
  },
  RDAddConversation(state, payload){
    for(var i = 0; i < state.conversations.length; i ++){
      if(state.conversations[i]._id == payload._id){
        state.conversations.splice(i, 1)
        state.skip ++;
        break;
      }
    }
    state.conversations.unshift(payload)
  },
  RDSetLoading(state, payload) {
    state.loading = payload
  },
  RDSetUnreadConversations(state, payload) {
    state.unreadConversations = payload
  },
  RDAddIntoUnreadConversations(state, payload) {
    state.unreadConversations.push(payload)
  },
  RDRemoveFromUnreadConversations(state, payload) {
    const index = state.unreadConversations.indexOf(payload);
    if (index > -1) {
      state.unreadConversations.splice(index, 1);
    }
  }
}

const actions = {
  RDSetActiveFriend:({commit}, payload) => {
    commit('RDSetActiveFriend', payload)
  },
  RDRemoveActiveFriend:({commit}, payload) => {
    commit('RDRemoveActiveFriend', payload)
  },
  RDChangeCardFetchStatus:({commit}, payload) => {
    commit('RDChangeCardFetchStatus', payload)
  },
  RDSetConversation:({commit}, payload) => {
    commit('RDSetConversation', payload)
  },
  RDChangeChatFetchStatus:({commit}, payload) => {
    commit('RDChangeChatFetchStatus', payload)
  },
  RDAddMessage:({commit}, payload) => {
    commit('RDAddMessage', payload)
  },
  RDClearMessages:({commit}, payload) => {
    commit('RDClearMessages', payload)
  },
  RDAddConversations:({commit}, payload) => {
    commit('RDAddConversations', payload)
  },
  RDClearConversation:({commit}, payload) => {
    commit('RDClearConversation', payload)
  },
  RDAddConversationMessages:({commit}, payload) => {
    commit('RDAddConversationMessages', payload)
  },
  RDConversationsScrollDown:({commit}, payload) => {
    commit('RDConversationsScrollDown', payload)
  },
  RDConversationsScrollInitiate:({commit}, payload) => {
    commit('RDConversationsScrollInitiate', payload)
  },
  RDConnectMessageSocket:({commit}, payload) => {
    commit('RDConnectMessageSocket', payload)
  },
  RDDisconnectMessageSocket:({commit}, payload) => {
    commit('RDDisconnectMessageSocket', payload)
  },
  RDAddConversation:({commit}, payload) => {
    commit('RDAddConversation', payload)
  },
  RDRemoveActiveConversation:({commit}, payload) => {
    commit('RDRemoveActiveConversation', payload)
  },
  RDSetLoading:({commit}, payload) => {
    commit('RDSetLoading', payload)
  },
  RDSetUnreadConversations:({commit}, payload) => {
    commit('RDSetUnreadConversations', payload)
  },
  RDAddIntoUnreadConversations:({commit}, payload) => {
    commit('RDAddIntoUnreadConversations', payload)
  },
  RDRemoveFromUnreadConversations:({commit}, payload) => {
    commit('RDRemoveFromUnreadConversations', payload)
  },
}

export default {
  state,
  mutations,
  actions,
}
