import { GetInfoCategoryAll } from '@/api/news'

const actions = {
  getInfoCategory (content) {
    return new Promise((resolve, reject) => {
      GetInfoCategoryAll().then(response => {
        let retData = response.data.data
        resolve(retData)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  actions
}
