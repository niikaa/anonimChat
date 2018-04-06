import Vue from 'vue'
import router from '../../router'

const state = {
  facebookObject: null,
  isLoggedIn: false,
  userResponse:null,
  friends_ids: null,
  isFetching: true,
}

const mutations = {
  setFacebookResponse(state, response) {
    state.isLoggedIn = true
    state.friends_ids = []
    state.userResponse = response
    for(var i=0;i<response.friends.data.length;i++){
      state.friends_ids.push(response.friends.data[i].id)
    }
  },
  setFacebookObject(state,facebook){
    state.facebookObject = facebook;
  },
  removeFacebookResponse(state, response){
    state.isLoggedIn = false
    state.userResponse = response
  },
  changeFetchStatus(state, response){
    state.isFetching = response
  },
}

const actions = {
  setFacebookResponse:({commit}, payload) => {
    commit('setFacebookResponse', payload)
  },
  setFacebookObject:({commit}, payload) => {
    commit('setFacebookObject', payload)
  },
  removeFacebookResponse:({commit}, payload) => {
    commit('removeFacebookResponse', payload)
  },
  changeFetchStatus:({commit}, payload) => {
    commit('changeFetchStatus', payload)
  },
}

export default {
  state,
  actions,
  mutations,
}
