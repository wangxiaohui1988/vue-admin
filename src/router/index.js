import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // 重定向
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/console',
    name: 'Console',
    component: () => import('../views/Layout/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
