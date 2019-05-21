import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import api from './api'
import _ from 'lodash'

/**
 * 获取uuid
 */
export function getUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth (key) {
  return JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(key) !== -1 || false
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate (data, id = 'id', pid = 'parentId') {
  var res = []
  var temp = {}
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}

/**
 * 清除登录信息
 */
export function clearLoginInfo () {
  const menu = deepClone(store.state.common.menuList)
  const metId = store.state.met.id
  const cookieId = Vue.cookie.get('metId')

  _.map(menu, (item) => {
    if (metId || cookieId) {
      item.changeable = !item.changeable
    }
  })
  store.commit('common/setMenuList', menu)
  sessionStorage.setItem('menuList', menu)

  Vue.cookie.delete('token')
  Vue.cookie.delete('userinfo')
  // store.commit('resetStore')
  store.commit('met/setId', undefined)
  Vue.cookie.delete('metId')
  router.options.isAddDynamicMenuRoutes = false
}

//  zhuxian
export function deepCopy (obj) {
  const result = Array.isArray(obj) ? [] : {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        result[key] = deepCopy(obj[key])
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}
export { api }

export const loadJs = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.type = 'text/javascript'
    document.body.appendChild(script)
    script.onload = () => {
      resolve()
    }
  })
}

export const loadCss = (url) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    document.head.appendChild(link)
    link.onload = () => {
      resolve()
    }
  })
}

export const generateUUID = () => {
  var d = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16)
  })
  return uuid
}

export const stampToDate = (stamp, isDay) => {
  var transfer = new Date(stamp)
  var year = transfer.getFullYear()
  var month = transfer.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  }
  var date = transfer.getDate()
  if (date < 10) {
    date = '0' + date
  }
  var hour = transfer.getHours()
  if (hour < 10) {
    hour = '0' + hour
  }
  var minute = transfer.getMinutes()
  if (minute < 10) {
    minute = '0' + minute
  }
  // var second = stamp.getSeconds()
  if (isDay) {
    return year + '-' + month + '-' + date
  } else {
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute
  }
}

export const stampToTimeStramp = (stamp) => {
  var transfer = new Date(stamp)
  var year = transfer.getFullYear()
  var month = transfer.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  }
  var date = transfer.getDate()
  if (date < 10) {
    date = '0' + date
  }
  var hour = transfer.getHours()
  if (hour < 10) {
    hour = '0' + hour
  }
  var minute = transfer.getMinutes()
  if (minute < 10) {
    minute = '0' + minute
  }
  var second = transfer.getSeconds()
  if (second < 10) {
    second = '0' + second
  }
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
}

// 深拷贝函数
export const deepClone = (obj) => {
  let _obj = JSON.stringify(obj)
  let objClone = JSON.parse(_obj)
  return objClone
}
