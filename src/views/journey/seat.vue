<template>
  <div class="page">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>座位</span>
      </div>
      <el-select v-model="seatValue" filterable placeholder="请选择" @change="seatChange($event)">
        <el-option v-for="item in options" :key="item.id" :label="item.confName" :value="item.id"></el-option>
      </el-select>
      <el-button style="float: right;" type="text" @click="handleSeat">新增</el-button>
      <maps :seats="seat" :row="row"></maps>
      <div class="footerBtn">
        <el-button type="primary" :loading="btnLoading" @click="confirmAdd">确认</el-button>
        <el-button @click="$router.push({name:'journey-index'})">取消</el-button>
      </div>
    </el-card>

    <SeatDialog @addSucess="addSucess" ref="seatdialog"></SeatDialog>
  </div>
</template>

<script>
import maps from '@/views/journey/map'
import _ from 'lodash'
export default {
  components: {
    maps
  },
  data () {
    return {
      options: [],
      seatValue: '',
      row: 0,
      seat: [],
      btnLoading: false
    }
  },
  mounted () {

    console.log(this.$seatQuery)
    this.selectChange()
  },
  methods: {
    handleSeat () {
      this.$refs.seatdialog.open()
    },
    // 下拉框选择事件
    seatChange (event) {
      //   this.ifAffirm = false;
      let url = `${this.$seatQuery}/${event}`
      this.seatHttp(url, 'get').then(res => {
        this.row = res.seatConf.rows
        this.seat = _.chunk(res.seatOnline, res.seatConf.rows)
      })
    },

    // 下拉框查询座位方法
    selectChange () {
      let url = `${this.$seatQuery}/user/${this.$store.state.met.id || this.$cookie.get('metId')}`
      this.seatHttp(url, 'get').then(res => {
        console.log('61', res)
        if (res.length != 0) {
          this.options = res
          this.seatValue = res[res.length - 1].id
          this.seatChange(res[res.length - 1].id)
        }

      })
    },
    // 确认
    confirmAdd () {
      let data2 = {
        seatConf: {
          ...this.mapform,
          modifiedBy: this.$store.state.met.id || this.$cookie.get('metId')
        },
        seatDetail: _.flattenDeep(this.seat)
      }
      this.seatHttp(this.$seatQuery, 'put', data2).then(() => {
        this.btnLoading = true
        setTimeout(() => {
          this.btnLoading = false
        }, 2000)
      })
    },
    // dialog
    addSucess () {
      this.selectChange()
    },
    // 座位请求方法
    async seatHttp (url, method, data) {
      let test
      await this.$axios({
        url: url,
        method: method,
        data: data
      }).then(data => {
        if (data.flag) {
          this.$message(data.message)
          test = data.data
        }
      })
      return Promise.resolve(test)
    }
  }
}
</script>

<style lang='scss' scoped>
.footerBtn {
  text-align: center;
  margin-top: 20px;
}
</style>
