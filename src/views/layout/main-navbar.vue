<template>
  <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
    <div class="site-navbar__header">
      <h1 class="site-navbar__brand" @click="$router.push({ name: 'home' })">
        <a class="site-navbar__brand-lg" href="javascript:;">会议管家系统 <img src="~@/../static/images/logo.png" alt="" class='logo_img'></a>
        <a class="site-navbar__brand-mini" href="javascript:;"><img src="~@/../static/images/logo.png" alt="" class='logo_img'></a>
      </h1>
    </div>
    <div class="site-navbar__body clearfix">
      <el-menu class="site-navbar__menu" mode="horizontal">
        <el-menu-item class="site-navbar__switch" index="0" @click="sidebarFold = !sidebarFold">
          <el-tooltip v-if="sidebarFold" effect="dark" content="展开" placement="bottom">
            <i class='icon iconfont iconcaidanopen'></i>
          </el-tooltip>
          <el-tooltip v-else effect="dark" content="折叠" placement="bottom">
            <i class='icon iconfont iconcaidanclose'></i>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item class="site-navbar__switch" index="1">
          <el-tooltip v-if="showReturn" effect="dark" content="返回活动列表" placement="bottom">
            <i class='icon iconfont iconfanhui' @click="returnHome" />
          </el-tooltip>
        </el-menu-item>
      </el-menu>
      <el-menu class="site-navbar__menu site-navbar__menu--right" mode="horizontal">
        <!-- <el-menu-item index="1" @click="$router.push({ name: 'theme' })">
          <template slot="title">
            <el-badge value="new">
              <icon-svg name="shezhi" class="el-icon-setting"></icon-svg>
            </el-badge>
          </template>
        </el-menu-item> -->
        <!--<el-menu-item index="2">-->
        <!--<el-badge value="hot">-->
        <!--<a href="//www.renren.io/" target="_blank">官方社区</a>-->
        <!--</el-badge>-->
        <!--</el-menu-item>-->
        <!--<el-submenu index="3">-->
        <!--<template slot="title">Git源码</template>-->
        <!--<el-menu-item index="2-1"><a href="//github.com/daxiongYang/renren-fast-vue" target="_blank">前端</a></el-menu-item>-->
        <!--<el-menu-item index="2-2"><a href="//git.oschina.net/renrenio/renren-fast" target="_blank">后台</a></el-menu-item>-->
        <!--<el-menu-item index="2-3"><a href="//git.oschina.net/renrenio/renren-generator" target="_blank">代码生成器</a></el-menu-item>-->
        <!--</el-submenu>-->
        <el-menu-item class="site-navbar__avatar" index="3">
          <el-dropdown :show-timeout="0" placement="bottom" trigger="click" v-if="userInfo" @visible-change="visibleChange">
            <span class="el-dropdown-link">
              <!-- <img src="~@/assets/img/avatar.png" :alt="userName"> -->{{ userInfo.username }}
              <i class="isOpen" :class="isOpen?'el-icon-caret-top':'el-icon-caret-bottom'"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item @click.native="updateBaseInfo('userInfo')">个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="updateBaseInfo('bindWxCode')">绑定微信号</el-dropdown-item> -->
              <el-dropdown-item @click.native="updatePasswordHandle()">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="logoutHandle()">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 弹窗, 修改密码 -->
    <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password>
    <!-- 弹窗，个人中心or绑定微信号 -->
    <el-dialog class="base-info-wrap" :title="baseInfoTitle" :visible.sync="baseInfoVisible" :append-to-body="true">
      <region :type="'updateBaseInfo'"></region>
    </el-dialog>
  </nav>
</template>
<script>
import { TimelineMax, Linear } from 'gsap/TweenMax'
import UpdatePassword from './main-navbar-update-password'
import Region from '@/components/region'
import { clearLoginInfo } from '@/utils'
export default {
  inject: ['reload'], // 注入依赖
  data () {
    return {
      updatePassowrdVisible: false,
      isOpen: false,
      baseInfoVisible: false,
      baseInfoTitle: '',
      showReturn: false
    }
  },
  mounted () {
    // logo动画
    let t = new TimelineMax()
    t.staggerTo('.logo_img', 2, {
      transformStyle: 'preserve-3d',
      rotationY: -360,
      ease: Linear.easeNone,
      repeat: -1,
      repeatDelay: 5
    })

    const cookieId = this.$cookie.get('metId')
    if (this.metId || cookieId) {
      this.showReturn = true
    }
  },
  components: {
    UpdatePassword,
    Region
  },
  computed: {
    navbarLayoutType: {
      get () { return this.$store.state.common.navbarLayoutType }
    },
    sidebarFold: {
      get () { return this.$store.state.common.sidebarFold },
      set (val) { this.$store.commit('common/setSidebarFold', val) }
    },
    mainTabs: {
      get () { return this.$store.state.common.mainTabs },
      set (val) { this.$store.commit('common/setMainTabs', val) }
    },
    userInfo: {
      get () {
        if (JSON.parse(this.$cookie.get('userinfo'))) {
          return JSON.parse(this.$cookie.get('userinfo'))
        }
      }
    },
    metId: {
      get () { return this.$store.state.met.id }
    }
  },
  methods: {
    // 修改密码
    updatePasswordHandle () {
      this.updatePassowrdVisible = true
      this.$nextTick(() => {
        this.$refs.updatePassowrd.init()
      })
    },
    // 退出
    logoutHandle () {
      this.$confirm(`确定退出操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.$http({
        //   url: this.$http.adornUrl('/sys/logout'),
        //   method: 'post',
        //   data: this.$http.adornData()
        // })
        clearLoginInfo()
        this.$router.push({ name: 'login' })
        // this.$axios.post('/sys/logout', this.$axios.adornData).then(({ data }) => {
        //   if (data && data.code === 0) {
        //     clearLoginInfo()
        //     this.$router.push({ name: 'login' })
        //   }
        // })
      }).catch(() => { })
    },
    // 修改密码/退出系统显示与隐藏事件
    visibleChange (isShow) {
      this.isOpen = isShow
    },
    // 个人中心or绑定微信号
    updateBaseInfo (type) {
      this.baseInfoVisible = true
      if (type === 'userinfo') {
        this.baseInfoTitle = '个人中心'
      } else {
        this.baseInfoTitle = '绑定微信号'
      }
    },
    returnHome () {
      this.$store.commit('met/setId', undefined)
      this.$cookie.delete('metId')
      this.$router.push({ name: 'activities' })
      this.reload()
    }
  }
}
</script>
<style lang="scss" scoped>
.site-navbar--inverse {
  .site-navbar__switch {
    > i.iconfont {
      color: $light !important;
    }
  }
}
.site-navbar__switch {
  > i.iconfont {
    font-size: $size20 !important;
  }
}
.logo_img {
  height: 50%;
}
.base-info-wrap {
  /deep/ {
    .region-wrap {
      position: static;
      width: auto;
      padding: 0;
    }
  }
}
</style>
