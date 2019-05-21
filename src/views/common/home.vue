<template>
  <div class="mod-home">
    <h3>简介</h3>
    <ul>
      <li>
        首页
      </li>
    </ul>
    <el-button type="primary" @click="$router.push({name:'ListTable'})">跳转到支付</el-button>
  </div>
</template>

<script>
import _ from 'lodash'
// import { clearLoginInfo } from '@/utils'
export default {
  data () {
    return {
      value: ''
    }
  },
  inject: ['reload'], // 注入依赖
  computed: {
    userInfo: {
      get () {
        return this.$store.state.user.userInfo
      }
    }
  },
  beforeRouteEnter: (to, from, next) => {
    /*
     * 从旧的会务系统跳到当前页面时
     * 获取用户数据，并更改token、userinfo、页面地址
    */
    let {
      token,
      metId
    } = to.query
    next(vm => {
      if (!_.isEmpty(token)) {
        vm.$cookie.set('token', token)
        vm.$cookie.set('metId', metId)
        vm.$axios.get(vm.$getUserInfo, { params: { token: token, metId: metId } }).then((data) => {
          if (data.data.code === 200) {
            let userInfo = data.data.data
            vm.$store.commit('user/setUserInfo', JSON.stringify(userInfo))
            vm.$cookie.set('userinfo', JSON.stringify(userInfo))
            next({ name: 'home' })
            vm.reload()
          }
        })
      }
    })
  },
  mounted () {
    console.log(this.userInfo)
  }
}
</script>

<style lang="scss" scoped>
.mod-home {
  line-height: 1.5;
}
</style>
