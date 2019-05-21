<template>
  <div>
    <div class="title">
      <div class="chunk"></div>
      <p>扫码签到</p>
    </div>
    <el-card class="box-card">
      <div>
        <span>登记签到：</span>
        <span v-if="switchValue === true" style="color:#80C269;">打开</span>
        <span v-if="switchValue === false" style="color:#DCDCDC;">关闭</span>
        <p class="switch">
          <el-switch :disabled="switchDisabled" inactive-color="#DCDCDC" :width="40" v-model="switchValue" active-color="#80C269" @change="handleSwitch"></el-switch>
        </p>
        <span style="color: rgb(220, 220, 220); margin-left: 5px;">(开启的时候，签到的时候强制信息录入)</span>
        <div class="titleBtn">数据导出</div>
      </div>

      <div class="tableCard">
        <el-row class="mt20" :gutter="10" v-loading="loading">
            <el-table :data="list" style="width: 100%;" header-cell-class-name="hedClass">
              <el-table-column prop="nickname" label="昵称" align="center">
              </el-table-column>
              <el-table-column prop="signPhone" label="手机号码" align="center">
              </el-table-column>
              <el-table-column prop="realName" label="姓名" align="center">
              </el-table-column>
              <el-table-column prop="signunit" label="单位/职位" align="center">
              </el-table-column>
              <el-table-column prop="signDate" label="签到时间" align="center">
                <slot name="header">
                  <i class="el-icon-time"></i>
                </slot>
                <template slot-scope="scope">{{convert(scope.row.signDate,false)}}</template>
              </el-table-column>
            </el-table>
            <pagination v-show="pagination.total>0&&list" ref="pagination" :total="Number(pagination.total)" :limit.sync="pagination.pageSize" :page.sync="pagination.current" @pagination="changePagination" />
            <div class="empty" style="text-align: center">
              <img v-if="!list" src="../../../static/images/empty.png" alt="empty" height="170px">
            </div>
        </el-row>
      </div>

    </el-card>
  </div>
</template>

<script>
import { api } from '@/utils'
import { stampToTimeStramp } from '@/utils/index.js'
import pagination from '../../components/pagination'

export default {
  inject: ['reload'], // 注入依赖
  components: {
    pagination
  },
  data () {
    return {
      switchValue: false,
      switchDisabled: false,
      loading: true,
      list: [],
      pagination: {},
      mStatus: 0,
      searchCondition: '',
      userInfo: undefined,
      checkAll: false,
      checkedAcitivities: [],
      options: [],
      isIndeterminate: true
    }
  },
  mounted () {
    this.querySigninData()
    this.userInfo = this.userinfo
  },
  computed: {
    userinfo () {
      return JSON.parse(this.$cookie.get('userinfo'))
    },
    params () {
      let pageSize
      let currentPage
      if (this.$refs.pagination) {
        pageSize = this.$refs.pagination.limit
        currentPage = this.$refs.pagination.current
      }
      return {
        currentPage,
        pageSize
      }
    }
  },
  methods: {
    querySigninData () {
      const paramsQ = {
        metId: this.$store.state.met.id || this.$cookie.get('metId'),
        uId: this.userinfo.id,
        currentPage: this.params.currentPage,
        pageSize: this.params.pageSize
      }
      for (var i = 0; i < paramsQ.pageSize; i++) {
        this.options.push(i)
      }

      api.querySigninData(paramsQ)
        .then(res => {
          if (res.flag) {
            if (res.data.list.length > 0) {
              this.list = res.data.list
              this.pagination = res.data.pagination
            } else {
              this.list = undefined
            }
          } else {
            this.list = undefined
            this.$notify.error({
              title: '查询失败',
              message: res.message
            })
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    changePagination (e) {
      this.loading = true
      this.params.pageSize = e.limit
      this.params.currentPage = e.page
      this.querySigninData()
    },
    handleSwitch () {
      console.log(this.switchValue)
    },
    convert (stamp) {
      return stampToTimeStramp(stamp)
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 50px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  .chunk {
    height: 100%;
    width: 12px;
    display: inline-block;
    background: $--color-primary;
  }
  p {
    display: inline-block;
    line-height: 50px;
    vertical-align: top;
    margin-left: 10px;
    font-size: 15px;
    font-family: Adobe Heiti Std R;
    font-weight: normal;
    color: $--color-primary;
  }
}

.box-card {
  margin-top: 15px;
  .switch {
    display: inline-block;
    margin-left: 5px;
  }
  .titleBtn {
    float: right;
    height: 28px;
    line-height: 26px;
    width: 80px;
    border: 1px solid rgba(210, 210, 210, 1);
    text-align: center;
    background: $--color-primary;;
    font-size: 14px;
    font-family: Adobe Heiti Std R;
    font-weight: normal;
    color: rgba(255, 254, 254, 1);
    user-select: none;
    cursor: pointer;
    &:active {
      background: #028aa1;
    }
  }
}

.tableCard {
  margin-top: 25px;
  width: 100%;
  background: #fff;
  .tableSpan{
    color: #867E7E;
  }
}
</style>
<style lang="scss">
.hedClass{
  background: $--color-primary !important;
  color: #fff;
}
</style>
