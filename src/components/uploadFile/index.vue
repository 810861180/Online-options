<template>
  <div class="upload-files">
    <ul v-if="files.length">
      <div v-for="file in files" :key="file.id" class="ready">
        <span class="text">{{file.name}}</span>
        <span class="text">—</span>
        <span class="text">{{(file.size/1024/1024).toFixed(2)}}M</span>
        <el-button v-if="!uploading&&!failed&&!success" type="warning" icon="el-icon-delete" class="remove-btn" @click.prevent="$refs.upload.remove(file)">
          移除
        </el-button>
        <span v-if="failed" class="statusF">上传失败</span>
        <span v-else-if="success" class="statusS">上传成功</span>
      </div>
    </ul>
    <el-col v-else :span="24" :class="$refs.upload && $refs.upload.dropActive?'headerBox':''">
      <file-upload :custom-action="customAction" @input-filter="inputFilter" :accept="acceptType" :size="10*1024*1024" :drop="true" :drop-directory="false" v-model="files" ref="upload" class="absoluteCenter opration">
        <i class="el-icon-upload big-icon" />
        <p v-if="$refs.upload && $refs.upload.dropActive">拖拽到此处上传</p>
        <p v-else class="primaryColor">点击或拖拽可上传文件</p>
      </file-upload>
      <p class="tips">注意事项：上传文档格式仅支持word、excel、pdf、ppt，且大小在10M以内。</p>
    </el-col>

    <p style="visibility:hidden">
      {{drop}}
    </p>

    <div style="text-align:center">
      <el-row v-if="files.length">
        <el-col :lg="24" :xl="12" style="padding:20px">
          <file-upload :custom-action="customAction" @input-filter="inputFilter" :accept="acceptType" :size="10*1024*1024" v-model="files" ref="upload">
            <el-button icon="el-icon-plus" type="primary">
              选择文件
            </el-button>
          </file-upload>
        </el-col>
        <el-col :lg="24" :xl="12" style="padding:20px">
          <el-button type="success" icon="el-icon-caret-right" v-if="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true">
            开始上传
          </el-button>
          <!-- <el-button type="danger" icon="el-icon-close" v-else @click="$refs.upload.active = false">
            停止上传
          </el-button> -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import FileUpload from 'vue-upload-component'
import { api } from '@/utils'
export default {
  components: {
    FileUpload
  },
  data () {
    return {
      files: [],
      /* pdf,word(.doc,docx),excel(.xls,.xlsx),.ppt */
      acceptType: 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint',
      drop: this.$refs.uploads ? this.$refs.uploads.dropActive : undefined,
      failed: false,
      success: false,
      uploading: false
    }
  },
  computed: {
    getUserId () {
      const info = JSON.parse(this.$cookie.get('userinfo'))
      return info.id
    },
    getMetId () {
      return this.$store.state.met.id || this.$cookie.get('metId')
    },
    dataExtra () {
      let type
      if (this.files.length) {
        let name = this.files[0].name.split('.')[1]
        if (name === 'pdf') {
          type = 'pdf'
        } else if (name === 'doc' || name === 'docx') {
          type = 'word'
        } else if (name === 'xls' || name === 'xlsx') {
          type = 'excel'
        } else {
          type = 'ppt'
        }
      }
      let data = { fileType: type, metId: this.getMetId, originteBy: 2, useType: 1, createBy: this.getUserId }
      return data
    }
  },
  mounted () {
    this.drop = this.$refs.upload ? this.$refs.upload.dropActive : undefined
    this.token = this.getToken
  },
  methods: {
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
        // 更新文件
        this.failed = false
        this.success = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.absoluteCenter {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.opration {
  margin: 10px;
  background-color: #eee;
  height: 200px;
  .big-icon {
    font-size: 100px;
    color: $--color-primary;
  }
}
.drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: 0.6;
  text-align: center;
  background: #000;
}
.drop-active h3 {
  margin: -7px 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  font-size: 18px;
  color: #fff;
  padding: 0;
}
.ready {
  line-height: 35px;
  background-color: $--color-primary;
  border-radius: 5px;
  margin: 0 20px;
  padding: 10px;
  .text {
    color: #fff;
  }
}
.statusS {
  float: right;
  color: #67c23a;
  font-weight: bold;
}
.statusF {
  float: right;
  color: #f56c6c;
  font-weight: bold;
}
@keyframes fade {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes fade {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
.headerBox {
  color: #f56c6c;
  font-size: 15px;
  animation: fade 1000ms infinite;
  -webkit-animation: fade 1000ms infinite;
}
.primaryColor {
  color: $--color-primary;
}
.remove-btn {
  width: 30%;
  padding: 10px 0;
  float: right;
}
.tips {
  margin: 10px;
  color: #f56b6b;
}
</style>

<style lang="scss">
.upload-files {
  .file-uploads.file-uploads-html4 input,
  .file-uploads.file-uploads-html5 label {
    cursor: pointer;
  }
}
</style>

