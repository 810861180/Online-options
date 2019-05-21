/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import { isURL } from '@/utils/validate'
import {
  clearLoginInfo
} from '@/utils'
import meeting from './meeting'
import basicSetup from './basicSetup'
import forms from './forms'

Vue.use(Router)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [{
  path: '/404',
  component: _import('common/404'),
  name: '404',
  meta: {
    title: '404未找到'
  }
},
{
  path: '/login',
  component: _import('common/login'),
  name: 'login',
  meta: {
    title: '登录'
  }
},
{
  path: '/login2',
  component: _import('common/login2'),
  name: 'login2',
  meta: {
    title: '登录2'
  }
},
{
  path: '/miniapp',
  name: 'miniapp',
  meta: {
    title: '小程序'
  },
  component: _import('common/miniapp'),
  children: [
    {
      path: 'sign-up',
      component: _import('customForm/signUp'),
      name: 'sign-up',
      meta: {
        title: '在线报名'
      }
    }
  ]
},
{
  path: '*',
  redirect: '/404',
  meta: {
    title: '404'
  }
},
{
  path: '/listTable',
  name: 'ListTable',
  component: _import('pay/index')
}
]
// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
  path: '/',
  component: _import('layout/main'),
  name: 'main',
  redirect: {
    name: 'home'
  },
  meta: {
    title: '主入口整体布局'
  },
  children: [
    // 通过meta对象设置路由展示方式
    // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
    // 3. icon: 配置菜单栏的icon
    // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
    // 提示:多层菜单栏的，父级菜单栏的component设为layout！！！子菜单栏加在children中
    {
      path: '/home',
      component: _import('common/home'),
      name: 'home',
      changeable: false,
      meta: {
        title: '首页',
        icon: 'iconshouye'
      }
    },
    {
      path: '/theme',
      component: _import('common/theme'),
      name: 'theme',
      changeable: false,
      meta: {
        title: '主题',
        icon: 'iconzhuti1'
      }
    },
    {
      path: '/list',
      component: _import('list/activities'),
      name: 'activities',
      changeable: false,
      meta: {
        title: '活动管理',
        icon: 'iconhuodongguanli'
      }
    },
    {
      path: '/pay',
      component: _import('pay/merchant'),
      name: 'pay',
      changeable: false,
      meta: {
        title: '支付设置',
        icon: 'iconicon1'
      }
    },
    ...basicSetup,
    ...meeting,
    ...forms
  ],
  beforeEnter (to, from, next) {
    let token = Vue.cookie.get('token')
    let homeToken = to.query.token
    if (to.path === '/home' && homeToken) {
      clearLoginInfo()
      next()
    } else {
      if (!token || !/\S/.test(token)) {
        clearLoginInfo()
        next({
          name: 'login'
        })
      } else {
        next()
      }
    }
  }
}
const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({
    y: 0
  }),
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: globalRoutes.concat(mainRoutes)
})

router.beforeEach((to, from, next) => {
  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表, 添加并保存本地存储
  NProgress.start()
  let token = Vue.cookie.get('token')
  if (
    router.options.isAddDynamicMenuRoutes ||
    fnCurrentRouteType(to, globalRoutes) === 'global'
  ) {
    if (token) {
      if (to.path === '/login') {
        if (from.path === '/home') {
          next({
            path: '/'
          })
        } else {
          next({
            path: from.path
          })
        }
        NProgress.done()
      } else {
        next()
      }
    } else {
      next()
    }
    // next()
  } else {
    router.options.isAddDynamicMenuRoutes = true
    sessionStorage.setItem('menuList', JSON.stringify(mainRoutes.children || '[]'))
    // sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
    next({
      ...to,
      replace: true
    })
    /* 调接口动态生成 */
    // next({ ...to, replace: true })
    // http({
    //   url: http.adornUrl('/sys/menu/nav'),
    //   method: 'get',
    //   params: http.adornParams()
    // }).then(({ data }) => {
    //   if (data && data.code === 0) {
    //     fnAddDynamicMenuRoutes(data.menuList)
    //     router.options.isAddDynamicMenuRoutes = true
    //     sessionStorage.setItem('menuList', JSON.stringify(data.menuList || '[]'))
    //     sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
    //     next({ ...to, replace: true })
    //   } else {
    //     sessionStorage.setItem('menuList', '[]')
    //     sessionStorage.setItem('permissions', '[]')
    //     next()
    //   }
    // }).catch((e) => {
    //   console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
    //   router.push({ name: 'login' })
    // })
  }
  // } else {
  //   // next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
  //   clearLoginInfo()
  //   next({
  //     name: 'login'
  //   })
  //   NProgress.done()
  // }
})
router.afterEach(() => {
  NProgress.done() // 结束Progress
})
/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType (route, globalRoutes = []) {
  var temp = []
  for (var i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return 'global'
    } else if (
      globalRoutes[i].children &&
      globalRoutes[i].children.length >= 1
    ) {
      temp = temp.concat(globalRoutes[i].children)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
// function fnAddDynamicMenuRoutes (menuList = [], routes = []) {
//   var temp = []
//   for (var i = 0; i < menuList.length; i++) {
//     if (menuList[i].list && menuList[i].list.length >= 1) {
//       temp = temp.concat(menuList[i].list)
//     } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
//       menuList[i].url = menuList[i].url.replace(/^\//, '')
//       var route = {
//         path: menuList[i].url.replace('/', '-'),
//         component: null,
//         name: menuList[i].url.replace('/', '-'),
//         meta: {
//           menuId: menuList[i].menuId,
//           title: menuList[i].name,
//           isDynamic: true,
//           iframeUrl: ''
//         }
//       }
//       // url以http[s]://开头, 通过iframe展示
//       if (isURL(menuList[i].url)) {
//         route['path'] = `i-${menuList[i].menuId}`
//         route['name'] = `i-${menuList[i].menuId}`
//         route['meta']['iframeUrl'] = menuList[i].url
//       } else {
//         try {
//           route['component'] = _import(`modules/${menuList[i].url}`) || null
//         } catch (e) { }
//       }
//       routes.push(route)
//     }
//   }
//   if (temp.length >= 1) {
//     fnAddDynamicMenuRoutes(temp, routes)
//   } else {
//     mainRoutes.name = 'main-dynamic'
//     mainRoutes.children = routes
//     router.addRoutes([mainRoutes, {
//       path: '*',
//       redirect: {
//         name: '404'
//       }
//     }])
//     sessionStorage.setItem(
//       'dynamicMenuRoutes',
//       JSON.stringify(mainRoutes.children || '[]')
//     )
//     console.log('\n')
//     console.log(
//       '%c!<-------------------- 动态(菜单)路由 s -------------------->',
//       'color:blue'
//     )
//     console.log(mainRoutes.children)
//     console.log(
//       '%c!<-------------------- 动态(菜单)路由 e -------------------->',
//       'color:blue'
//     )
//   }
// }
export default router
