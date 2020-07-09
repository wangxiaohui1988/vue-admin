import Vue from 'vue'
import Vuex from 'vuex'
// import { Login } from '@/api/login'
import login from './modules/login'
import app from './modules/app'
import common from './modules/common'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    login,
    common
  }
})
