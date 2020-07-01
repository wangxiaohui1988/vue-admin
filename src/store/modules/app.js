import { Login } from '@/api/login'
import { setToken, removToken, setUserName, getUserName, removeUserName } from '@/utils/app'

const state = {
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
  token: '',
  username: getUserName() || ''
}

const getters = {
  isCollapse: state => state.isCollapse
}

const mutations = { // 同步
  SET_COLLAPSE (state) {
    state.isCollapse = !state.isCollapse
    sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
  },
  SET_TOKEN (state, value) {
    state.token = value
  },
  SET_USERNAME (state, value) {
    state.username = value
  }
}

const actions = { // 异步
  login (content, requestData) {
    return new Promise((resolve, reject) => {
      Login(requestData).then((response) => {
        let data = response.data.data
        // 存储到Vuex
        content.commit('SET_TOKEN', data.token)
        content.commit('SET_USERNAME', data.username)
        // 存储到cookie
        setToken(data.token)
        setUserName(data.username)
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  exit ({ commit }) {
    return new Promise((resolve, reject) => {
      // 清除cookie
      removToken()
      removeUserName()
      // 清除store数据
      commit('SET_TOKEN', '')
      commit('SET_USERNAME', '')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
