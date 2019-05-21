<template>
  <div class="activity" v-loading="loading">
    <el-card class="p20" :body-style="{ padding: '0px' }">
      <el-row>
        <el-col :span="6">
          <el-button :type="mStatus===0? 'primary':null" :class="mStatus!==0?'gray':null" round @click="changeStatus(0)">全部</el-button>
          <el-button :type="mStatus===2? 'primary':null" :class="mStatus!==2?'gray':null" round @click="changeStatus(2)">进行中</el-button>
          <el-button :type="mStatus===1? 'primary':null" :class="mStatus!==1?'gray':null" round @click="changeStatus(1)">已结束</el-button>
        </el-col>
        <el-col :span="8">
          <el-input placeholder="请输入要搜索的内容" v-model="searchCondition" clearable @clear="searchTopic">
            <el-button slot="append" class="addonAfter" @click="searchTopic">搜索</el-button>
          </el-input>
        </el-col>
        <el-col :span="2" :offset="8" class="rightBtn">
          <el-button class="orangeBtn" @click="manageMeeting(0, 'new')">创建活动</el-button>
        </el-col>
      </el-row>
    </el-card>
    <div v-if="list">
      <el-card class="p20" :body-style="{ padding: '0px' }">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-button v-if="checkedAcitivities.length>0" type="danger" @click="changeMeetStatus(0)">禁用</el-button>
        <el-button v-if="checkedAcitivities.length>0" type="success" @click="changeMeetStatus(1)">启用</el-button>
      </el-card>
      <el-card class="headTitle" :body-style="{ padding: '0px' }">
        <el-col :span="5" class="title">
          <span>活动</span>
        </el-col>
        <el-col :span="4" class="title">
          <span>活动名称</span>
        </el-col>
        <el-col :span="4" class="title">
          <span>时间</span>
        </el-col>
        <el-col :span="3" class="title">
          <span>地点</span>
        </el-col>
        <el-col :span="4" class="title">
          <span>活动状态</span>
        </el-col>
        <el-col :span="2" class="title">
          <span>参会人数</span>
        </el-col>
      </el-card>
      <el-col :span="24" v-for="(item,index) in list" :key="index" class="mb20">
        <el-card class="p20" :body-style="{ padding: '0px' }">
          <el-col :span="4" class="img">
            <div :style="{width:'18%',display:'inline'}">
              <el-checkbox v-if="checkAll" :value="checkAll" :key="index" @change="singleCheck($event,item.id)" />
              <el-checkbox v-else :value="checkedAcitivities.indexOf(item.id)!==-1?true:false" :key="index" @change="singleCheck($event,item.id)" />
            </div>
            <img :src="$axios.adornUrl('/wx/downFile/' + item.metBgr)" height="100%" width="82%">
          </el-col>
          <el-col :span="17" :offset="1" class="divider">
            <el-col :span="6" class="title col">
              <div style="padding: 14px;">
                <p class="activityName">{{item.metTopic}}</p>
              </div>
            </el-col>
            <el-col :span="5" class="title col">
              <div style="padding: 14px;">
                <p class="leftSpan">{{convert(item.metBgndate)}}</p>
                <p>{{convert(item.metEnddate)}}</p>
              </div>
            </el-col>
            <el-col :span="5" class="title col">
              <div style="padding: 14px;">
                <p class="mb20">
                  <span>{{item.province+item.city+item.county}}</span>
                </p>
              </div>
            </el-col>
            <el-col :span="5" class="title col">
              <div style="padding: 14px;">
                <el-badge v-if="item.recFlag=='1'" is-dot type="primary" class="on hackColor">启用中</el-badge>
                <el-badge v-else is-dot class="on">禁用中</el-badge>
              </div>
            </el-col>
            <el-col :span="3" class="title col">
              <div style="padding: 14px;">
                <p>{{item.metCapacity}}</p>
              </div>
            </el-col>
          </el-col>
          <el-col :span="2" class="title col">
            <el-button type="primary" @click="manageMeeting(item.id)">会议管理</el-button>
          </el-col>
          <el-col :span="3" :offset="1">
            <div style="padding: 14px;" class="iconBtn">
              <i class="iconfont iconshangpinjibenxinxi" />
              <span @click="manageMeeting(item.id)">基本信息</span>
            </div>
          </el-col>
        </el-card>
      </el-col>
    </div>
    <pagination v-show="pagination.total>0&&list" ref="pagination" :total="Number(pagination.total)" :limit.sync="pagination.pageSize" :page.sync="pagination.current" @pagination="changePagination" />
    <div class="empty">
      <img v-if="!list" src="../../../static/images/empty.png" alt="empty" height="170px">
    </div>
  </div>
