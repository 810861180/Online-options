<template>
  <div>
    <BaseDialog :width="'80%'" :title="'座位配置'" ref="dialog" @confirm="confirmAdd" @cancle="cancleAdd">
      <el-select v-model="value" filterable placeholder="请选择" @change="seatChange($event)">
        <el-option v-for="item in options" :key="item.value" :label="item.confName" :value="item.id"></el-option>
      </el-select>
      <div class="add_btn" style="display: inline-block margin-left: 20px">
        <el-button type="primary" @click="handifAffirm">新增座位</el-button>
      </div>

      <el-form ref="mapform" :model="mapform" label-width="20px" :rules="rules" class="map_form" v-if="formState">
        <el-form-item label="名称" class="map_form_item map_form_item_seat" prop="confName">
          <el-input v-model="mapform.confName" placeholder="座位名称"></el-input>
        </el-form-item>
        <el-form-item label="行" class="map_form_item map_form_item_seat1" prop="rows">
          <el-input v-model.number="mapform.rows" placeholder="每一行多少个"></el-input>
        </el-form-item>
        <el-form-item label="列" class="map_form_item map_form_item_seat1" prop="cols">
          <el-input v-model.number="mapform.cols" placeholder="每一列多少个"></el-input>
        </el-form-item>
        <el-form-item class="map_form_item">
          <el-button type="primary" @click="submitForm('mapform')">生成座位</el-button>
          <el-button @click="resetForm('mapform')">取消</el-button>
        </el-form-item>
      </el-form>

      <div style="margin-top: 20px">
        <maps :seats="seat" :row="row"></maps>
      </div>
    </BaseDialog>
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
      seat: [],
      row: 0,
      options: [],
      value: '',
      ifAffirm: false, // 确认时判断是新增还是修改
      mapform: {
        confName: '',
        rows: '',
        cols: ''
      },
      rules: {
        confName: [
          { required: true, message: '请输入座位名称', trigger: 'blur' }
        ],
        rows: [
          { required: true, message: '请输入行', trigger: 'blur' }
          // { min: 1, max: 10, message: '不能超过两位数', trigger: 'blur' }
        ],
        cols: [
          { required: true, message: '请输入列', trigger: 'blur' }
          // { min: 1, max: 10, message: '不能超过两位数', trigger: 'blur' }
        ]
      },
      formState: false
    }
  },
  methods: {
    open () {
      this.$refs.dialog.open()
      this.selectChange()
    },
    close () {
      this.$refs.dialog.close()
    },
    // 确认
    confirmAdd () {
      this.$refs.dialog.ifclose = true
      // this.$emit('addSucess')
      if (this.seat) {
        if (this.ifAffirm) {
          let data = {
            seatConf: {
              ...this.mapform,
              createBy: JSON.parse(this.$cookie.get('userinfo')).id
            },
            seatDetail: _.flattenDeep(this.seat)
          }
          this.seatHttp(this.$seatQuery, 'post', data)
        } else {
          let data2 = {
            seatConf: {
              ...this.mapform,
              modifiedBy: JSON.parse(this.$cookie.get('userinfo')).id
            },
            seatDetail: _.flattenDeep(this.seat)
          }
          this.seatHttp(this.$seatQuery, 'put', data2)
        }
      } else {
        this.$message('座位不能为空')
      }
    },
    // 取消
    cancleAdd () { },

    // 表单方法
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.row = this.mapform.rows
          this.onSubmit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.seat = []
      this.row = 0
      this.formState = !this.formState
    },

    // 生成座位方法
    onSubmit () {
      this.seat = [] // 生成前先清空
      for (let i = 0; i < this.mapform.cols; i++) {
        this.seat.push([])
      }
      this.seat.map((item, index) => {
        for (let i = 0; i < this.mapform.rows; i++) {
          item.push({
            seatRow: Number(i + 1),
            seatCol: Number(index + 1),
            seatStatus: 0
          })
        }
      })
    },

    // 座位请求方法
    async seatHttp (url, method, data) {
      let test
      await this.$axios({
        url: url,
        method: method,
        data: data
      }).then(({ data }) => {
        if (data.flag) {
          this.$message(data.message)
          test = data.data
        }
      })
      return Promise.resolve(test)
    },

    // 下拉框查询座位方法
    selectChange () {
      let url = `${this.$seatQuery}/user/${JSON.parse(this.$cookie.get('userinfo')).id}`
      this.seatHttp(url, 'get').then(res => {
        this.options = res
      })
    },
    // 下拉框选择事件
    seatChange (event) {
      this.ifAffirm = false
      let url = `${this.$seatQuery}/${event}`
      this.seatHttp(url, 'get').then(res => {
        this.formState = true
        this.mapform = res.seatConf
        this.row = this.mapform.rows
        this.seat = _.chunk(res.seatOnline, res.seatConf.rows)
      })
    },

    // 新增座位  按钮
    handifAffirm () {
      Object.keys(this.mapform).map(key => (this.mapform[key] = ''))
      this.seat = []
      this.row = 0
      this.ifAffirm = true // 为true时 确认请求走修改
      this.formState = true
    }
  }
}
</script>

<style lang="scss" scoped>
.map_form {
  display: inline-block;
  margin-left: 50px;

  .map_form_item {
    margin: 0 0 0 20px;
    display: inline-block;
  }
  .map_form_item_seat {
    width: 30%;
    .el-form-item__label {
      width: 50px !important;
    }
    .el-input {
      width: 88%;
    }
  }
  .map_form_item_seat1 {
    width: 18%;
    .el-input {
      width: 88%;
    }
    .el-form-item__label {
      width: 38px !important;
    }
  }
}
</style>
