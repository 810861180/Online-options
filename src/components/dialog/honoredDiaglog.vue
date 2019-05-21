<template>
  <div>
    <BaseDialog :width="'45%'" :title="'新增嘉宾信息'" ref="dialog" @confirm="confirmAdd" @cancle="cancleAdd">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="guestName" style="width:92%">
          <el-input v-model="ruleForm.guestName"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="guestPost" style="width:92%">
          <el-input v-model="ruleForm.guestPost"></el-input>
        </el-form-item>
        <el-form-item label="照片" prop="img" style="width:92%">
          <upload @uploads='uploads' @imgUrl="imgUrl" ref="honoredUpload"></upload>
          <div class="imgs" v-for="(item, index) in ruleForm.img" :key="index">
            <img :src="item" border="0">
          </div>
          <div class="imgs" v-if="imgflag">
            <img :src="$axios.adornUrl('/wx/downFile/' + ruleForm.guestPic)">
          </div>
        </el-form-item>
        <el-form-item label="简述" prop="guestDesc" style="width:92%">
          <el-input v-model="ruleForm.guestDesc" type="textarea" :autosize="{ minRows: 4, maxRows: 4}"></el-input>
        </el-form-item>
      </el-form>
    </BaseDialog>
  </div>
</template>

<script>
import upload from '../imgUpload/upload'
export default {
  components: {
    upload
  },
  data () {
    return {
      ruleForm: {
        guestName: '',
        guestPost: '',
        guestDesc: '',
        img: [],
        guestPic: ''
      },
      rules: {
        guestName: [
          { required: true, message: '请输入嘉宾姓名', trigger: 'blur' }
        ],
        guestPost: [
          { required: true, message: '请输入职位', trigger: 'blur' }
        ],
        guestDesc: [
          { required: true, message: '请输入嘉宾简述', trigger: 'blur' }
        ],
        img: [
          { required: true, message: '请输入嘉宾简述', trigger: 'blur' }
        ]
      },
      flag: true,
      imgflag: true, //新增入口打开不显示
    }
  },
  methods: {
    open () {
      this.$refs.dialog.open().then(() => {
        this.$refs.honoredUpload.classif('honored')
      })
    },
    // close () {
    //   this.$refs.dialog.close()
    // },
    // 确认
    confirmAdd () {
      if (this.flag) {
        // 新增
        let params = {
          ...this.ruleForm,
          metId: this.$store.state.met.id || this.$cookie.get('metId')
        }
        // params.guestPic = params.img
        // delete params.img
        console.log('新增')
        this.$addHonored(params).then(data => {
          if (data.flag) {
            this.$notify({
              message: data.message,
              type: 'success'
            })
            this.$emit('addSucess')
            // this.$refs.honoredUpload.clearFile_up() //调用清空文件列表
          }
        })
      } else {
        // 编辑
        delete this.ruleForm.metId
        console.log('编辑', this.ruleForm)
        this.$editHonored(this.ruleForm).then(data => {
          if (data.flag) {
            this.$emit('addSucess')
          }
        })
      }
    },
    // 取消
    cancleAdd () {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
    },
    // 子组件调用1
    uploads (val) {
      // this.ruleForm.img = this.$axios.adornUrl('/wx/downFile/' + val.uuid)
      this.ruleForm.guestPic = val.uid
      this.ruleForm.uuid = val.uuid
    },
    // 子组件调用2
    imgUrl (url) {
      console.log('116', url)
      this.ruleForm.img = url
      this.imgflag = false
    }
  }
}
</script>

<style lang='scss' scoped>
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
</style>
