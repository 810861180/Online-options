<template>
  <div class="site-wrapper site-page--login">
    <div class="login-main">
      <el-row :gutter="20" class="wrapper">
        <el-col :span="24">
          <el-col :span="12" class="leftBrand">
            <img src="../../../static/images/brand.png" alt="brand" height="520px" width="440px" class="brandImg">
          </el-col>
          <!-- 登录 -->
          <el-col :span="12" v-if="isLogin" class="rightForm">
            <div v-if="!wxLogin">
              <p class="head">账号密码登录</p>
              <i class="iconfont iconerweima qrcode" @click="changeLoginType(2)" />
              <div class="triangle_border_left" />
              <div class="formArea">
                <el-form v-if="!wxLogin" :model="loginForm" :rules="loginRule" ref="loginForm" @keyup.enter.native="loginFormSubmit()" status-icon>
                  <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" maxlength="16" placeholder="帐号" prefix-icon="el-icon-user" />
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input v-model="loginForm.password" maxlength="16" type="password" placeholder="密码" prefix-icon="el-icon-unlock" />
                  </el-form-item>
                  <el-form-item prop="captcha">
                    <el-row :gutter="20">
                      <el-col :span="14">
                        <el-input v-model="loginForm.captcha" maxlength="16" placeholder="验证码" prefix-icon="el-icon-key">
                        </el-input>
                      </el-col>
                      <el-col :span="10" class="login-captcha">
                        <img :src="captchaPath" @click="getCaptcha()" alt="">
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item>
                    <span class="forget">忘记密码？</span>
                    <span class="register" @click="isLogin=false">注册</span>
                  </el-form-item>
                  <el-form-item>
                    <el-button class="loginBtn" type="primary" @click="loginFormSubmit()">登录</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>

            <div class="wxLogin" v-show="wxLogin">
              <p class="head">扫码登录</p>
              <i class="el-icon-lock qrcode" @click="changeLoginType(1)" />
              <div class="triangle_border_left" />
              <div id="loginWxCode" ref="loginWxCode" @click="getWxCode()"></div>
              <p class="wxTips">请使用微信扫描二维码登录</p>
            </div>
          </el-col>
          <!-- 注册 -->
          <el-col :span="12" v-else class="rightForm">
            <region :username='loginForm.userName' v-on:back="back($event)" />
          </el-col>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import Region from '@/components/region'
