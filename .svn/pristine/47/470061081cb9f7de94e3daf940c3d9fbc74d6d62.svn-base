<template>
  <div>
    <el-cascader :style="{width: data.width}" v-model="selected" :options="options" :placeholder="data.placeholder" :props="data.props" @active-item-change="handleItemChange" @change="handleChange" @visible-change="queryProvince"></el-cascader>
    <el-input v-model="detailAddress" @blur="onBlur" v-show="data.detailsAddress" :style="{width: options.width}" placeholder="详细地址"></el-input>
    <!-- <el-form-item label="详细地址">
      <el-input
        v-model="detailAddress"
        @blur="onBlur"
        :style="{width: options.width}"
        placeholder="详细地址"
      ></el-input>
    </el-form-item>-->
  </div>
</template>
<script>
import { api } from '@/utils'
import _ from 'lodash'
export default {
  name: 'details-address',
  data () {
    return {
      // selected: [], // 选中的值 120000, 120100, 120101
      options: [], // 下拉框的值
      detailAddress: ''
    }
  },
  props: {
    data: {
      required: true,
      type: Object,
      default: () => {
        return {}
      }
    },
    defaultValue: {
      required: false,
      type: Array,
      default: () => {
        return []
      }
    },
    remote: {
      // 是否调用接口查询数据
      type: Boolean,
      default: false
    }
  },
  computed: {
    selected: {
      get () {
        return this.defaultValue
      },
      set (val) {
        return val
      }
    }
  },
  methods: {
    handleChange (val) {
      this.selected = val
      this.data.detailsAddressDesc =
        this.data.detailsAddressDesc === '' ? '' : this.data.detailsAddressDesc
      this.$emit('handleChange', val)
    },
    onBlur () {
      this.data.detailsAddressDesc = this.detailAddress
      this.$emit('onBlur', this.detailAddress)
    },
    // 省市区选项点击事件
    handleItemChange (item) {
      if (!_.isUndefined(item[1])) {
        this.querycounty(item[1])
      } else if (!_.isUndefined(item[0])) {
        this.querycity(item[0])
      }
    },
    queryProvince (type) {
      if (type) {
        if (this.selected.length < 1) {
          api.queryProvince().then(data => {
            let { message, result, success } = data
            if (success) {
              let arr = result.data
              arr.map((item, index) => {
                item.label = item.regionNAME
                item.value = item.regionId
                item.children = []
              })
              this.$set(this, 'options', arr)
            } else {
              // this.$message.error(message)
              this.$notify.error({
                title: 'Info',
                message: message,
                showClose: false
              })
            }
          })
        }
      }
    },
    // 根据省id获取市
    querycity (province) {
      api.querycity(province).then(data => {
        let { message, result, success } = data
        if (success) {
          let arr = result.data
          arr.map((item, index) => {
            item.label = item.regionNAME
            item.value = item.regionId
            item.children = []
          })
          _.filter(this.options, (item, index) => {
            if (province === item.regionId) {
              item.children = arr
            }
          })
          if (this.selected.length > 0 && this.selected[2] !== '') {
            this.querycounty(this.selected[1])
          }
        } else {
          // this.$message.error(message)
          this.$notify.error({
            title: 'Info',
            message: message,
            showClose: false
          })
        }
      })
    },
    // 根据市id获取区
    querycounty (city) {
      api.querycounty(city).then(data => {
        let { message, result, success } = data
        if (success) {
          let arr = result.data
          arr.map((item, index) => {
            item.label = item.regionNAME
            item.value = item.regionId
          })
          _.map(this.options, (item, index) => {
            _.filter(item.children, (cItem, cIndex) => {
              if (city === cItem.regionId) {
                cItem.children = arr
              }
            })
          })
        } else {
          // this.$message.error(message)
          this.$notify.error({
            title: 'Info',
            message: message,
            showClose: false
          })
        }
      })
    }
  },
  created () {
    // this.data.detailsAddressDesc = ''
    this.$set(this.data, 'detailsAddressDesc', '')
    console.log(this.remote)
    if (this.remote) {
      // 获取省份
      api.queryProvince().then(data => {
        let { message, result, success } = data
        if (success) {
          let arr = result.data
          arr.map((item, index) => {
            item.label = item.regionNAME
            item.value = item.regionId
            item.children = []
          })
          this.$set(this, 'options', arr)
          console.log(this.selected)
          if (this.selected.length > 0) {
            this.querycity(this.selected[0])
          }
        } else {
          // this.$message.error(message)
          this.$notify.error({
            title: 'Info',
            message: message,
            showClose: false
          })
        }
      })
    }
  }
}
</script>
