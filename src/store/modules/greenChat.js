import Vue from 'vue'

const state = {
  active_friend_id: null,

}

const mutations =  {
  GRSetActiveFriendId(state, active_friend_id){
    state.active_friend_id = active_friend_id;
  }
}

const actions = {
  GRSetActiveFriendId:({commit}, payload) => {
    commit('GRSetActiveFriendId', payload)
  }
}

export default {
  state,
  mutations,
  actions,
}
