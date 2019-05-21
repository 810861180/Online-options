<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form :inline="true" :model="searchConditions" class="conditions">
          <el-form-item label="姓名">
            <el-input placeholder="请输入姓名关键字" v-model="searchConditions.likeName" clearable />
          </el-form-item>
          <el-form-item label="公司">
            <el-input placeholder="请输入公司关键字" v-model="searchConditions.likeAddr" clearable />
          </el-form-item>
          <el-form-item label="报名状态">
            <el-select v-model="searchConditions.signStatus" placeholder="请选择" clearable @clear="clearStatus">
              <el-option key="0" label="未报名" value="0"></el-option>
              <el-option key="1" label="报名成功" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6" :offset="2" class="conditions">
        <div class="btns">
          <file-upload :custom-action="customAction" @input-filter="inputFilter" :accept="acceptType" :size="10*1024*1024" v-model="files" ref="registeration">
            <el-button icon="el-icon-upload2" type="primary">
              数据导入
            </el-button>
          </file-upload>
          <el-button icon="el-icon-download" type="primary" @click="downloadSignupData" style="marginLeft:20px" :loading="downloading">数据导出</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table ref="multipleTable" :data="tableData" border :row-class-name="tableRowClassName" tooltip-effect="dark" v-loading="loading">
      <el-table-column prop="signupName" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="signupPhone" label="电话" align="center">
      </el-table-column>
      <el-table-column prop="signupCompany" label="公司" align="center">
      </el-table-column>
      <el-table-column prop="signupPost" label="职位" align="center">
      </el-table-column>
      <el-table-column prop="addr" label="地址" align="center" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.companyAddr+scope.row.companyAddrDetails }}</template>
      </el-table-column>
      <el-table-column prop="ownArea" label="座位" align="center">
      </el-table-column>
      <el-table-column prop="signupDate" label="报名时间" align="center" sortable>
        <template slot-scope="scope">{{ scope.row.signupDate?convert(scope.row.signupDate):'' }}</template>
      </el-table-column>
      <el-table-column prop="signDesc" label="描述" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="signFrom" label="报名来源" align="center">
        <template slot-scope="scope">{{ scope.row.signFrom==1?'短信':scope.row.signFrom==2?'邮件':scope.row.signFrom==3?'微信':scope.row.signFrom==4?'导入':'其它' }}</template>
      </el-table-column>
      <el-table-column prop="signStatus" label="报名状态" align="center">
        <template slot-scope="scope">{{ scope.row.signStatus==1?'报名成功':'未报名' }}</template>
      </el-table-column>

    </el-table>
    <pagination v-if="pagination&&pagination.total>0" ref="pagination" :total="Number(pagination.total)" :limit.sync="pagination.pageSize" :page.sync="pagination.current" @pagination="changePagination" />
  </div>
</template>

<script>
import { api } from '@/utils'
import { stampToDate } from '@/utils/index.js'
import pagination from '../../components/pagination'
import FileUpload from 'vue-upload-component'

export default {
  data () {
    return {
      searchConditions: {
        likeName: '',
        likeAddr: '',
        signStatus: ''
      },
      loading: true,
      tableData: undefined,
      pagination: undefined,
      /* excel(.xls,.xlsx)*/
      acceptType: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      files: [],
      downloading: false
    }
  },
  components: {
    pagination,
    FileUpload
  },
  mounted () {
    this.querySignupData()
    this.urls = this.url
  },
  computed: {
    params () {
      let pageSize
      let currentPage
      if (this.$refs.pagination) {
        pageSize = this.$refs.pagination.limit
        currentPage = this.$refs.pagination.current
      } else {
        pageSize = 10
        currentPage = 1
      }
      return {
        currentPage,
        pageSize
      }
    }
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      if (row.signStatus === '0') {
        return 'warning-row';
      } else {
        return 'success-row';
      }
      return '';
    },
    querySignupData () {
      const params = {
        ...this.searchConditions,
        ...this.params,
        metId: 72
        // metId: this.$store.state.met.id || this.$cookie.get('metId')
      }

      api.querySignupData(params)
        .then(res => {
          if (res.flag) {
            this.tableData = res.data.list
            this.pagination = res.data.pagination
          } else {
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
      this.querySignupData()
    },
    clearStatus () {
      this.searchConditions.signStatus = ''
    },
    search () {
      this.querySignupData()
    },
    convert (stamp, isDay) {
      return stampToDate(stamp, isDay)
    },
    async  customAction (file) {
      this.uploading = true
      const data = this.dataExtra
      const params = await this.uploadHtml5({ ...file, data: data })
      api.uploadSchedule(params)
        .then(res => {
          if (res.flag) {
            this.success = true
            this.$notify.success({
              title: '成功',
              message: '上传成功'
            })
          } else {
            this.failed = true
            this.$notify.error({
              title: '失败',
              message: res.message
            })
          }
        })
        .finally(() => {
          this.uploading = false
        })
    },
    uploadHtml5 (file) {
      let form = new window.FormData()
      let value
      for (let key in file.data) {
        value = file.data[key]
        if (value && typeof value === 'object' && typeof value.toString !== 'function') {
          if (value instanceof File) {
            form.append(key, value, value.name)
          } else {
            form.append(key, JSON.stringify(value))
          }
        } else if (value !== null && value !== undefined) {
          form.append(key, value)
        }
      }
      form.append('file', file.file, file.file.filename || file.name)

      return form
    },
    inputFilter (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        this.failed = false
        this.success = false
      }
    },
    downloadSignupData () {
      this.downloading = true
      const params = {
        ...this.searchConditions,
        metId: 72
        // metId: this.$store.state.met.id || this.$cookie.get('metId')
      }

      api.downloadSignupData(params)
        .then(res => {
          let blob = new Blob([res], { type: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(blob, '报名数据.xls')
          } else {
            let URL = window.URL || window.webkitURL
            let objectUrl = URL.createObjectURL(blob)
            var a = document.createElement('a')
            if (typeof a.download === 'undefined') {
              window.location = objectUrl
            } else {
              a.href = objectUrl
              a.download = '报名数据.xls'
              document.body.appendChild(a)
              a.click()
              a.remove()
            }
          }
        })
        .finally(() => {
          this.downloading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.conditions {
  padding: 10px;
}
.btns {
  float: right;
}
</style>
<style  lang="scss">
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.btns {
  .file-uploads {
    display: inline;
  }
}
</style>
