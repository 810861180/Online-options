<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>会场列表</span>
      </div>
      <el-button style=" padding: 3px 0;margin-bottom: 10px;" type="text" @click="createRoom">创建会场</el-button>
      <el-table v-if="tableData.length>0" :data="tableData" v-loading="loading" element-loading-text="拼命加载中" border style="width: 100%">
        <el-table-column prop="roomName" label="会场名称" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="roomSize" label="会场大小（㎡）" width="200"></el-table-column>
        <el-table-column prop="roomAddress" label="详细地址" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="capacitance" label="可容纳人数" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="roomDesc" label="描述" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <!-- <el-button size="mini" type="primary" @click="handleSet(scope.$index, scope.row)">设置</el-button> -->
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <no-content v-else></no-content>
      <pagination v-show="total>0" ref="pagination" :total="total" :limit.sync="pageInfo.pageSize" :page.sync="pageInfo.current" @pagination="pagination"></pagination>
    </el-card>
    <!-- 对话框 -->
    <el-dialog title="创建会场" :visible.sync="centerDialogVisible" width="35%" center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="会议室名称" prop="roomName">
          <el-input v-model="ruleForm.roomName"></el-input>
        </el-form-item>
        <el-form-item label="会议室面积" prop="roomSize">
          <el-input v-model="ruleForm.roomSize">
            <template slot="append">㎡</template>
          </el-input>
        </el-form-item>
        <el-form-item label="会议室详细地址" prop="roomAddress">
          <el-input type="textarea" :rows="2" v-model="ruleForm.roomAddress"></el-input>
        </el-form-item>
        <el-form-item label="可容纳人数" prop="capacitance">
          <el-input v-model="ruleForm.capacitance"></el-input>
        </el-form-item>
        <el-form-item label="活动描述" prop="roomDesc">
          <el-input type="textarea" :rows="4" v-model="ruleForm.roomDesc"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import pagination from '@/components/pagination'
import noContent from '@/components/no-content'
export default {
  data () {
    return {
      flag: false,
      tableData: [],
      centerDialogVisible: false,
      ruleForm: {
        roomName: '',
        roomSize: '',
        roomAddress: '',
        capacitance: '',
        roomDesc: '',
        createBy: ''
      },
      ruleForm2: {},
      //   ruleFormEdit:{},
      rules: {
        roomName: [
          { required: true, message: '请填写会议室名称', trigger: 'change' }
        ],
        roomSize: [
          { pattern: /^[0-9]+([.]{1}[0-9]{1,2})?$/, message: '保留两位小数' }
        ],
        roomAddress: [
          { max: 512, message: '最多填写512个字符', trigger: 'change' }
        ],
        capacitance: [
          { required: true, message: '必填项', trigger: 'change' }
        ],
        roomDesc: [
          { max: 512, message: '最多填写512个字符', trigger: 'change' }
        ]
      },
      loading: true,
      total: 0, // 总页数
      pageInfo: {} // 分页
    }
  },
  components: {
    pagination,
    noContent
  },
  mounted () {
    console.log(this.$store.state.met.id || this.$cookie.get('metId'))
    this.roomQuery()
  },
  computed: {
    userinfo () {
      return JSON.parse(this.$cookie.get('userinfo'))
    },
    params () {
      let size
      if (this.$refs.pagination) {
        size = this.$refs.pagination.limit
      }
      return {
        page: 0,
        size
      }
    }
  },
  methods: {
    // 表格操作
    // handleSet (index, row) {
    //   this.$router.push({
    //     name: 'seat-list-config',
    //     params: { data: row }
    //   })
    // },
    // 编辑
    handleEdit (index, row) {
      this.centerDialogVisible = true
      this.ruleForm = row
      this.flag = true
    },
    // 预览
    handlePreview (index, row) {

    },
    // 创建会场
    createRoom () {
      this.flag = false
      this.centerDialogVisible = true
    },

    // 提交
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.flag) {
            this.roomAdd(this.ruleForm, 'put')
          } else {
            this.ruleForm.createBy = this.$store.state.met.id || this.$cookie.get('metId')
            // this.ruleForm.createBy = JSON.parse(this.$cookie.get('userinfo')).id
            this.roomAdd(this.ruleForm, 'post')
          }
        } else {
          return false
        }
      })
    },
    // 取消
    resetForm (formName) {
      this.roomQuery()
      this.centerDialogVisible = false
    },
    // 提交（新增、修改）
    roomAdd (data, method) {
      this.$axios({
        url: this.$roomQuery,
        method: method,
        data: data
      }).then(data => {
        if (data.flag) {
          this.roomQuery()
          this.centerDialogVisible = false
          this.$message({ message: data.message })
        }
      })
    },
    // 分页查询会场
    roomQuery () {
      let params = {
        userId: this.$store.state.met.id || this.$cookie.get('metId'),
        currentPage: this.params.page,
        pageSize: this.params.size
      }
      this.$axios.get(this.$roomQueryByPage, { params: params }).then(({ data }) => {
        if (data) {
          this.loading = false
          let { list, pagination } = data
          this.tableData = list
          this.pageInfo = {
            pageSize: parseInt(pagination.pageSize),
            current: parseInt(pagination.current)
          }
          this.total = pagination.total
        }
      })
    },
    // 分页
    pagination (e) {
      this.loading = true
      this.params.page = e.page
      this.roomQuery()
    }
  }
}
</script>
