import router from './index'
import { getToken } from '../utils/app'

const whiteRouter = ['/login']

router.beforeEach((to, from, next) => {
  console.log(to)
  if (getToken()) {
    console.log('token存在')
  } else {
    // indexOf方法，判断数组中是否存在指定的某个对象，如果不存在，则返回-1
    if (whiteRouter.indexOf(to.path) !== -1) { // 存在
      next()
    } else {
      next('/login')
    }
  }
})
