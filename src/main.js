// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import VueCookie from 'vue-cookie'
import axios from '@/utils/axios'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/element-ui-theme'
import '@/assets/scss/index.scss'
import '@/assets/scss/_variables.scss'
// import cloneDeep from 'lodash/cloneDeep'
import FormMaking from './customFormIndex'
import { isAuth, api } from '@/utils'
// import cloneDeep from 'lodash/cloneDeep'
Vue.use(FormMaking)
Vue.use(VueCookie)
Vue.use(Element)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
// 保存整站vuex本地储存初始状态
// window.SITE_CONFIG['storeState'] = cloneDeep(store.state)
// 挂载全局
Object.keys(api).forEach(key => {
  Vue.prototype['$' + key] = api[key]
})
Vue.prototype.$axios = axios // ajax请求方法
Vue.prototype.isAuth = isAuth // 权限方法
// console.log(Vue.prototype)
// 保存整站vuex本地储存初始状态
// window.SITE_CONFIG['storeState'] = cloneDeep(store.state)

// 自动化注册全局组件
const Modules = [
  require.context('./components/dialog', true, /\.vue$/)
]
Modules.forEach(el => {
  el.keys().forEach(fileName => {
    // 获取组件配置
    const componentConfig = el(fileName)
    // 剥去文件名开头的 `./` 和`.vue`结尾的扩展名
    const componentName = fileName.replace(/^\.\//, '').replace(/\.vue$/, '')
    // 全局注册组件
    const component = Vue.component(
      componentName.replace(/\//, '-'),
      componentConfig.default || componentConfig
    )
    // console.log(component)
  })
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