import { getUUID, api } from '@/utils'
export default {
  data () {
    // 账号校验规则
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('帐号不能为空'))
      } else if (!(/^[a-z0-9]{5,16}$/i).test(value)) {
        callback(new Error('账号只能是5-16位字母或数字'))
      } else {
        // 用户是否存在，不存在则注册
        api.userIsExist({ username: value }).then((data) => {
          let { result } = data
          if (result && result.code === 200) {
            if (this.isLogin) {
              if (result.name) {
                callback()
              } else {
                this.$message.error('当前用户不存在，请先注册')
                this.isLogin = false
                this.$set(this.regionForm, 'userName', value)
                this.$refs.regionForm.clearValidate()
              }
            } else {
              if (result.name) {
                callback(new Error('账号已存在'))
              } else {
                callback()
              }
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
      }
    }
    // 密码校验规则
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else if (!(/^[a-z0-9]{5,16}$/i).test(value)) {
        callback(new Error('账号只能是5-16位字母或数字'))
      } else {
        callback()
      }
    }
    // 验证码校验规则
    let validateCaptcha = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('验证码不能为空'))
      } else if (!(/^[\s\S]*.*[^\s][\s\S]*$/).test(value)) {
        callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    return {
      loginType: 1,
      loginForm: {
        userName: '',
        password: '',
        uuid: getUUID(),
        captcha: ''
      },
      loginRule: {
        userName: [
          { min: 5, max: 16, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { min: 6, max: 16, trigger: 'blur', validator: validatePassword }
        ],
        captcha: [
          { trigger: 'blur', validator: validateCaptcha }
        ]
      },
      captchaPath: '', // 验证码路径
      userInfo: {}, // 用户信息
      isLogin: true, // 登录or注册
      wxLogin: false, // 微信登录
      websocket: '',
      wx_uri: ''
    }
  },
  components: {
    Region
  },
  methods: {
    // 切换登录方式
    changeLoginType (type) {
      this.loginType = type
      if (type === 1) {
        this.wxLogin = false
      } else {
        this.wxLogin = true
      }
    },
    // 登录提交表单
    loginFormSubmit () {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          let params = {
            username: this.loginForm.userName,
            password: this.loginForm.password,
            kaptcha: this.loginForm.captcha,
            uuid: this.loginForm.uuid
          }
          api.login(params).then((data) => {
            if (data && data.code === 200) {
              let userInfo = data.data
              loading.close()
              this.$cookie.set('token', userInfo.access_token)
              this.$store.commit('user/setUserInfo', userInfo)

              this.$notify.success({
                title: 'Info',
                message: '登录成功',
                showClose: false
              })
              this.$router.replace({ name: 'home' })
              this.userInfo = userInfo
              this.$cookie.set('userinfo', JSON.stringify(this.userInfo))
            } else {
              setTimeout(() => {
                this.getCaptcha()
                this.$notify.error({
                  title: 'Info',
                  message: data.message,
                  showClose: false
                })
                loading.close()
              }, 500)
            }
          })
        }
      })
    },
    // 获取验证码
    getCaptcha () {
      this.captchaPath = this.$axios.adornUrl(api.captcha() + `?uuid=${this.loginForm.uuid}&t=` + Math.random())
    },
    // 获取登录二维码
    getWxCode () {
      // this.$refs['loginWxCode'].childNodes.remove()
      document.getElementById('loginWxCode').innerHTML = ''
      api.getWxCode().then((data) => {
        if (data.code === 200) {
          let { uri, uuid } = data.data
          let wxUrl = data.data.wx_uri
          let loginWxCode = new QRCode(this.$refs['loginWxCode'], {
            text: uri + '/wx/signin?uuid=' + uuid + '&type=PC',
            width: 190,
            height: 190,
            colorDark: '#000',
            colorLight: '#fff',
            correctLevel: QRCode.CorrectLevel.H
          })
          this.initWebSocket(uuid, wxUrl)
          return loginWxCode
        } else {
          this.$message.error(data.message)
        }
      })
    },
    // websocket通信
    initWebSocket (uuid, wxUrl) {
      this.websocket = new WebSocket(wxUrl)
      this.websocket.onopen = () => {
        console.log('连接成功')
        this.websocket.send(JSON.stringify({ 'uuid': uuid, 'wxScanLogin': 'PC*APP', 'type': 'SCANLOGIN' }))
      }
      this.websocket.onmessage = (event) => {
        let { feedback, confirm, data, msgContent } = JSON.parse(event.data)
        if (feedback === 0) { // 扫码成功
          this.$notify.warning({
            title: 'Info',
            message: `${msgContent}`,
            showClose: false
          })
        } else {
          if (confirm === 'CANCEL') { // 取消登录
            this.$notify.warning({
              title: 'Info',
              message: `${msgContent}`,
              showClose: false
            })
          } else if (confirm === 'DETERMINE') { // 登录成功
            this.$notify.success({
              title: 'Info',
              message: `${msgContent}`,
              showClose: false
            })
            this.$cookie.set('token', data.access_token)
            this.$router.replace({ name: 'home' })
            this.userInfo = data
            this.$cookie.set('userinfo', JSON.stringify(this.userInfo))
          }
        }
      }
    },
    back (isLogin) {
      this.isLogin = isLogin
    }
  },
  created () {
    this.getCaptcha()
    if (this.isLogin) {
      // 获取微信二维码
      this.$nextTick(() => {
        this.getWxCode()
      })
    }
  },
  destroyed () {
    if (this.websocket) {
      this.websocket.close()
    }
  }
}
</script>

<style lang='scss' scoped>
.site-page--login {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url("../../../static/images/loginBg.png");
  background-size: cover;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .login-main {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .wrapper {
      width: 1010px;
      .leftBrand {
        background-color: $--color-primary;
        border-radius: 10px 0 0 10px;
        text-align: center;
        .brandImg {
          padding: 80px 40px;
        }
      }
      .rightForm {
        background-color: #fff;
        border-radius: 0 10px 10px 0;
        height: 520px;
        .head {
          text-align: center;
          margin-top: 60px;
          margin-bottom: 55px;
        }
        .formArea {
          text-align: center;
          padding: 0 60px;
          .forget {
            float: left;
            color: #a9a9a9;
            font-size: 12px;
            cursor: pointer;
          }
          .register {
            float: right;
            color: #a9a9a9;
            font-size: 12px;
            cursor: pointer;
          }
          .loginBtn {
            width: 100%;
          }
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
        .wxLogin {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          .wxTips {
            padding: 10px;
          }
        }
      }
    }
  }
}
</style>
