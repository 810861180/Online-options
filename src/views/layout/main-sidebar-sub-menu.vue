<template>
  <!-- 调接口动态生成 -->
  <!-- <el-submenu
    v-if="menu.list && menu.list.length >= 1"
    :index="menu.menuId + ''"
    :popper-class="'site-sidebar--' + sidebarLayoutSkin + '-popper'">
    <template slot="title">
      <icon-svg :name="menu.icon || ''" class="site-sidebar__menu-icon"></icon-svg>
      <span>{{ menu.name }}</span>
    </template>
    <sub-menu
      v-for="item in menu.list"
      :key="item.menuId"
      :menu="item"
      :dynamicMenuRoutes="dynamicMenuRoutes">
    </sub-menu>
  </el-submenu>
  <el-menu-item v-else :index="menu.menuId + ''" @click="gotoRouteHandle(menu)">
    <icon-svg :name="menu.icon || ''" class="site-sidebar__menu-icon"></icon-svg>
    <span>{{ menu.name }}</span>
  </el-menu-item> -->
  <div>
    <div v-if="!menu.changeable">
      <el-submenu v-if="menu.children && menu.children.length >= 1" :index="menu.menuId + ''" :popper-class="'site-sidebar--' + sidebarLayoutSkin + '-popper'">
        <template slot="title">
          <i class='icon iconfont' :class='menu.meta.icon'></i>
          <span :class="{'site-navbar__brand-lg':sidebarFold}">{{menu.meta.title}}</span>
        </template>
        <sub-menu class="first-floor" v-for="item in menu.children" :key="item.menuId" :menu="item">
        </sub-menu>
      </el-submenu>
      <el-menu-item v-else :index="menu.menuId + ''" @click="$router.push({ name: menu.name })">
        <i class='icon iconfont' :class='menu.meta.icon'></i>
        <span slot="title">{{menu.meta.title}}</span>
      </el-menu-item>
    </div>
  </div>
</template>

<script>
import SubMenu from './main-sidebar-sub-menu'
export default {
  name: 'sub-menu',
  props: {
    menu: {
      type: Object,
      required: true
    }
    // dynamicMenuRoutes: {
    //   type: Array,
    //   required: true
    // }
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
    }
  },
  methods: {
    // 通过menuId与动态(菜单)路由进行匹配跳转至指定路由
    gotoRouteHandle (menu) {
      var route = this.dynamicMenuRoutes.filter(item => item.meta.menuId === menu.menuId)
      if (route.length >= 1) {
        this.$router.push({ name: route[0].name })
      }
    }
  }
}
</script>
