<template>
  <div>
    <BaseDialog :width="'35%'" :title="'座位配置'" ref="dialog" @confirm='confirmAdd' @cancle='cancleAdd'>
      <el-form ref="scheduleForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="日程名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="地点">
          <el-select v-model="form.site" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="会场">
          <el-select v-model="form.room" filterable placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.roomName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="座位">
          <el-select v-model="form.seat" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
    </BaseDialog>
  </div>
</template>

<script>
import { api } from '@/utils'
export default {
  data () {
    return {
      form: {
        name: '',
        date1: '',
        date2: '',
        site: '',
        room: '',
        seat: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      options: []
    }
  },
  mounted () {
    let url = `${api.roomQuery}?userId=${JSON.parse(this.$cookie.get('userinfo')).id}`
    this.tableInfo(url, 'get')
  },
  methods: {
    open () {
      this.$refs.dialog.open()
    },
    close () {
      this.$refs.dialog.close()
    },
    // 确认
    confirmAdd () {
      console.log(this.form)
      this.$emit('addSucess')
    },
    // 取消
    cancleAdd () {
      console.log('取消了')
      this.$refs['scheduleForm'].resetFields()
    },
    // 会场查询
    tableInfo (url, method, data) {
      this.$axios({
        url: url,
        method: method,
        data: data
      }).then(({ data }) => {
        if (data.flag) {
          this.options = data.data
        }
      })
    }
  }
}
</script>

<style scoped>
.el-col-2 {
  width: 5%;
  text-align: center;
}
</style>
