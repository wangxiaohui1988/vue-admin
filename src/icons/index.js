import Vue from 'vue'
import SvgIcon from './SvgIcon'
Vue.component('svg-icon', SvgIcon)

// 解析 svg目录下的文件
const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext)
}
requireAll(req)
