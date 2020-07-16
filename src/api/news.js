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

/** 新增信息 */
export function AddInfo (data) {
  return service.request({
    method: 'post',
    url: '/news/add/',
    data
  })
}

/** 获取信息数据 */
export function GetList (data) {
  return service.request({
    method: 'post',
    url: '/news/getList/',
    data
  })
}

/** 删除信息 */
export function DeletInfo (data) {
  return service.request({
    method: 'post',
    url: '/news/deleteInfo/',
    data
  })
}

/** 修改信息 */
export function EditInfo (data) {
  return service.request({
    method: 'post',
    url: '/news/editInfo/',
    data
  })
}

/** 信息分类添加子级 */
export function AddChildrenCategory (data) {
  return service.request({
    method: 'post',
    url: '/news/addChildrenCategory/',
    data
  })
}
