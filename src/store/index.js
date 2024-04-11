import Vue from 'vue'
import Vuex from 'vuex'
// import { getToken } from '../api/home' 

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    collapseState: false
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setCollapseState(state, collapseState) {
      state.collapseState = collapseState
    }
  },
  // actions: {
  //   getTokenValue({commit}, queryParams) {
  //     return new Promise((resolve, reject) => {
  //       getToken(queryParams).then(res => {
  //         console.log('store.state.token:', res)
  //         commit('setToken', res.msg)
  //         resolve(res)
  //       }).catch(err => {
  //         reject(err)
  //       })
  //     })
  //   },
  // },
  modules: {
  }
})
