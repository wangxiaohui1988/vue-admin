import { MessageBox } from 'element-ui'
import { ref } from '@vue/composition-api'

export function global (params) {
  const str = ref('')
  const confirm = (params) => {
    console.log('Vue3.0全局方法')
    MessageBox.confirm(params.content, params.tip || '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: params.type || 'warning',
      center: true
    }).then(() => {
      let requestData = params.id || ''
      params.fn(requestData)
    }).catch(() => {
    })
  }
  return { str, confirm }
}
