<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="提醒">
        <div class="switchs">
          状态&nbsp;&nbsp;
          <span v-show="switchData1" style="color:#13ce66;">打开</span>
          <span v-show="!switchData1" style="color:#DCDCDC;">关闭</span>
          <el-switch
            @change='switchChange'
            v-model="switchData1"
            active-color="#13ce66"
            inactive-color="#DCDCDC">
          </el-switch>
        </div>
        <module1 v-if="switchData1" ref="module1"></module1>
      </el-tab-pane>
      <el-tab-pane label="通知">
        <div class="switchs">
          状态&nbsp;&nbsp;
          <span v-show="switchData2" style="color:#13ce66;">打开</span>
          <span v-show="!switchData2"  style="color:#DCDCDC;">关闭</span>
          <el-switch
            @change="switchChange2"
            v-model="switchData2"
            active-color="#13ce66"
            inactive-color="#DCDCDC">
          </el-switch>
        </div>
        <module2 v-if="switchData2" ref="module2"></module2>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import module1 from './templateInfo/module1'
import module2 from './templateInfo/module2'
export default {
  components: {
    module1,
    module2
  },
  data() {
    return {
      switchData1: false,
      switchData2: false,
      params1: `${JSON.parse(this.$cookie.get('userinfo')).id}/1`,
      params2: `${JSON.parse(this.$cookie.get('userinfo')).id}/2`
    }
  },
  mounted() {
    this.getInfo(this.params1, '1', this.$refs.module1, this.switchData1)
    this.getInfo(this.params2, '2', this.$refs.module2, this.switchData2)
  },
  methods: {
    switchChange(val) {
      if (!val) {
        console.log('57 已关闭')
        this.state('1', '0')
      } else {
        // this.getInfo(this.params1, '1', this.$refs.module1, this.switchData1)
      }
    },
    switchChange2(val) {
      if (!val) {
        console.log('77 已关闭')
        this.state('2', '0')
      } else {
        // this.getInfo(this.params2, '2', this.$refs.module2, this.switchData2)
      }
    },
    // 状态保存
    state(confType, recFlag) {
      let params = {
          uid: JSON.parse(this.$cookie.get('userinfo')).id,
          confType: confType,
          recFlag: recFlag
        }
      this.$stateTimeTemplate(params).then(data => {
        console.log(data)
      })
    },
    // 将值传给子组件
    getInfo(params, template, modules, switchData) {
      this.queryData(params, template)
    },
    async queryData(params, count) {
      let test = {}    
      await this.$queryTemplate(params).then(data => {
        if (data.flag) {
          if (data.data.rec_flag === '1') this['switchData' + count] = true
        }
      })
      return Promise.resolve(test)
    }
  }
}
</script>

<style lang="scss" scoped>
  .switchs{
    margin: 10px 0 20px 60px;
  }
</style>