</template>

<script>

import _ from 'lodash'
import { api } from '@/utils'
import { stampToDate } from '@/utils/index.js'
import pagination from '../../components/pagination'

export default {
  inject: ['reload'], // 注入依赖
  components: {
    pagination
  },
  data () {
    return {
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
    this.queryActivties()
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
    queryActivties () {
      const paramsQ = {
        uId: this.userinfo.id,
        currentPage: this.params.currentPage,
        pageSize: this.params.pageSize,
        type: this.mStatus,
        topic: this.searchCondition
      }
      for (var i = 0; i < paramsQ.pageSize; i++) {
        this.options.push(i)
      }

      api.queryActivties(paramsQ)
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
    convert (stamp) {
      return stampToDate(stamp)
    },
    changeStatus (status) {
      this.mStatus = status
      this.queryActivties()
    },
    handleCheckAllChange (val) {
      if (val) {
        this.list.map(item => (
          this.checkedAcitivities.push(item.id)
        ))
      } else {
        this.checkedAcitivities = []
      }
      this.isIndeterminate = !val
    },
    singleCheck (e, id) {
      if (this.isIndeterminate) {
        if (e) {
          this.checkedAcitivities.push(id)
        } else {
          const i = _.indexOf(this.checkedAcitivities, id)
          this.checkedAcitivities.splice(i, 1)
        }
      } else {
        this.checkAll = false
        this.isIndeterminate = true
        if (e) {
          this.checkedAcitivities.push(id)
        } else {
          const i = _.indexOf(this.checkedAcitivities, id)
          this.checkedAcitivities.splice(i, 1)
        }
      }
    },
    changePagination (e) {
      this.loading = true
      this.params.pageSize = e.limit
      this.params.currentPage = e.page
      this.queryActivties()
    },
    manageMeeting (id, flag) {
      this.$store.commit('met/setId', id)
      this.$cookie.set('metId', id)
      this.$router.push({name: 'Activity', params: {flag: flag}})
      this.reload()
    },
    searchTopic () {
      this.queryActivties()
    },
    changeMeetStatus (flag) {
      const params = {
        ids: this.checkedAcitivities,
        recFlag: flag
      }
      api.changeMeetStatus(params)
        .then(res => {
          if (res.flag) {
            this.queryActivties()
            this.$notify.success({
              title: '成功',
              message: '操作成功'
            })
          } else {
            this.$notify.error({
              title: '失败',
              message: '操作失败，请重试'
            })
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.activityName {
  font-size: 18px;
  color: $--color-primary;
  margin-bottom: 20px;
}
.p20 {
  padding: 20px;
}
.mb20 {
  margin-bottom: 20px;
}
.img {
  height: 130px;
}
.leftSpan {
  margin-bottom: 20px;
}
.leftIcon {
  margin-right: 10px;
}
.gray {
  background-color: #eee;
  color: #a2a2a2;
  border: 1px solid rgba(229, 229, 229, 1);
}
.orangeBtn {
  color: #fff;
  border: none;
  background-color: #f8b551;
}
.rightBtn {
  display: flex;
  justify-content: flex-end;
}
.addonAfter {
  background-color: #eee !important;
  color: #919191 !important;
  border-radius: 0 !important;
}
.title {
  display: flex;
  justify-content: center;
}
.headTitle {
  padding: 10px;
  color: #fff;
  background-color: $--color-primary;
}
.col {
  height: 80px;
  align-items: center;
}
.divider {
  border-bottom: 1px solid #e5e5e5;
}
.iconBtn {
  color: $--color-primary;
  cursor: pointer;
}
.empty {
  padding: 40px;
  @extend.title;
}
</style>
<style lang="scss">
.col {
  .el-badge__content.is-fixed.is-dot {
    left: -20px;
    top: 7px;
  }
  .hackColor {
    .el-badge__content {
      background-color: $--color-primary !important;
    }
  }
}
</style>
