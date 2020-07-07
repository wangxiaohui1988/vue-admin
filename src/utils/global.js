import { MessageBox } from 'element-ui'
export default {
  install (Vue, options) {
    // 注册全避方法
    Vue.prototype.confirm = (params) => {
      console.log('全局方法')
      MessageBox.confirm(params.content, params.tip || '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: params.type || 'warning',
        center: true
      }).then(() => {
        params.fn()
        console.log('delete success')
      }).catch(() => {
        console.log('delete error')
      })
    }
  }
}
