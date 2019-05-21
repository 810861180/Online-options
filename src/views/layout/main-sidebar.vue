<template>
  <aside class="site-sidebar" :class="'site-sidebar--' + sidebarLayoutSkin">
    <div class="site-sidebar__inner">
      <el-menu :default-active="menuActiveName || 'home'" :collapse="sidebarFold" :collapseTransition="false" class="site-sidebar__menu">
        <!-- 动态生成路由 -->
        <!-- <sub-menu
          v-for="menu in menuList"
          :key="menu.menuId"
          :menu="menu"
          :dynamicMenuRoutes="dynamicMenuRoutes">
        </sub-menu> -->
        <sub-menu v-for="(menu,index) in menuList" :key="index" :menu="menu">
        </sub-menu>
      </el-menu>
    </div>
  </aside>
</template>

<script>
import SubMenu from './main-sidebar-sub-menu'
import { deepClone } from '@/utils'
import _ from 'lodash'
export default {
  data () {
    return {
      dynamicMenuRoutes: []
    }
  },
  components: {
    SubMenu
  },
  computed: {
    sidebarLayoutSkin: {
      get () { return this.$store.state.common.sidebarLayoutSkin }
    },
    sidebarFold: {
      get () { return this.$store.state.common.sidebarFold }
    },
    menuList: {
      get () { return this.$store.state.common.menuList },
      set (val) { this.$store.commit('common/setMenuList', val) }
    },
    menuActiveName: {
      get () { return this.$store.state.common.menuActiveName },
      set (val) { this.$store.commit('common/setMenuActiveName', val) }
    },
    mainTabs: {
      get () { return this.$store.state.common.mainTabs },
      set (val) { this.$store.commit('common/setMainTabs', val) }
    },
    mainTabsActiveName: {
      get () { return this.$store.state.common.mainTabsActiveName },
      set (val) { this.$store.commit('common/setMainTabsActiveName', val) }
    },
    metId: {
      get () { return this.$store.state.met.id }
    }
  },
  mounted () {
    this.menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]')
    let list = deepClone(this.menuList)
    let arr = []
    const cookieId = this.$cookie.get('metId')
    _.map(list, (item, index) => {
      if (this.metId || cookieId) {
        item.changeable = !item.changeable
      }
      item.menuId = index
      if (item.children && item.children.length > 0) {
        _.map(item.children, (cItem, cIndex) => {
          cItem.menuId = index + '-' + cIndex
        })
      }
      arr.push(item)
    })
    this.menuList = arr
    this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
  }
}
</script>
