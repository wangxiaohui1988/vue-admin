const state = {
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
}

const getters = {
  isCollapse: state => state.isCollapse
}

const mutations = { // 同步
  SET_COLLAPSE (state) {
    state.isCollapse = !state.isCollapse
    sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
