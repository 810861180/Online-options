<template>
  <div class="pay" v-loading="loading">
    <el-card class="merchant" :body-style="{ padding: '0px' }">
      <el-form :model="merchantInfo" :rules="rulesOne" status-icon ref="merchantInfo" label-width="100px" class="payForm">
        <el-form-item label="商户名称" prop="mchName">
          <el-input placeholder="请输入商户名称" v-model="merchantInfo.mchName" clearable />
        </el-form-item>
        <el-form-item label="商户类型" prop="mchType">
          <el-select v-model="merchantInfo.mchType" placeholder="请选择商户类型" clearable>
            <el-option key="1" label="私有商户号" value="1"></el-option>
            <el-option key="2" label="企业商户号" value="2"></el-option>
            <el-option key="3" label="其它" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人" prop="principal">
          <el-input placeholder="请输入联系人" v-model="merchantInfo.principal" clearable />
        </el-form-item>
        <el-form-item label="联系电话" prop="principalPhone">
          <el-input placeholder="请输入联系电话" v-model="merchantInfo.principalPhone" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-check" @click="submit" :loading="submiting">确认</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card v-if="merchantInfo && merchantInfo.id" class="channels">
      <el-button type="primary" icon="el-icon-plus" @click="prepare">新增支付渠道</el-button>
      <div class="empty" v-if="!channels.length">
        <img src="../../../static/images/empty.png" alt="empty" height="170px">
      </div>

      <div v-else class="channelTable">
        <el-table :data="channels" style="width: 100%">
          <el-table-column prop="channelName" align="center" label="渠道名称" />
          <el-table-column prop="channelType" align="center" label="渠道类型">
            <template slot-scope="scope">{{ scope.row.channelType=='1'?'微信支付':scope.row.channelType=='2'?'支付宝支付':scope.row.channelType=='3'?'银联支付':scope.row.channelType=='4'?'第三方支付':'其它' }}</template>
          </el-table-column>
          <el-table-column prop="createDate" align="center" label="创建时间">
            <template slot-scope="scope">{{ scope.row.createDate?convert(scope.row.createDate):'' }}</template>
          </el-table-column>
          <el-table-column prop="invoice" align="center" label="是否开通电子发票">
            <template slot-scope="scope">
              <span v-if="scope.row.invoice=='1'">已开通</span>
              <span v-else class="redText">未开通</span>
            </template>
          </el-table-column>
          <el-table-column prop="params" align="center" label="支付参数" />
          <el-table-column prop="remarks" align="center" label="备注" />
          <el-table-column prop="operations" align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="warning" plain icon="el-icon-edit" @click="prepare(scope.row)">修改</el-button>
              <el-button type="danger" plain icon="el-icon-delete" @click="prepareDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-dialog :title="edit?'修改支付渠道':'新增支付渠道'" :visible.sync="visible" class="channelInfo" @close="reset">
      <el-form :model="channel" :rules="rulesTwo" status-icon ref="channelInfo" label-width="150px">
        <el-form-item label="渠道名称" prop="channelName">
          <el-input placeholder="请输入渠道名称" v-model="channel.channelName" clearable />
        </el-form-item>
        <el-form-item label="渠道类型" prop="channelType">
          <el-select v-model="channel.channelType" placeholder="请选择渠道类型" clearable>
            <el-option key="1" label="微信支付" value="1" />
            <el-option key="2" label="支付宝支付" value="2" />
            <el-option key="3" label="银联支付" value="3" />
            <el-option key="4" label="第三方支付" value="4" />
            <el-option key="5" label="其它" value="5" />
          </el-select>
        </el-form-item>
        <el-form-item label="配置参数" prop="params">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入配置参数，如微信支付：{appid:'',secret:'',mchId:''}" v-model="channel.params" clearable />
        </el-form-item>
        <el-form-item label="是否开通电子发票" prop="invoice">
          <el-radio-group v-model="channel.invoice">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="数据公钥">
          <el-input  v-model="channel.publicKey" clearable />
        </el-form-item>
        <el-form-item label="数据私钥">
          <el-input  v-model="channel.privateKey" clearable />
        </el-form-item> -->
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入备注" v-model="channel.remarks" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="visible = false" class="footerBtn">取 消</el-button>
        <el-button type="primary" @click="addChannel" :loading="adding" class="footerBtn">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="删除提示" :visible.sync="deleteVisible" class="channelInfo" width="30%">
      <span>确定删除该渠道信息？</span>
      <span slot="footer">
        <el-button @click="deleteVisible = false" class="footerBtn">取 消</el-button>
        <el-button type="primary" @click="deleteChannel" :loading="deleteing" class="footerBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { api } from '@/utils'
import { stampToDate } from '@/utils/index.js'
import { nameReg, phoneReg } from '@/utils/validate'

