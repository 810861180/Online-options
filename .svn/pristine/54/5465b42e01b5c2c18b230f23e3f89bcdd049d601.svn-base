const _import = require('./import-' + process.env.NODE_ENV)
const layout = _import('layout/router-view')

export default [
  {
    path: '/basicSetup',
    name: 'BasicSetup',
    redirect: 'noredirect',
    component: layout,
    changeable: true,
    meta: {
      title: '基本设置',
      icon: 'iconset'
    },
    children: [
      {
        path: 'activity',
        component: _import('basicSetup/activity'),
        name: 'Activity',
        meta: {
          title: '活动信息',
          icon: 'iconhuodong1'
        }
      },
      {
        path: 'honored',
        component: _import('basicSetup/honored'),
        name: 'Aonored',
        meta: {
          title: '嘉宾介绍',
          icon: 'iconhuiyijiabin'
        }
      },
      {
        path: 'schedule',
        component: _import('basicSetup/schedule'),
        name: 'Schedule',
        meta: {
          title: '会议日程',
          icon: 'iconricheng'
        }
      },
      {
        path: 'signin',
        component: _import('basicSetup/signin'),
        name: 'Signin',
        meta: {
          title: '扫码签到',
          icon: 'icontianchongxing'
        }
      },
      {
        path: 'templateInfo',
        component: _import('basicSetup/templateInfo'),
        name: 'TemplateInfo',
        meta: {
          title: '模板消息',
          icon: 'iconmoban'
        }
      },
      {
        path: 'invite',
        component: _import('basicSetup/invite'),
        name: 'Invite',
        meta: {
          title: '邀请函',
          icon: 'iconyaoqinghan'
        }
      },
      {
        path: 'registrationData',
        component: _import('basicSetup/registrationData'),
        name: 'RegistrationData',
        meta: {
          title: '报名数据',
          icon: 'iconhuodong1'
        }
      },
      {
        path: 'price',
        component: _import('price/index'),
        name: 'price',
        meta: {
          title: '票价',
          icon: 'iconjiage'
        }
      }
    ]
  }
]
