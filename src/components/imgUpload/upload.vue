<template>
  <div style="display: inline-block;">
    <el-upload class="upload-demo" :action="uploadUrl" :headers='headers' :data="params" ref="upload" :on-success="handleSuccess" :before-upload="beforeUpload" :on-change="changeUpload" :auto-upload="false" :show-file-list="false" accept="image/*" :file-list="fileList">
      <el-button size="small" type="primary" v-if="classEl.p3" class="p3">点击上传</el-button>
      <div class="honored" v-if="classEl.honored">
        <i class="el-icon-upload"></i>
        <p class="uploadTextBtn">点击上传</p>
      </div>
    </el-upload>
  </div>
</template>

<script>
// :http-request="httpRequest"
export default {
  data () {
    return {
      headers: {
        Token: this.$cookie.get('token'),
      },
      params: {
        bgr: 'bg',
        metId: '',
      },
      fileList: [],
      imgUrl: '', //回显路径
      classEl: {
        p3: false, // 控制样式（会议背景）
        honored: false //
      },
      val: {},
      formFlag:false,
      flagInvite: false
    }
  },
  computed: {
    uploadUrl () {
      return this.$axios.adornUrl('fileUpload/uplodImgs')
    }
  },
  methods: {
    handleSuccess (response, file, fileList) {
      this.imgUrl = this.$axios.adornUrl('/wx/downFile/' + response.uuid)
      this.val.uuid = response.uuid
      
    },
    changeUpload (file, fileList) {
      if (file.size < 1024 * 1024) {
        let imgUrls = []
        let event = event || window.event
        console.log('67', event.target)
        let imgfile = event.target.files[event.target.files.length - 1]
        let reader = new FileReader()
        //转base64
        console.log('54', reader)
        reader.onload = (e) => {
          imgUrls.push(e.target.result)
        }
        reader.readAsDataURL(imgfile)
        // console.log(1, imgUrls)
        this.$emit('imgUrl', imgUrls)
        this.$emit('uploads', file)
        
        //表单
        if (this.formFlag) {
          let val = {
            img: imgUrls,
            metBgr: file.uid
          }
          this.$emit('uploadsForm', val)
        }
        // 邀请函
        if (this.flagInvite) {
          this.$emit('uploadInvite', imgUrls)
        }
      }

    }, 
    // 上传之前的钩子
    beforeUpload (file) {
      console.log(file)
      this.params.metId = this.$store.state.met.id
      this.params.uuid = file.uid
      if (file.size > 1024 * 1024) {
        alert('文件过大')
        return false
      }
    },
    classif (str) {
      Object.keys(this.classEl).forEach((key, index) => {
        if (str == key) {
          this.classEl[key] = true
        }
      })
    },
    //已上传文件列表清空
    clearFile_up () {
      this.$refs.upload.clearFiles()
    }


  }
}
</script>

<style scoped lang="scss">
.p3 {
  width: 200px;
  height: 34px;
  border-radius: 5px;
  font-size: 12px;
  margin-top: 30px;
}
.honored {
  width: 100px;
  height: 100px;
  border: 1px dashed rgba(210, 210, 210, 1);
  i {
    font-size: 30px;
    margin-top: 20px;
  }
  .uploadTextBtn{
    height: 20px !important;
    line-height: 20px !important;
  }
}
</style>
