import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: window.sessionStorage.getItem('user')
}
const getters = {
  get_userinfo: state => {
    return state.user
  }
}
const mutations = {
  GET_USER: (state, data) => {
    state.user = data
    window.sessionStorage.setItem('user', data)
  },
  LOGOUT: (state) => {
    state.user = null
    window.sessionStorage.removeItem('user')
  },
  set_userinfo (state, data) {
    state.user = data
    localStorage.setItem('user', JSON.stringify(data))
  }
}
const actions = {
}

export default new Vuex.Store({
  getters,
  state,
  mutations
})
