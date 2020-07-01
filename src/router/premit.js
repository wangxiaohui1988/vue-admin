import router from './index'
import store from '../store/index'
import { getToken, removToken, removeUserName } from '../utils/app'

const whiteRouter = ['/login']

router.beforeEach((to, from, next) => {
  if (getToken()) {
    // 登录状态直接跳转到登录页面清楚缓存数据
    if (to.path === '/login') {
      // 清除cookie
      removToken()
      removeUserName()
      // 清除store数据
      store.commit('app/SET_TOKEN', '')
      store.commit('app/SET_USERNAME', '')
      next()
    } else {
      next()
    }
  } else {
    // indexOf方法，判断数组中是否存在指定的某个对象，如果不存在，则返回-1
    if (whiteRouter.indexOf(to.path) !== -1) { // 存在
      next()
    } else {
      next('/login')
    }
  }
})
