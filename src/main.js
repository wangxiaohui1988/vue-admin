import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCompositionApi from '@vue/composition-api'

// 全局方法
// import global from './utils/global'
// 自定义全局组件
import './icons/index'
// router.router.beforeEach((to, from, next) => {}
import './router/premit'

Vue.use(VueCompositionApi)
Vue.use(ElementUI)
// Vue.use(global)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
