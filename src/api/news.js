import service from '@/utils/request'

/** 信息分类添加一级 */
export function AddFirstCategory (data) {
  return service.request({
    method: 'post',
    url: '/news/addFirstCategory/',
    data
  })
}

/** 信息分类查询 */
export function GetInfoCategoryAll (data) {
  return service.request({
    method: 'post',
    url: '/news/getCategoryAll/',
    data
  })
}

/** 删除一级分类 */
export function DelFirstCategory (data) {
  return service.request({
    method: 'post',
    url: '/news/deleteCategory/',
    data
  })
}

/** 修改一级分类 */
export function EditFirstCategory (data) {
  return service.request({
    method: 'post',
    url: '/news/editCategory/',
    data
  })
}
