<template>
  <div>
    <el-card class="box-card" v-loading="loadingForm">
      <div slot="header" class="clearfix">
        <span>问卷调查设计</span>
      </div>
      <fm-making-form ref="makingForm" upload preview generate-code generate-json>
        <template slot="action"></template>
      </fm-making-form>
    </el-card>
    <div class="btnArea">
      <el-col :sm='24' :md='12' :lg='8' :xl='4'>
        <el-button type="primary" icon="el-icon-check" class="submitBtn" @click="getJSON" :loading="submitting">保存表单</el-button>
      </el-col>
    </div>
  </div>
</template>

<script>

import { api } from '@/utils'
import { commonComponents } from '@/components/custom-form/componentsConfig.js'

export default {
  data () {
    return {
      editMode: false,
      originData: {},
      submitting: false,
      loadingForm: true
    }
  },
  mounted () {
    const params = {
      metId: 2,
      formType: '3'
    }

    api.queryForm(params).then(res => {
      const { data } = res
      if (data.flag && data.data.jsonHtml) {
        const json = JSON.parse(data.data.jsonHtml)
        this.$refs['makingForm'].setJSON(json)
        json.list.map((item, index) => {
          if (
            [
              'signupName',
              'gender',
              'signupEmail',
              'signupPhone',
              'signupCompany',
              'signupPost',
              'companyAddr',
              'homeAddress',
              'employeeNum'
            ].indexOf(item.type) !== -1
          ) {
            const match = commonComponents.filter((common, indexs) => {
              return common.type === item.type
            })
            match[0].everUsed = true
          }
        })

        this.originData = data.data
        this.editMode = true
      }
    })
      .finally(() => {
        this.loadingForm = false
      })
  },
  beforeDestroy () {
    commonComponents.map((item, index) => {
      item.everUsed = false
    })
  },
  methods: {
    getJSON () {
      this.submitting = true

      let userInfo = JSON.parse(this.$cookie.get('userinfo'))
      const data = this.$refs['makingForm'].getJSON()
      const json = JSON.stringify(data)

      if (this.editMode) {
        const params = {
          id: this.originData.id,
          metId: 2,
          jsonHtml: json,
          formType: '3',
          createBy: userInfo.id
        }

        api.editForm(params).finally(() => {
          this.submitting = false
        })
      } else {
        const params = {
          jsonHtml: json,
          metId: 2,
          formType: '3',
          createBy: userInfo.id
        }

        api.addForm(params).finally(() => {
          this.submitting = false
        })
      }
    }
  }
}
</script>
