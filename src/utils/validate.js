/** 校验邮箱 */
export function validateEmail (value) {
  let reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  return !reg.test(value)
}

/** 过滤特殊字符 */
export function stripscript (str) {
  var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
  var rs = ''
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, '')
  }
  return rs
}

/** 验证密码 6至20位的字母+数字 */
export function validatePass (str) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
  return !reg.test(str)
}

/** 验证验证码 */
export function validateVCode (str) {
  let reg = /^[a-z0-9]{6}$/
  return !reg.test(str)
}
