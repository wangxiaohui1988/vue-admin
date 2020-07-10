import { GetInfoCategoryAll } from '@/api/news'
import { reactive } from '@vue/composition-api'

export function common () {
  const categoryItem = reactive({
    item: []
  })
  const getInfoCategory = () => {
    GetInfoCategoryAll().then(response => {
      let data = response.data.data
      categoryItem.item = data
    }).catch(error => {
      console.log(error)
    })
  }

  return { categoryItem, getInfoCategory }
}

export function timestampToTime (timestamp) {
  let now = new Date(timestamp * 1000)
  let Y = now.getFullYear() + '-'
  let M = (now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1) + '-'
  let D = now.getDate() + ' '
  let h = now.getHours() + ':'
  let m = now.getMinutes() + ':'
  let s = now.getSeconds()
  return Y + M + D + h + m + s
}
