<template>
  <div class="formContainer">
    <generate-form insite='true' :data='enterForm' :value='enterFormModels' ref='generateForm' v-loading="loadingForm" remote="false">
    </generate-form>
    <div class="btnArea">
      <el-col :sm='24' :md='12' :lg='8' :xl='4'>
        <el-button type="primary" icon="el-icon-check" @click="submit" class="submitBtn" :loading="submitting">提交</el-button>
      </el-col>
    </div>
  </div>
</template>

// /#/miniapp/sign-up?metId=72&memberId=11
<script>
import GenerateForm from '../../components/custom-form/GenerateForm'
import { api } from '@/utils'

export default {
  components: {
    GenerateForm
  },
  data () {
    return {
      submitting: false,
      loadingForm: true,
      formContent: null,
      enterForm: {},
      enterFormModels: {},
      metId: undefined,
      memberId: undefined
    }
  },
  created () {
    let name, value, str = location.href, num = str.indexOf('?') // 取得整个地址栏
    str = str.substr(num + 1) // 取得所有参数 stringvar.substr(start [, length ]
    let arr = str.split('&') // 各个参数放到数组里
    for (let i = 0; i < arr.length; i++) {
      num = arr[i].indexOf('=')
      if (num > 0) {
        name = arr[i].substring(0, num)
        value = arr[i].substr(num + 1)
        this[name] = value
        if (name === 'metId') {
          this.$data.metId = value
        }
        if (name === 'memberId') {
          this.$data.memberId = value
        }
      }
    }

    const params = {
      metId: this.$data.metId,
      formType: '1',
      memberId: this.$data.memberId
    }

    api.queryForm(params).then(res => {
      const { data } = res
      console.log(res)
      if (res.flag && data.jsonHtml) {
        this.formContent = data
        const json = JSON.parse(data.jsonHtml)
        this.enterForm = json
        if (res.enterFormModels) {
          this.enterFormModels = res.enterFormModels
        }
        this.$refs.generateForm.generateModle(json.list)
      }
    })
      .finally(() => {
        this.loadingForm = false
      })
  },
  mounted () {
    console.log(222)
  },
  methods: {
    submit () {
      this.$refs.generateForm
        .getData()
        .then(data => {
          console.log(data)
          this.submitting = true
          // const memberId = Vue.cookie.get('memberId')
          const params = { form_Id: this.formContent.id, memberId: this.$data.memberId, jsonData: data, metId: this.$data.metId }
          api.submitForm(params).then(res => {
            if (res.flag) {
              this.$notify({
                title: '成功',
                message: res.message,
                type: 'success'
              })
              var paramss = {
                metId:this.$data.metId,
                memberId:this.$data.memberId
              }
              location.href = `/miniapp/pay/tickets/order/${params.metId}/${params.memberId}`

              // api.formToSeat(paramss)
            } else {
              this.$notify.error({
                title: '错误',
                message: res.message
              })
            }
          })
        })
        .finally(() => {
          this.submitting = false
        })
    }
  }
}
</script>
