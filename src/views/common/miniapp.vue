<template>
  <router-view></router-view>
</template>

<script>
import _ from 'lodash'

export default {
  beforeRouteEnter: (to, from, next) => {
    let { token, part, memberId } = to.query
    next(vm => {
      if (!_.isEmpty(token)) {
        vm.$cookie.set('token', token)
        vm.$cookie.set('memberId', memberId)
        next({ name: part })
      }
    })
  }
}
</script>
