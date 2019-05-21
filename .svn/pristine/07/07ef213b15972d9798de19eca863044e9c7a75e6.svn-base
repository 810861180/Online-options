<template>
  <div>
    <generate-form insite='true' :data='enterForm' :value='enterFormModels' ref='generateForm' v-loading="loadingForm">
    </generate-form>

    <div class="btnArea">
      <el-col :sm='24' :md='12' :lg='8' :xl='4'>
        <el-button type="primary" icon="el-icon-check" class="submitBtn" @click="submit" :loading="submitting">提交</el-button>
      </el-col>
    </div>
  </div>
</template>

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
      enterForm: {},
      enterFormModels: {}
    }
  },
  created () {
    const params = {
      metId: 2,
      formType: '1'
    }

    api.queryForm(params).then(res => {
      const { data } = res
      if (data.flag && data.data.jsonHtml) {
        const json = JSON.parse(data.data.jsonHtml)
        this.enterForm = json
        this.$refs.generateForm.generateModle(json.list)
      }
    })
      .finally(() => {
        this.loadingForm = false
      })
  },
  methods: {
    submit () { }
  }
}
</script>
