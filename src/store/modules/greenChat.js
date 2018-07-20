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
  GRSetActiveFriend(state, active_friend){
    state.conversation_id = null
    state.conversation_isFetching = true
    state.card_isFetcing = true
    state.active_friend = active_friend
  },
  GRRemoveActiveConversation(state, payload){
    state.conversation_id = null;
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
  GRAddConversationMessages(state, payload){
    state.messages = []
    state.messages = state.messages.concat(payload)
  },
  GRStickConversationMessages(state, payload){
    state.messages = payload.concat(state.messages)
  },
  GRClearMessages(state, payload) {
    state.messages = []
  },
  GRAddConversations(state, payload){
    state.conversations = state.conversations.concat(payload)
  },
  GRClearConversation(state, payload){
    state.conversations = []
  },
  GRConversationsScrollInitiate(state, payload){
    state.skip = 0;
    state.limit = 20;
  },
  GRConversationsScrollDown(state, payload){
    state.skip += state.limit
  },
  GRConnectMessageSocket(state, payload){
    state.messageSocketConnected = true;
  },
  GRDisconnectMessageSocket(state, payload){
    state.messageSocketConnected = false;
  },
  GRAddConversation(state, payload){
    for(var i = 0; i < state.conversations.length; i ++){
      if(state.conversations[i]._id == payload._id){
        state.conversations.splice(i, 1)
        state.skip ++;
        break;
      }
    }
    state.conversations.unshift(payload)
  },
  GRSetLoading(state, payload) {
    state.loading = payload
  },
  GRSetUnreadConversations(state, payload) {
    state.unreadConversations = payload
  },
  GRAddIntoUnreadConversations(state, payload) {
    state.unreadConversations.push(payload)
  },
  GRRemoveFromUnreadConversations(state, payload) {
    const index = state.unreadConversations.indexOf(payload);
    if (index > -1) {
      state.unreadConversations.splice(index, 1);
    }
  },
  GRSeenOnFocus(state, payload) {
    for(let i = 0; i < state.conversations.length; i++){
      if(state.conversations[i]._id == payload){
        state.conversations[i].last_message.seen = true
        break
      }
    }
  },
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
  GRAddConversations:({commit}, payload) => {
    commit('GRAddConversations', payload)
  },
  GRClearConversation:({commit}, payload) => {
    commit('GRClearConversation', payload)
  },
  GRAddConversationMessages:({commit}, payload) => {
    commit('GRAddConversationMessages', payload)
  },
  GRStickConversationMessages:({commit}, payload) => {
    commit('GRStickConversationMessages', payload)
  },
  GRConversationsScrollDown:({commit}, payload) => {
    commit('GRConversationsScrollDown', payload)
  },
  GRConversationsScrollInitiate:({commit}, payload) => {
    commit('GRConversationsScrollInitiate', payload)
  },
  GRConnectMessageSocket:({commit}, payload) => {
    commit('GRConnectMessageSocket', payload)
  },
  GRDisconnectMessageSocket:({commit}, payload) => {
    commit('GRDisconnectMessageSocket', payload)
  },
  GRAddConversation:({commit}, payload) => {
    commit('GRAddConversation', payload)
  },
  GRRemoveActiveConversation:({commit}, payload) => {
    commit('GRRemoveActiveConversation', payload)
  },
  GRSetLoading:({commit}, payload) => {
    commit('GRSetLoading', payload)
  },
  GRSetUnreadConversations:({commit}, payload) => {
    commit('GRSetUnreadConversations', payload)
  },
  GRAddIntoUnreadConversations:({commit}, payload) => {
    commit('GRAddIntoUnreadConversations', payload)
  },
  GRRemoveFromUnreadConversations:({commit}, payload) => {
    commit('GRRemoveFromUnreadConversations', payload)
  },
  GRSeenOnFocus:({commit}, payload) => {
    commit('GRSeenOnFocus', payload)
  },
}

export default {
  state,
  mutations,
  actions,
}
