import { Login } from '@/api/login'

const actions = { // 异步
  login (content, requestData) {
    return new Promise((resolve, reject) => {
      Login(requestData).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  actions
}
