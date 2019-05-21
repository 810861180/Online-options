<template>
  <div>
    <BaseDialog :width="'35%'" :title="'票价配置'" ref="dialog" @confirm="confirmAdd" @cancle="cancleAdd">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="票价名称" prop="ticketName">
          <el-input v-model="ruleForm.ticketName"></el-input>
        </el-form-item>
        <el-form-item label="票价" prop="ticketPrice">
          <el-input v-model="ruleForm.ticketPrice">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="票价数量" prop="ticketNum">
          <el-input v-model.number="ruleForm.ticketNum"></el-input>
        </el-form-item>
        <el-form-item label="票价类型" prop="ticketType">
          <el-input v-model="ruleForm.ticketType"></el-input>
        </el-form-item>
        <el-form-item label="票价描述" prop="ticketDesc">
          <el-input type="textarea" v-model="ruleForm.ticketDesc"></el-input>
        </el-form-item>
        <el-form-item label="所属区域" prop="seatArea">
          <el-input type="textarea" v-model="ruleForm.seatArea"></el-input>
        </el-form-item>
      </el-form>
    </BaseDialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        ticketName: '',
        ticketPrice: '',
        ticketNum: '',
        ticketType: '',
        ticketDesc: '',
        seatArea: ''
      },
      rules: {
        ticketName: [
          { required: true, message: '请输入票价名称', trigger: 'blur' }
        ],
        ticketPrice: [
          { required: true, message: '请输入票价', trigger: 'blur' },
          { pattern: /^\d+(\.\d{0,2})?$/, message: '最多只能填写小数点后两位' }
        ],
        ticketNum: [
          { required: true, message: '请输入总票数量', trigger: 'blur' }
        ]
      },
      ifAffirm: true // 判断是走确认还是编辑
    }
  },
  mounted () { },
  methods: {
    open () {
      this.$refs.dialog.open()
    },
    close () {
      this.$refs.dialog.close()
    },
    // 确认
    confirmAdd () {
      if (this.ifAffirm) {
        let data = { ...this.ruleForm, metId: this.$store.state.met.id || this.$cookie.get('metId') }
        data.ticketPrice = Number(data.ticketPrice)
        data = [data]
        this.priceHttp(this.$priceQuery, 'post', data).then(() => {
          this.$emit('addSucess')
          Object.keys(this.ruleForm).map((key) => { this.ruleForm[key] = '' })
        })
      } else {
        let data2 = { ...this.ruleForm }
        data2.ticketPrice = Number(data2.ticketPrice)
        this.priceHttp(this.$priceQuery, 'put', data2).then(() => {
          this.$emit('addSucess')
          Object.keys(this.ruleForm).map((key) => { this.ruleForm[key] = '' })
        })
      }
    },
    // 取消
    cancleAdd () { },

    // 请求方法
    async priceHttp (url, method, data) {
      await this.$axios({
        url: url,
        method: method,
        data: data
      }).then(data => {
        this.$notify({ title: '提示', message: data.message })
      })
      return Promise.resolve()
    }
  }
}
</script>

<style scoped>
</style>
