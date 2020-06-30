import Vue from 'vue'
import Vuex from 'vuex'
import { Login } from '@/api/login'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
  },
  getters: {
    isCollapse: state => state.isCollapse
  },
  mutations: { // 同步
    SET_COLLAPSE (state) {
      state.isCollapse = !state.isCollapse
      sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
    }
  },
  actions: { // 异步
    login (content, requestData) {
      return new Promise((resolve, reject) => {
        Login(requestData).then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      })
    }
  },
  modules: {
  }
})
