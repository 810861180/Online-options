<template>
  <div style="padding: 20px">
    <fm-editor v-model="dataModel"></fm-editor>
    <div class="btnArea">
      <el-col :sm='24' :md='12' :lg='8' :xl='4'>
        <el-button type="primary" icon="el-icon-check" class="submitBtn" @click="submit">保存</el-button>
      </el-col>
    </div>
  </div>
</template>

<script>
import FmEditor from '../../components/editor/tinymce'

export default {
  components: {
    FmEditor
  },
  data () {
    return {
      dataModel: ``
    }
  },
  methods: {
    submit () {
      console.log(this.dataModel)
    }
  }
}
</script>
