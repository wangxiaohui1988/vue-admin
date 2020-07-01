import { Login } from '@/api/login'
import { setToken, setUserName, getUserName } from '@/utils/app'

const state = {
  token: '',
  username: getUserName() || ''
}

const mutations = {
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
