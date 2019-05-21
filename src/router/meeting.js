const _import = require('./import-' + process.env.NODE_ENV)
const layout = _import('layout/router-view')

export default [
  {
    path: '/metting',
    name: 'meeting',
    redirect: 'noredirect',
    component: layout,
    changeable: true,
    meta: {
      title: '会议安排',
      icon: 'iconhuiyianpai'
    },
    children: [
      {
        path: 'room-list',
        component: _import('rooms/index'),
        name: 'room-list',
        meta: {
          title: '会场',
          icon: 'iconhuiyishi'
        }
      },
      {
        path: 'journey',
        component: _import('journey/index'),
        name: 'journey-index',
        meta: {
          title: '日程',
          icon: 'iconrichenganpai'
        }
      },
      {
        path: 'seat',
        component: _import('journey/seat'),
        name: 'metting-seat',
        meta: {
          title: '座位',
          icon: 'iconshafa'
        }
      }
    ]
  }
]