export default {
  data () {
    return {
      loading: true,
      submiting: false,
      adding: false,
      visible: false,
      deleteVisible: false,
      deleteing: false,
      edit: false,
      deleteId: undefined,
      merchantInfo: {
        mchName: '',
        mchType: '',
        principal: '',
        principalPhone: '',
        createBy: ''
      },
      rulesOne: {
        mchName: [
          { required: true, message: '请输入商户名称', trigger: 'blur' }
        ],
        mchType: [
          { required: true, message: '请选择商户类型', trigger: 'blur' }
        ],
        principal: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
          { pattern: nameReg, message: '格式不正确', trigger: 'blur' }
        ],
        principalPhone: [
          { required: true, message: '请输入联系人电话', trigger: 'blur' },
          { pattern: phoneReg, message: '格式不正确', trigger: 'blur' }
        ]
      },
      channels: [],
      channel: {
        channelName: '',
        mchNo: '',
        params: '',
        channelType: '',
        invoice: '0',
        remarks: '',
        createBy: ''
      },
      rulesTwo: {
        channelName: [
          { required: true, message: '请输入渠道名称', trigger: 'blur' }
        ],
        params: [
          { required: true, message: '请输入配置参数', trigger: 'blur' }
        ],
        channelType: [
          { required: true, message: '请选择渠道类型', trigger: 'blur' }
        ],
        invoice: [
          { required: true, message: '请选择是否开通电子发票', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.queryMerchant()
    const id = this.userId
    this.merchantInfo.createBy = id
    this.channel.createBy = id
  },
  computed: {
    userId () {
      const info = JSON.parse(this.$cookie.get('userinfo'))
      return info.id
    }
  },
  methods: {
    queryMerchant () {
      const paramsQ = {
        uId: this.userId
      }

      api.queryMerchant(paramsQ)
        .then(res => {
          if (res.flag) {
            if (res.data && res.data.mchInfo.id) {
              this.merchantInfo = res.data.mchInfo
              this.channels = res.data.channel
            }
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
    submit () {
      this.$refs.merchantInfo.validate((valid) => {
        if (valid) {
          this.submiting = true
          if (this.merchantInfo.id) {
            api.editMerchant(this.merchantInfo)
              .then(res => {
                if (res.flag) {
                  this.$notify.success({
                    title: '修改成功',
                    message: '商户信息修改成功'
                  })
                } else {
                  this.$notify.error({
                    title: '修改失败',
                    message: res.message
                  })
                }
              })
              .then(() => {
                this.queryMerchant()
              })
              .finally(() => {
                this.submiting = false
              })
          } else {
            api.addMerchant(this.merchantInfo)
              .then(res => {
                if (res.flag) {
                  this.$notify.success({
                    title: '添加成功',
                    message: '商户信息添加成功'
                  })
                } else {
                  this.$notify.error({
                    title: '添加失败',
                    message: res.message
                  })
                }
              })
              .then(() => {
                this.queryMerchant()
              })
              .finally(() => {
                this.submiting = false
              })
          }
        }
      });
    },
    prepare (row) {
      if (row && row.id) {
        this.$set(this, 'channel', row)
        this.edit = true
        // this.channel = row
      }
      this.visible = true
    },
    addChannel () {
      this.$refs.channelInfo.validate((valid) => {
        if (valid) {
          this.adding = true
          this.channel.mchNo = this.merchantInfo.id
          if (this.channel.id) {
            api.editChannel(this.channel)
              .then(res => {
                if (res.flag) {
                  this.$notify.success({
                    title: '添加成功',
                    message: '支付渠道修改成功'
                  })
                } else {
                  this.$notify.error({
                    title: '修改失败',
                    message: res.message
                  })
                }
                this.visible = false
              })
              .then(() => {
                this.queryMerchant()
              })
              .finally(() => {
                this.adding = false
              })
          } else {
            api.addChannel(this.channel)
              .then(res => {
                if (res.flag) {
                  this.$notify.success({
                    title: '添加成功',
                    message: '支付渠道添加成功'
                  })
                } else {
                  this.$notify.error({
                    title: '添加失败',
                    message: res.message
                  })
                }
                this.visible = false
              })
              .then(() => {
                this.queryMerchant()
              })
              .finally(() => {
                this.adding = false
              })
          }
        }
      });
    },
    convert (stamp, isDay) {
      return stampToDate(stamp, isDay)
    },
    prepareDelete (id) {
      if (id) {
        this.deleteId = id
        this.deleteVisible = true
      }
    },
    deleteChannel () {
      this.deleteing = true
      api.deleteChannel(this.deleteId)
        .then(res => {
          if (res.flag) {
            this.$notify.success({
              title: '删除成功',
              message: '支付渠道删除成功'
            })
          } else {
            this.$notify.error({
              title: '删除失败',
              message: res.message
            })
          }
          this.deleteVisible = false
        })
        .then(() => {
          this.queryMerchant()
        })
        .finally(() => {
          this.deleteing = false
        })
    },
    reset () {
      if (this.$refs.channelInfo) {
        this.$refs.channelInfo.resetFields()
        this.channel = {
          channelName: '',
          mchNo: '',
          params: '',
          channelType: '',
          invoice: '0',
          remarks: '',
          createBy: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pay {
  .merchant {
    margin-bottom: 10px;
    .payForm {
      padding: 65px;
      background-color: #fff;
    }
  }
  .channels {
    .empty {
      display: flex;
      justify-content: center;
      padding: 40px;
    }
    .channelTable {
      margin-top: 10px;
      .redText {
        color: #ff0404;
      }
    }
  }
  .channelInfo {
    .footerBtn {
      width: 20%;
    }
  }
}
</style>
<style lang="scss">
.payForm {
  .el-select {
    width: 100%;
  }
}
.channelInfo {
  .el-select {
    width: 100%;
  }
  .el-dialog__footer {
    text-align: center;
  }
}
.channelTable {
  .el-table th {
    color: #fff;
    background-color: $--color-primary !important;
  }
}
</style>
