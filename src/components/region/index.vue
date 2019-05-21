<template>
  <div class="region-wrap">
    <!-- 注册 -->
    <div class="region-main" v-if="!bindWx">
      <p v-if="type!=='updateBaseInfo'" class="head">注册</p>
      <i class="el-icon-lock qrcode" @click="backToLogin" />
      <div class="triangle_border_left" />
      <!-- :rules="regionRule" -->
      <!-- @keyup.enter.native="regionFormSubmit()" -->
      <div class="formArea">
        <el-form :model="regionForm" ref="regionForm" status-icon :rules="regionRule" @keyup.enter.native="regionFormSubmit()">
          <el-form-item prop="userName" :error="usernameError">
            <el-input v-model="regionForm.userName" maxlength="16" placeholder="请输入帐号" prefix-icon="el-icon-user" />
          </el-form-item>
          <el-form-item prop="password" v-if="type!=='updateBaseInfo'">
            <el-input v-model="regionForm.password" maxlength="16" type="password" placeholder="请输入密码" prefix-icon="el-icon-unlock" />
          </el-form-item>
          <el-form-item prop="surePassword" v-if="type!=='updateBaseInfo'">
            <el-input v-model="regionForm.surePassword" maxlength="16" type="password" placeholder="请再次输入密码" prefix-icon="el-icon-lock" />
          </el-form-item>
          <el-form-item prop="email" :error="emailError">
            <el-input v-model="regionForm.email" type="text" placeholder="请输入邮箱" :disabled="type==='updateBaseInfo'" prefix-icon="el-icon-message" />
          </el-form-item>
          <el-form-item prop="phone" :error="phoneError">
            <el-input v-model="regionForm.phone" maxlength="11" type="text" placeholder="请输入手机号码" :disabled="type==='updateBaseInfo'" prefix-icon="el-icon-mobile" />
          </el-form-item>
          <!-- <el-form-item prop="imageUrl" label="用户头像">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="regionForm.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item> -->
          <el-form-item>
            <el-button type="primary" style="width:100%" @click="regionFormSubmit()">立即注册</el-button>
            <!-- <el-button @click="resetForm()">重置</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 绑定微信号 -->
    <div class="bindWx" v-else>
      <div class="wxCode" ref="wxCode"></div>
    </div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
import { api } from '@/utils'
export default {
  data () {
    return {
      regionForm: {
        userName: '',
        password: '',
        surePassword: '',
        email: '',
        phone: ''
        // imageUrl: ''
      }, // 注册表单信息
      regionRule: {
        userName: [
          { required: true, trigger: 'blur', message: '账号不能为空' },
          { pattern: /^[a-z0-9]{5,16}$/i, message: '账号只能是5-16位字母或数字' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' }, {
            pattern: /^[a-z0-9]{5,16}$/i, message: '密码只能是5-16位字母或数字'
          }
        ],
        surePassword: [
          {
            trigger: 'blur',
            required: true,
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('确认密码不能为空'))
              } else if (value !== this.regionForm.password) {
                callback(new Error('两次密码不一致'))
              } else {
                callback()
              }
            }
          }
        ],
        email: [
          { trigger: 'blur', type: 'email', required: true, message: '邮箱不能为空' },
          { pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, message: '邮箱格式不正确' }
        ],
        phone: [
          { trigger: 'blur', required: true, message: '手机号码不能为空' },
          { pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '手机格式不正确' }
        ]
      }, // 注册表单校验
      usernameError: '',
      emailError: '',
      phoneError: '',
      bindWx: false,
      wxCode: ''
    }
  },
  props: {
    username: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 注册提交表单
    regionFormSubmit () {
      this.$refs['regionForm'].validate((valid, object) => {
        if (valid) {
          let params = {
            username: this.regionForm.userName,
            password: this.regionForm.password,
            email: this.regionForm.email,
            mobile: this.regionForm.phone
          }
          this.isExist(params)
        }
      })
    },
    // 重置注册表单
    resetForm () {
      this.$refs['regionForm'].resetFields()
    },
    // 判断是否已存在
    isExist (params) {
      this.emailError = ''
      this.usernameError = ''
      this.phoneError = ''
      api.userIsExist(params).then((data) => {
        let { result } = data
        if (result.code === 200) {
          let { email, mobile, name } = result
          this.emailError = email ? '邮箱已存在' : ''
          this.usernameError = name ? '账号已存在' : ''
          this.phoneError = mobile ? '手机号已存在' : ''
          if (!email && !mobile && !name) {
            this.regionUser(params)
          }
        } else {
          // this.$message.error(data.message)
          this.$notify.error({
            title: 'Info',
            message: data.message,
            showClose: false
          })
        }
      })
      // return api.userIsExist(params)
    },
    // 注册接口
    regionUser (params) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      api.regionUser(params).then((data) => {
        if (data.code === 200) {
          loading.close()
          this.$confirm('注册成功！是否绑定微信号', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消绑定',
            type: 'success'
          }).then(() => {
            this.bindWx = true
            this.$nextTick(() => {
              this.getWxCode(data.data)
            })
          }).catch(() => {
            // this.$message({
            //   type: 'info',
            //   message: '取消绑定讲无法使用微信扫码登录'
            // })
            this.$notify.info({
              title: 'Info',
              message: '取消绑定讲无法使用微信扫码登录',
              showClose: false
            })
            this.bindWx = false
            this.$refs['regionForm'].clearValidate()
          })
        } else {
          // this.$message.error(data.message)
          this.$notify.error({
            title: 'Info',
            message: data.message,
            showClose: false
          })
        }
      })
    },
    // 获取绑定二维码
    getWxCode (userId) {
      let wxCode = new QRCode(this.$refs['wxCode'], {
        text: this.$axios.adornUrl(api.bindWx(userId)),
        width: 190,
        height: 190,
        colorDark: '#000',
        colorLight: '#fff',
        correctLevel: QRCode.CorrectLevel.H
      })
      return wxCode
    },
    backToLogin () {
      this.$emit('back', true)
    }
  },
  created () {
    this.regionForm.userName = this.username !== '' ? this.username : ''
    if (this.type === 'updateBaseInfo') {
      let userinfo = JSON.parse(this.$cookie.get('userinfo'))
      api.getUserInfoByUserId(userinfo.id).then((data) => {
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.head {
  text-align: center;
  margin-top: 60px;
  margin-bottom: 55px;
}
.formArea {
  text-align: center;
  padding: 0 60px;
}
.qrcode {
  font-size: 85px;
  color: #a6a6a6 !important;
  position: absolute;
  top: 0;
  right: 10px;
  cursor: pointer;
}
.triangle_border_left {
  border-width: 49px 49px 49px 0;
  border-style: solid;
  border-color: #fff;
  transform: rotate(-45deg);
  position: absolute;
  top: 20px;
  right: 48px;
}
</style>
