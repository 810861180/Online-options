<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" :before-close="handleCancle" center>
      <div>
        <slot></slot>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="loading" @click="handleConfirm">确 定</el-button>
        <el-button @click="handleCancle">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: [
    'visible',
    'title',
    'width'
  ],
  data () {
    return {
      loading: false,
      dialogVisible: false,
      dialogTitle: ''
    }
  },
  mounted () {
    this.dialogVisible = this.visible || false
    this.dialogTitle = this.title || '提示'
  },
  methods: {
    handleConfirm () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 300)
      this.$emit('confirm')
      this.close()
    },
    handleCancle () {
      this.$emit('cancle')
      this.close()
    },
    close () {
      this.dialogVisible = false
    },
    open () {
      this.dialogVisible = true
      return Promise.resolve()
    }
  }
}
</script>
