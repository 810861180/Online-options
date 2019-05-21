const _import = require('./import-' + process.env.NODE_ENV)
const layout = _import('layout/router-view')

export default [
  {
    path: '/custom-form',
    name: 'custom-form',
    redirect: 'noredirect',
    component: layout,
    changeable: true,
    meta: {
      title: '自定义表单',
      icon: 'iconbiaodanpeizhi'
    },
    children: [{
      path: 'enter-form',
      component: _import('customForm/enterForm'),
      name: 'enter-form',
      meta: {
        title: '报名表单',
        icon: 'iconbaoming'
      }
    },
    {
      path: 'sign-form',
      component: _import('customForm/signForm'),
      name: 'sign-form',
      meta: {
        title: '签到表单',
        icon: 'iconsignup'
      }
    },
    {
      path: 'editor',
      component: _import('customForm/editor'),
      name: 'editor',
      meta: {
        title: '编辑器',
        icon: 'iconfuwenbenkuang'
      }
    },
    {
      path: 'sign-up',
      component: _import('customForm/signUp'),
      name: 'sign-up',
      meta: {
        title: '在线报名'
      }
    }
    ]
  }
]
