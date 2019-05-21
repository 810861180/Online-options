<template>
  <div>
    <el-card class="box-card">
      <div class="leftDiv">
        <div class="divRow">
          <p class="title">开启报名</p>
          <span v-show="switchData === true" style="color:#13ce66;">打开</span>
          <span v-show="switchData === false" style="color:#DCDCDC;">关闭</span>
          <el-switch
            v-model="switchData"
            active-color="#13ce66"
            inactive-color="#DCDCDC">
          </el-switch>
        </div>
        <div class="divRow divRows">
          <p class="title">人数限制</p>
          <span v-show="switchData2 === true" style="color:#13ce66;">打开</span>
          <span v-show="switchData2 === false" style="color:#DCDCDC;">关闭</span>
          <el-switch
            v-model="switchData2"
            active-color="#13ce66"
            inactive-color="#DCDCDC">
          </el-switch>
          <el-input v-if="switchData2" v-model="inputPeople" placeholder="请输入内容" size="mini" class="inputPeople">
            <template slot="append">（人）</template>
          </el-input>
        </div>
        <div class="divRow divRows">
          <p class="title">背景</p>
          <upload ref="inviteUpload" class="inviteUpload" @uploadInvite="uploadInvite"></upload>
          <div class="imgs" v-for="(item, index) in img" :key="index">
            <img :src="item" border="0">
          </div>
          <div class="imgs" v-if="imgFlag">
            <img :src="$axios.adornUrl('wx/downFile/' + imgShow)" border="0">
          </div>
          <p class="hint">建议上传图片尺寸1080*1920，大小2M以内的图片</p>
        </div>
        <div class="divRow">
          <el-button type="primary" class="submit" @click="submit">立即提交</el-button>
        </div>
      </div>
      <div class="rightDiv">
        <div id="qrcode" ref="qrcode"></div>
        <p>邀请函二维码</p>
        <p>{{ qrCodeUrl }}<span>（邀请函链接）</span></p>
      </div>
    </el-card>
  </div>
</template>

<script>
import upload from '@/components/imgUpload/upload'
import QRCode from 'qrcodejs2'
const devEnv = require('../../../config/dev.env.js')
export default {
  inject: ['reload'], // 注入依赖
  components: {
    upload
  },
  data() {
    return {
      switchData: false, //报名switch样式及控制
      switchData2: false, //人数switch样式及控制
      inputPeople: '', //人数数量
      img: [], //上传本地回显 
      imgShow: undefined, // 后台请求回显
      imgFlag: true, // 本地上传时只展示本地回显
      id: '', //ID为空时走新增
    }
  },
  computed: {
    qrCodeUrl() {
      return `${devEnv.BASE_URL}wxModule/view?mv=wx/html/invitation4&${this.$store.state.met.id || this.$cookie.get('metId')}$`
    }
  },
  mounted() {
    this.qrcode()
    this.$refs.inviteUpload.classif('honored')
    this.$refs.inviteUpload.flagInvite = true
    this.getInfo()
  },
  methods: {
    getInfo() {
      let params = this.$store.state.met.id || this.$cookie.get('metId')
      this.$queryInvite(params).then(data => {
        if (data.data.openApply === '1') this.switchData = true
        if (data.data.signupOpen === '1') {
          this.switchData2 = true
          this.inputPeople = data.data.signupLimit
        }
        this.imgShow = data.data.invitePage
        this.id = data.data.id
      })
    },
    // 提交
    submit() {
      let params = {
        metId: this.$store.state.met.id || this.$cookie.get('metId'),
        openApply: this.switchData === true ? '1' : '0',
        signupOpen: this.switchData2 === true ? '1' : '0',
        signupLimit: this.inputPeople,
        img: this.img
      }
      if (this.id === '') {
        // 新增
        this.$addInvite(params).then(data => {
          console.log(data)
        })
      } else {
        // 修改
        params.invitePage = this.imgShow
        this.$editInvite(params).then(data => {
          console.log(data)
          if (data.flag) {
            // this.reload()
          }
        })
      }
    },
    // 生成二维码
    qrcode () {
      let qrcode = new QRCode('qrcode',{
          width: 180, // 设置宽度，单位像素
          height: 180, // 设置高度，单位像素
          text: this.qrCodeUrl   // 设置二维码内容或跳转地址
      })
    },
    // 上传图片组件
    uploadInvite(val) {
      console.log('101', val)
      this.img = val
      this.imgFlag = false
    }
  }
}
</script>

<style lang='scss' scoped>
.leftDiv{
  width: 40%;
  display: inline-block;
}
.divRow{
  margin-top: 20px;
  .title{
    width: 100px;
    display: inline-block;
    text-align: right;
    margin-right: 20px;
  }
  .inputPeople{
    width: 50%;
    margin-left: 20px;
  }
  .hint{
    margin-left: 122px;
    margin-top: 10px;
    font-size: 12px;
    color: #888;
  }
  .submit{
    margin-left: 122px;
  }
}
.divRows{
  margin-top: 30px;
}

.inviteUpload{
  vertical-align: top;
}

.imgs {
  width: 100px;
  height: 100px;
  border: 1px solid rgba(210, 210, 210, 1);
  display: inline-block;
  vertical-align: top;
  margin-left: 20px;
  img {
    width: 100%;
    height: 100%;
  }
}

.rightDiv{
  width: 55%;
  height: 300px;
  float: right;
  margin-top: 30px;
  img{
    width: 180px;
    height: 180px;
  }
  p{
    margin-top: 20px;
    span{
      color: #888;
    }
  }
}
</style>
