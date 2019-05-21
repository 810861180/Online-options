<template>
  <div>
    <div class="title">
      <div class="chunk"></div>
      <p>会议日程</p>
    </div>
    <el-row class="mt20" :gutter="10" v-loading="loading">
      <el-col :span="19">
        <el-table :data="tableData" style="width: 100%;" header-cell-class-name="hedClass" @row-click="toEdit">
          <el-table-column prop="scheDate" label="时间" align="center" :render-header="renders">
            <slot name="header">
              <i class="el-icon-time"></i>
            </slot>
            <template slot-scope="scope">{{convert(scope.row.scheDate,true)+' '+scope.row.bgnTime.substring(0,5)+'-'+scope.row.endTime.substring(0,5)}}</template>
          </el-table-column>
          <el-table-column prop="contents" label="主题" align="center" :render-header="renders">
          </el-table-column>
          <el-table-column prop="peoples" label="主讲人" align="center" :render-header="renders">
          </el-table-column>
          <el-table-column prop="addrs" label="地址" align="center" :render-header="renders">
          </el-table-column>
          <el-table-column prop="opration" label="操作" align="center" :render-header="renders">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-delete" @click.stop="showDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="pagination.total>0&&tableData" ref="pagination" :total="Number(pagination.total)" :limit.sync="pagination.pageSize" :page.sync="pagination.current" @pagination="changePagination" />
      </el-col>
      <el-col :span="5">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="rightTabs">
          <el-tab-pane label="新建日程" name="first">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="ruleForm">
              <el-form-item label="所属日期" prop="scheDate">
                <el-date-picker v-model="ruleForm.scheDate" type="date" placeholder="选择日期" style="width:100%">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="时间范围" prop="time">
                <el-time-picker is-range v-model="ruleForm.time" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" value-format="HH:mm" format="HH:mm" style="width:100%">
                </el-time-picker>
              </el-form-item>
              <el-form-item label="内容" prop="contents">
                <el-input type="textarea" :rows="7" placeholder="请输入内容" v-model="ruleForm.contents"></el-input>
              </el-form-item>
              <el-form-item label="主讲人" prop="peoples">
                <el-input v-model="ruleForm.peoples" placeholder="请输入主讲人"></el-input>
              </el-form-item>
              <el-form-item label="地点" prop="addrs">
                <el-input placeholder="请输入地址" v-model="ruleForm.addrs"></el-input>
              </el-form-item>
            </el-form>
            <div v-if="selectedRow" class="submitFormbtn">
              <el-button type="primary" @click="submitForm" :loading="creating">确认修改</el-button>
              <el-button @click="cancelEdit">取消</el-button>
            </div>
            <div v-else class="submitFormbtn">
              <el-button type="primary" @click="submitForm" :loading="creating">新建</el-button>
            </div>
          </el-tab-pane>

          <el-tab-pane label="上传" name="second">
            <div class="fileArea" v-loading="loadingFile">
              <el-tag v-if="file" type="success" class="file">{{file.fileName}}---{{convert(file.createDate)}}</el-tag>
            </div>
            <upload />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <el-dialog title="确认" :visible.sync="showDeleteConfirm" ref="deleteSchedule" width="30%" center>
      <span>确认删除该日程？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancleDelete">取 消</el-button>
        <el-button type="primary" @click="handleDelete" :loading="deleteing">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { nameReg } from '../../utils/validate'
import { api } from '@/utils'
import { stampToDate } from '@/utils/index.js'
import pagination from '../../components/pagination'
import { scrollTo } from '@/utils/scrollTo'
import upload from '../../components/uploadFile/index'

