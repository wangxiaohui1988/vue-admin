const state = {
  /**
     * 已经储存了值，不刷新页面的时候，值一直存在vuex
     * 刷新页面，就会去取session的值，赋值给变量
     * key: value
     * key: value
     */
  id: '' || sessionStorage.getItem('infoId'),
  title: '' || sessionStorage.getItem('infoTitle')
}

const getters = {

}

const mutations = {
  SET_ID (state, value) {
    state.id = value
    // 本地存储
    sessionStorage.setItem('infoId', value)
  },
  SET_TITLE (state, value) {
    state.title = value
    sessionStorage.setItem('infoTitle', value)
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
