<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="模板id" prop="id">
        <el-input v-model="ruleForm.id" disabled></el-input>
        <p class="hint">此处模板id为微信公众号中选择的模板消息id</p>
        <el-button type="primary" disabled>获取模板</el-button>
      </el-form-item>
      <el-form-item label="模板消息">
        <el-card class="box-cards" shadow="hover">
          <div slot="header" class="clearfix">
            <span>微信公众号模板消息字段</span>
          </div>
          <div class="text item">
            <p>{{ title }}</p>
            <div class="content">
              <p class="p1"></p>
              <p class="p2"><span>{{</span>first.DATA<span>}}</span></p>
              <el-input class="contentInput" placeholder="请输入内容" v-model="contentInput" :disabled="true"></el-input>
            </div>
            <div class="content" v-for="(item, index) in templateData" :key="index">
              <p class="p1">{{ item.value }}</p>
              <p class="p2"><span>{{</span>{{ item.key }}<span>}}</span></p>
              <el-select class="contentInput" v-model="selectValue[index]" placeholder="请选择" @change="selectChange($event, index)">
                <el-option 
                  v-for="items in options" 
                  :key="items.varValue" 
                  :label="items.varName" 
                  :value="items.varValue">
                </el-option>
              </el-select>
            </div>
            <div class="content">
              <p class="p1"></p>
              <p class="p2"><span>{{</span>remark.DATA<span>}}</span></p>
              <el-input class="contentInput" placeholder="请输入内容" v-model="contentInput2" :disabled="true"></el-input>
            </div>
          </div>
        </el-card>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">立即提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 表单数据
      ruleForm: {
        id: 'PmRu3PCyBpGMXXz-QxcCJsB3BQK4JYx4qsA5IxxrNrg',
      },
      // 消息提醒的INPUT
      title: '',
      contentInput: '您已报名成功',
      contentInput2: '期待您的莅临!',
      // 下拉框
      options: [], // 下拉框展示值
      selectValue: [], // 下拉框选中值
      templateData: [], 
      // 表单验证
      rules: {
        id: [
          { required: true, message: '请输入模板ID', trigger: 'blur' }
        ],
      }
    };
  },
  mounted () {
    this.getInfo().then(() => {
      this.queryData()
    })
    this.$getSelete().then(data => {
      if (data.flag) {
        this.options = data.data
      }
    }) 
  },
  methods: {
    // 新增提交模板
    submitForm () {
      let tempContent = this.tempContent()
      console.log(tempContent)
      let params = {
        uId: JSON.parse(this.$cookie.get('userinfo')).id,
        templateId: this.ruleForm.id,
        tempName: this.title,
        tempType: '1',
        recFlag: '1',
        tempContent: `first_您已报名成功#${tempContent}remark_期待您的莅临!#`
      }
      this.$addTemplate(params).then(data => {
        if (data.flag) {
          this.$notify({ title: '提示', message: data.message })
        }
      })
    },
    // 初始化数据
    async getInfo () {
      let params = `${this.ruleForm.id}/${JSON.parse(this.$cookie.get('userinfo')).id}`
      await this.$getTemplate(params).then(data => {
        if (data.flag) {
          this.title = data.data.title
          data.data.content.splice(0, 1)
          data.data.content.splice(data.data.content.length - 1, 1)
          data.data.content.forEach(item => {
            this.templateData.push(this.keyAndValue(item))
          })
        }
      })
      // return Promise.resolve()
    },
    //  下拉框选择触发
    selectChange(event, index) {
      console.log('120', event, index)
      console.log('120', this.selectValue)
    },
    // 模板内容拼接
    tempContent() {
      let test = ''
      this.templateData.forEach((item, index) => {
        test += item.key + '_' + this.selectValue[index] + '#'
      })
      return test
    },
    //  模板消息查询
    queryData(){
      let params = `${JSON.parse(this.$cookie.get('userinfo')).id}/1`
      this.$queryTemplate(params).then(data => {
        if (data.flag) {
          this.ruleForm.id = data.data.templete_id
          this.title = data.data.temp_name
          this.selectValue = this.disposeArr(data.maps)
        }
      })
    },
    // 获取对象的键 和 值
    keyAndValue (obj) {
      let test = {}
      for (let key in obj) {
        test['key'] = key
        test['value'] = obj[key]
      }
      return test
    },
    // 处理数据
    disposeArr(obj) {
      delete obj.first
      delete obj.remark
      let leng = 1
      let test = []
      for(let key in obj) {
        test[leng - 1] = obj['keyword' + leng]
        leng++
      }
      return test
    }
  }
}
</script>

<style lang='scss' scoped>
.box-cards {
  width: 50%;
}
.hint {
  font-size: 12px;
  color: #888;
}
.content {
  margin-top: 20px;
  display: flex;
  .p1 {
    flex: 1;
    display: inline-block;
  }
  .p2 {
    flex: 1;
    display: inline-block;
  }
  .contentInput {
    flex: 5;
  }
}
</style>