export default {
  data () {
    return {
      activeName: 'first',
      ruleForm: {
        scheDate: undefined,
        time: undefined,
        contents: undefined,
        peoples: undefined,
        addrs: undefined
      },
      rules: {
        scheDate: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '请选择时间', trigger: 'blur' }
        ],
        contents: [
          { required: true, message: '请填写内容', trigger: 'blur' }
        ],
        peoples: [
          { required: true, message: '请填写主讲人', trigger: 'blur' },
          { pattern: nameReg, message: '格式不正确', trigger: 'blur' }
        ],
        addrs: [
          { required: true, message: '请填写地点', trigger: 'blur' }
        ]
      },
      tableData: undefined,
      creating: false,
      loading: true,
      pagination: {},
      selectedRow: undefined,
      showDeleteConfirm: false,
      idToDelete: undefined,
      deleteing: false,
      file: undefined,
      loadingFile: false
    }
  },
  components: {
    pagination,
    upload
  },
  computed: {
    metId: {
      get () { return this.$store.state.met.id }
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
  mounted () {
    this.querySchedules()
  },
  methods: {
    handleClick (tab, event) {
      if (tab.name === 'second') {
        this.queryFiles()
      }
    },
    querySchedules () {
      const paramsQ = {
        metId: this.metId || this.$cookie.get('metId'),
        ...this.params
      }

      api.querySchedules(paramsQ)
        .then(res => {
          if (res.flag) {
            if (res.data.list.length > 0) {
              this.tableData = res.data.list
              this.pagination = res.data.pagination
            } else {
              this.tableData = undefined
            }
          } else {
            this.tableData = undefined
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
    queryFiles () {
      this.loadingFile = true
      const paramsQ = {
        metId: this.metId || this.$cookie.get('metId'),
        type: 1
      }

      api.queryFiles(paramsQ)
        .then(res => {
          if (res.flag) {
            this.file = res.data
          } else {
            this.$notify.error({
              title: '查询文件失败',
              message: res.message
            })
          }
        })
        .finally(() => {
          this.loadingFile = false
        })
    },
    changePagination (e) {
      this.loading = true
      this.params.pageSize = e.limit
      this.params.currentPage = e.page
      this.querySchedules()
    },
    submitForm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.creating = true
          const params = {
            id: this.selectedRow ? this.selectedRow.id : undefined,
            metId: this.metId || this.$cookie.get('metId'),
            scheType: 0,
            bgnTime: this.ruleForm.time[0],
            endTime: this.ruleForm.time[1],
            ...this.ruleForm
          }
          delete params.time

          if (this.selectedRow) {
            api.editSchedule(params)
              .then(res => {
                if (res.flag) {
                  this.$notify.success({
                    title: '成功',
                    message: '操作成功'
                  })
                  this.querySchedules()
                  this.selectedRow = undefined
                } else {
                  this.$notify.error({
                    title: '失败',
                    message: '操作失败，请重试'
                  })
                }
              })
          } else {
            api.creatSchedule(params)
              .then(res => {
                if (res.flag) {
                  this.$notify.success({
                    title: '成功',
                    message: '操作成功'
                  })
                  this.querySchedules()
                } else {
                  this.$notify.error({
                    title: '失败',
                    message: '操作失败，请重试'
                  })
                }
              })
          }

          this.creating = false
          this.$refs.ruleForm.resetFields()
          scrollTo(0, 800)
        }
      })
    },
    toEdit (row, column, event) {
      this.selectedRow = row
      const initialForm = {
        scheDate: row.scheDate,
        time: [row.bgnTime, row.endTime],
        contents: row.contents,
        peoples: row.peoples,
        addrs: row.addrs
      }
      this.ruleForm = initialForm
    },
    cancelEdit () {
      this.selectedRow = undefined
      this.$refs.ruleForm.resetFields()
    },
    showDelete (id) {
      this.showDeleteConfirm = true
      this.idToDelete = id
    },
    handleDelete () {
      this.deleteing = true
      api.deleteSchedule(this.idToDelete)
        .then(res => {
          if (res.flag) {
            this.$notify.success({
              title: '成功',
              message: '操作成功'
            })
            this.querySchedules()
          } else {
            this.$notify.error({
              title: '失败',
              message: '操作失败，请重试'
            })
          }
        })
        .finally(() => {
          this.deleteing = false
          this.cancleDelete()
        })
    },
    cancleDelete () {
      this.showDeleteConfirm = false
    },
    renders (h, { column }) {
      return h(
        'span',
        [
          h('i', {
            class: this.icon(column.property),
            style: 'margin-right:5px;color:#fff;'
          }),
          h('span', column.label)
        ]
      )
    },
    icon (prop) {
      let icon
      switch (prop) {
        case 'scheDate':
          icon = 'el-icon-time'
          break
        case 'contents':
          icon = 'el-icon-document'
          break
        case 'peoples':
          icon = 'el-icon-service'
          break
        case 'addrs':
          icon = 'el-icon-location'
          break
        case 'opration':
          icon = 'el-icon-setting'
          break
      }
      return icon
    },
    convert (stamp, isDay) {
      return stampToDate(stamp, isDay)
    }
  }
}
</script>

<style lang="scss" scoped>
.mt20 {
  margin-top: 10px;
}
.rightTabs {
  background-color: #fff;
  .ruleForm {
    padding: 10px;
  }
}
.title {
  width: 100%;
  height: 50px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  .chunk {
    height: 100%;
    width: 12px;
    display: inline-block;
    background: $--color-primary;
  }
  p {
    display: inline-block;
    line-height: 50px;
    vertical-align: top;
    margin-left: 10px;
    font-size: 15px;
    font-weight: normal;
    color: $--color-primary;
  }
}
.fileArea {
  width: 94%;
  margin: 10px;
}
.file {
  clear: both;
  width: 100%;
  word-break: break-word;
  word-wrap: break-word; /* IE */
  white-space: -moz-pre-wrap; /* Mozilla */
  white-space: pre; /* CSS2 */
  white-space: pre-wrap; /* CSS 2.1 */
  white-space: pre-line; /* CSS 3 (and 2.1 as well, actually) */
}
</style>

<style lang="scss">
.rightTabs {
  .el-tabs__nav {
    width: 100%;
    display: flex;
    border: 1px solid $--color-primary !important;
    border-radius: 0 !important;
  }
  .el-tabs__item {
    flex: 1;
    margin: 0 !important;
    border-radius: 0 !important;
    height: 41px !important;
    text-align: center;
    line-height: 41px !important;
  }
  .is-top {
    color: $--color-primary;
  }
  .is-active {
    background: $--color-primary !important;
    border: none !important;
    color: #fff;
  }
  .el-input--medium .el-input__inner {
    height: 32px;
    line-height: 32px;
  }
  .submitFormbtn {
    text-align: center;
    padding: 20px;
    .el-button {
      height: 30px;
      width: 100px;
      line-height: 30px;
      padding: 0;
    }
  }
  .el-date-editor .el-range-separator {
    width: 10% !important;
  }
  .el-tag {
    height: auto;
  }
}
.hedClass {
  background: $--color-primary !important;
  color: #fff;
}
</style>
