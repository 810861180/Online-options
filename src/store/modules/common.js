export default {
  namespaced: true,
  state: {
    // 页面文档可视高度(随窗口改变大小)
    documentClientHeight: 0,
    // 导航条, 布局风格, defalut(默认) / inverse(反向)
    navbarLayoutType: 'default',
    // 侧边栏, 布局皮肤, light(浅色) / dark(黑色)
    sidebarLayoutSkin: 'dark',
    // 侧边栏, 折叠状态
    sidebarFold: false,
    // 侧边栏, 菜单
    menuList: [],
    menuActiveName: '',
    // 主入口标签页
    mainTabs: [],
    mainTabsActiveName: '',
    // 主题色
    defaultColor: '#17B3A3'
  },
  mutations: {
    setDocumentClientHeight (state, height) {
      state.documentClientHeight = height
    },
    setNavbarLayoutType (state, type) {
      state.navbarLayoutType = type
    },
    setSidebarLayoutSkin (state, skin) {
      state.sidebarLayoutSkin = skin
    },
    setSidebarFold (state, fold) {
      state.sidebarFold = fold
    },
    setMenuList (state, list) {
      state.menuList = list
    },
    setMenuActiveName (state, name) {
      state.menuActiveName = name
    },
    setMainTabs (state, tabs) {
      state.mainTabs = tabs
    },
    setMainTabsActiveName (state, name) {
      state.mainTabsActiveName = name
    },
    setDefaultColor (state, name) {
      state.defaultColor = name
    }
  }
}
