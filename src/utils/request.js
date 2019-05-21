import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'

const Axios2 = axios.create({
  baseURL: '/ips/',
  timeout: 30000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

// POST传参序列化(添加请求拦截器)
Axios2.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (config.method === 'post') {
      // 序列化
      config.data = qs.stringify(config.data)
      // 温馨提示,若是贵公司的提交能直接接受json 格式,可以不用 qs 来序列化的
    }
    if (Vue.cookie.get('token')) {
      config.headers.Authorization = Vue.cookie.get('token')
    }
    return config
  },
  error => {
    // error 的回调信息
    return Promise.reject(error.data.msg)
  }
)

// 返回状态判断(添加响应拦截器)
Axios2.interceptors.response.use(

)

export default Axios2
