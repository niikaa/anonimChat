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
  BLSetActiveFriend(state, active_friend){
    state.conversation_id = null
    state.conversation_isFetching = true
    state.card_isFetcing = true
    state.active_friend = active_friend
  },
  BLRemoveActiveConversation(state, payload){
    state.conversation_id = null;
  },
  BLRemoveActiveFriend(state, payload) {
    state.card_isFetcing = true
    state.active_friend = null
  },
  BLChangeCardFetchStatus(state, payload) {
    state.card_isFetcing = payload
  },
  BLSetConversation(state, payload) {
    state.card_isFetcing = true
    state.active_friend = null
    state.conversation_isFetching = true
    state.conversation_id = payload
  },
  BLChangeChatFetchStatus(state, payload) {
    state.conversation_isFetching = payload
  },
  BLAddMessage(state, payload) {
    state.messages.push(payload)
  },
  BLAddConversationMessages(state, payload){
    state.messages = []
    state.messages = state.messages.concat(payload)
  },
  BLStickConversationMessages(state, payload){
    state.messages = payload.concat(state.messages)
  },
  BLClearMessages(state, payload) {
    state.messages = []
  },
  BLAddConversations(state, payload){
    state.conversations = state.conversations.concat(payload)
  },
  BLClearConversation(state, payload){
    state.conversations = []
  },
  BLConversationsScrollInitiate(state, payload){
    state.skip = 0;
    state.limit = 20;
  },
  BLConversationsScrollDown(state, payload){
    state.skip += state.limit
  },
  BLConnectMessageSocket(state, payload){
    state.messageSocketConnected = true;
  },
  BLDisconnectMessageSocket(state, payload){
    state.messageSocketConnected = false;
  },
  BLAddConversation(state, payload){
    for(var i = 0; i < state.conversations.length; i ++){
      if(state.conversations[i]._id == payload._id){
        state.conversations.splice(i, 1)
        state.skip ++;
        break;
      }
    }
    state.conversations.unshift(payload)
  },
  BLSetLoading(state, payload) {
    state.loading = payload
  },
  BLSetUnreadConversations(state, payload) {
    state.unreadConversations = payload
  },
  BLAddIntoUnreadConversations(state, payload) {
    state.unreadConversations.push(payload)
  },
  BLRemoveFromUnreadConversations(state, payload) {
    const index = state.unreadConversations.indexOf(payload);
    if (index > -1) {
      state.unreadConversations.splice(index, 1);
    }
  },
  BLSeenOnFocus(state, payload) {
    for(let i = 0; i < state.conversations.length; i++){
      if(state.conversations[i]._id == payload){
        state.conversations[i].last_message.seen = true
        break
      }
    }
  },
}

const actions = {
  BLSetActiveFriend:({commit}, payload) => {
    commit('BLSetActiveFriend', payload)
  },
  BLRemoveActiveFriend:({commit}, payload) => {
    commit('BLRemoveActiveFriend', payload)
  },
  BLChangeCardFetchStatus:({commit}, payload) => {
    commit('BLChangeCardFetchStatus', payload)
  },
  BLSetConversation:({commit}, payload) => {
    commit('BLSetConversation', payload)
  },
  BLChangeChatFetchStatus:({commit}, payload) => {
    commit('BLChangeChatFetchStatus', payload)
  },
  BLAddMessage:({commit}, payload) => {
    commit('BLAddMessage', payload)
  },
  BLClearMessages:({commit}, payload) => {
    commit('BLClearMessages', payload)
  },
  BLAddConversations:({commit}, payload) => {
    commit('BLAddConversations', payload)
  },
  BLClearConversation:({commit}, payload) => {
    commit('BLClearConversation', payload)
  },
  BLAddConversationMessages:({commit}, payload) => {
    commit('BLAddConversationMessages', payload)
  },
  BLStickConversationMessages:({commit}, payload) => {
    commit('BLStickConversationMessages', payload)
  },
  BLConversationsScrollDown:({commit}, payload) => {
    commit('BLConversationsScrollDown', payload)
  },
  BLConversationsScrollInitiate:({commit}, payload) => {
    commit('BLConversationsScrollInitiate', payload)
  },
  BLConnectMessageSocket:({commit}, payload) => {
    commit('BLConnectMessageSocket', payload)
  },
  BLDisconnectMessageSocket:({commit}, payload) => {
    commit('BLDisconnectMessageSocket', payload)
  },
  BLAddConversation:({commit}, payload) => {
    commit('BLAddConversation', payload)
  },
  BLRemoveActiveConversation:({commit}, payload) => {
    commit('BLRemoveActiveConversation', payload)
  },
  BLSetLoading:({commit}, payload) => {
    commit('BLSetLoading', payload)
  },
  BLSetUnreadConversations:({commit}, payload) => {
    commit('BLSetUnreadConversations', payload)
  },
  BLAddIntoUnreadConversations:({commit}, payload) => {
    commit('BLAddIntoUnreadConversations', payload)
  },
  BLRemoveFromUnreadConversations:({commit}, payload) => {
    commit('BLRemoveFromUnreadConversations', payload)
  },
  BLSeenOnFocus:({commit}, payload) => {
    commit('BLSeenOnFocus', payload)
  }
}

export default {
  state,
  mutations,
  actions,
}
