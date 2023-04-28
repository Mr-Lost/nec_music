import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: window.sessionStorage.getItem('user'),
  isActive: this.user != null,
  masked: false,
  musicList: [],
  curPlay: 1
}
const getters = {
  GET_LIST (state) {
    return state.musicList
  },
  GET_LIST_NUM (state) {
    return state.musicList.length
  },
  CUR_SONG (state) {
    return state.curPlay
  }
}
const mutations = {
  GET_USER (state, data) {
    state.user = data
    window.sessionStorage.setItem('user', data)
  },
  LOGOUT (state) {
    state.user = null
    window.sessionStorage.removeItem('state')
    window.sessionStorage.removeItem('user')
  },
  CHANGE_MASK (state) {
    state.masked = !(state.masked)
  },
  PlAY_SONG (state, data) {
    state.curPlay = state.musicList.length
    state.musicList.push(data)
  },
  CUR_PLAY (state, data) {
    state.curPlay = data
  },
  CLEAR_LIST (state) {
    state.musicList = []
  },
  ADD_ALL (state, data) {
    state.musicList = data
  }
}
const actions = {
}

export default new Vuex.Store({
  getters,
  state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : state,
  mutations,
  actions
})
