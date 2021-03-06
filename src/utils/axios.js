import Vue from 'vue'
import router from '@/router'
let axios = require('axios')

axios.defaults.timeout = 30000
axios.defaults.maxContentLength = 1048576
axios.defaults['Content-Type'] = 'application/json;charset=UTF-8'
let baseURL
axios.defaults.baseURL = (function () {
  if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://192.168.31.199:8080'
    // baseURL = process.env.BASE_API
  } else if (process.env.NODE_ENV === 'release') {
    baseURL = 'http://testomsapi.junyanginfo.com'
  } else if (process.env.NODE_ENV === 'production') {
    baseURL = 'http://omsapi.junyanginfo.com'
  }
  console.log('tag')
  console.log(process.env.OPEN_PROXY)
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  baseURL = process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : baseURL
  return baseURL
})()
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let accessToken = Vue.cookie.get('token') ? Vue.cookie.get('token') : ''
  console.log(accessToken)
  // console.log(access_token)
  if (accessToken) {
    config.headers['Token'] = accessToken
  }
  if (config.method === 'post') {
    // config.data = {
    //   ...config.data,
    //   _t: Date.parse(new Date()) / 1000,
    // }
  } else if (config.method === 'get') {
    config.params = {
      _t: Date.parse(new Date()) / 1000,
      ...config.params
    }
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  /*
   * 207：操作过于频繁；401：没权限；404：请求不存在；500：服务器错误
  */
  if (response.data && response.data.code === 207 && response.data.code === 401 && response.data.code === 404 && response.data.code === 500) { // 401, token失效
    // clearLoginInfo()
    router.push({ name: 'login' })
  }
  return response.data
}, function (error) {
  return Promise.reject(error)
})
// 接口请求地址
axios.adornUrl = (actionName) => {
  actionName = actionName || ''
  return ((process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY) ? '/proxyApi/' : baseURL) + actionName
  // return baseURL + actionName
}
export default axios
