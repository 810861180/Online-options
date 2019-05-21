/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 价格
 * @param {*} s
 */
export function isPrice (s) {
  return (/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/).test(s)
}

/**
 * 姓名
 */
export const nameReg = /^([\u4E00-\uFA29·s]|[\uE7C7-\uE7F3·s]|[a-zA-Z·s]){1,20}$/
/**
 * 手机号
 */
export const phoneReg = /^1[0-9]{10}$/
/**
 * 工号
 */
export const employeeNumReg = /^\d{1,10}$/
