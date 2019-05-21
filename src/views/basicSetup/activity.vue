<template>
  <div>
    <el-card class="box-card">
      <div class="title">
        <p>活动信息</p>
        <div></div>
      </div>
      <div class="content">
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px">
          <el-form-item label="会议主题" prop="metTopic">
            <el-input v-model="form.metTopic"></el-input>
          </el-form-item>
          <el-form-item label="会议时间" prop="metBgndate" style="display: inline-block;width: 49%;">
            <el-date-picker format="yyyy-MM-dd hh:mm" value-format='timestamp' type="datetime" v-model="form.metBgndate" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="metEnddate" style="display: inline-block;width: 50.7%;">
            <el-date-picker format="yyyy-MM-dd hh:mm" value-format='timestamp' type="datetime" v-model="form.metEnddate" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="会议地点" prop="citys">
            <el-col :span="8">
              <!-- <el-cascader :options="options" :props="props" v-model="form.citys" @active-item-change="handleItemChange" style="width:95%;" @change="cascaderChange" @visible-change="cascaderVisibleChange" ref="cascaderRef">
              </el-cascader> -->
              <area-cascader ref="cascaderRef" :data.sync="options" :defaultValue="form.citys" @handleChange="cascaderChange" remote></area-cascader>
            </el-col>
            <el-col :span="16">
              <!-- <el-input v-model="form.metAddr" placeholder="详细地址"></el-input> -->
              <!-- <siteQurey ref='sitequrey' @childData="childData"></siteQurey> -->
            </el-col>
          </el-form-item>
          <!-- <el-form-item label="主办单位" prop="sponsor">
            <el-input v-model="form.sponsor"></el-input>
          </el-form-item> -->
          <div class="baidumap">
            <baiduMap ref="baidumap" @baiduValue="baiduValue"></baiduMap>
          </div>

          <el-form-item label="会议背景">
            <div class="hybackground" v-for="(item, index) in form.img" :key="index">
              <img :src="item" border="0">
            </div>
            <div class="hybackground" v-if="imgFlag">
              <img :src="$axios.adornUrl('/wx/downFile/' + form.metBgr)" border="0">
            </div>
            <div class="hint">
              <p class="p1">注意事项：</p>
              <p class="p2">建议上传尺寸 1920px*1080px 的.png、<br/>.jpg、.gif图片，图片小于1M</p>
                <upload @uploadsForm='uploadsForm' ref="activityUpload"></upload>
            </div>
          </el-form-item>
          <el-form-item label="活动详情" prop="metName">
            <!-- <tinymce></tinymce> -->
            <el-input type="textarea" :rows="7" placeholder="请输入内容" v-model="form.metName"></el-input>
          </el-form-item>
          <el-col :span="12">
            <el-form-item label="手机号码">
              <el-input v-model="form.metOrgPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="参会人数">
              <el-input v-model="form.metCapacity"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>

    </el-card>
    <div class="footer">
      <el-button type="primary" class="btn" @click="submitForm">保存活动信息</el-button>
    </div>

  </div>
</template>

<script>
import tinymce from '@/components/editor/tinymce'
import upload from '@/components/imgUpload/upload'
import siteQurey from './siteQurey'
import areaCascader from '@/components/areaCascader'
import baiduMap from './baiduMap'
export default {
  // inject: ['reload'], // 注入依赖
  components: {
    tinymce,
    upload,
    siteQurey,
    areaCascader,
    baiduMap
  },
  data () {
    return {
      options: {
        width: '95%',
        detailsAddress: false
      },
      // props: {
      //   value: 'value',
      //   label: 'label',
      //   children: 'cities'
      // },
      form: {
        uId: '', //用户id
        metName: '', //会议主题
        metBgndate: undefined,  //开始时间
        metEnddate: undefined,  //结束时间
        metType: '', //会议类别
        metTopic: '', //会议主题
        appLogo: '', //大屏APPlogo
        wxLog: '', //微信端logo
        metBgr: '', //背景
        metPic: '', //负责人
        metOrgPhone: '', //联系方式
        province: '', //省
        city: '', //	市
        county: '', //县区
        metAddr: '', //详细地址
        lng: '', //经度
        lat: '', //纬度
        img: [], //图片文件流
        citys: [],   //会议地点 展示用
      },
      rules: {
        // metTopic: [
        //   { required: true, message: '请输入会议主题', trigger: 'blur' },
        // ],
        metBgndate: [
          { required: true, message: '请输入开始时间', trigger: 'blur' },
        ],
        metEnddate: [
          { required: true, message: '请输入结束时间', trigger: 'blur' },
        ],
        // citys: [
        //   { required: true, message: '请输入会议地点', trigger: 'blur' },
        // ],
        metName: [
          { required: true, message: '请输入活动详情', trigger: 'blur' },
        ]
      },
      imgFlag: true
    }
  },
  created () {
    this.queryInformation()
    // console.log('111', JSON.parse(this.$cookie.get('userinfo')))
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.activityUpload.classif('p3')
      this.$refs.activityUpload.autoUpload = true
      this.$refs.activityUpload.formFlag = true
    })
  },
  methods: {
    // 表单提交
    submitForm () {
      console.log(this.form)
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.addInformation()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 子组件传递参数
    uploadsForm(val) {
      this.form.img = val.img
      this.imgFlag = false
    },
    // 地址连级下拉框
    handleItemChange (val) {
      this.querySeht(val)
      console.log(val)
    },
    // 省查询
    queryProvince () {
      this.$queryProvince().then(data => {
        console.log('175', data)
        if (data.result.flag) {
          this.options = this.disposeArr(data.result.data)
        }
      })
    },
    // 地址查询请求
    querySeht (val) {
      setTimeout(() => {
        if (val.length === 1) {
          this.$querycity(val[0]).then(data => {
            this.options.map(item => {
              if (item.value == val[0]) {
                item.children = this.disposeArr(data.result.data)
              }
            })
          })
        } else {
          this.$querycounty(val[1]).then(data => {
            this.options.map(item => {
              if (item.value == val[0]) {
                item.children.map(item => {
                  item.children = this.disposeArr(data.result.data, true)
                })
              }
            })
          })
        }
        console.log(this.options)
      }, 300)
    },
    // 连级选择change
    cascaderChange (val) {
      console.log(val)
      // let lable = this.$refs['cascaderRef'].currentLabels // 拿到所选择城市都中文名称
      // this.$refs.sitequrey.city = lable[lable.length - 2]
    },
    // 连级下拉框出现时触发
    cascaderVisibleChange (val) {
      if (val) {
        this.queryProvince()
      }
    },
    // 活动信息查询
    queryInformation () {
      if (this.$route.params.flag !== 'new') {
        let id = this.$store.state.met.id || this.$cookie.get('metId')
        this.$queryInformation(id).then(data => {
          if (data.data.length !== 0) {
            this.form = {...data.data[0], img:[]}
            let { province, city, county } = this.form
            let arr = []
            arr[0] = parseInt(province)
            arr[1] = parseInt(city)
            arr[2] = parseInt(county)
            this.form.citys = arr
            this.$refs.baidumap.userlocation.lng = this.form.lng
            this.$refs.baidumap.userlocation.lat = this.form.lat
            this.$refs.baidumap.mapSearch(this.form.lng, this.form.lat, this.form.metAddr)
            if (this.form.metBgr !== '') this.imgFlag = true
          }
        })
      }
    },
    // 新增活动信息
    addInformation () {
      let params = this.form
      params.uId = JSON.parse(this.$cookie.get('userinfo')).id
      delete params.citys
      if (this.$route.params.flag === 'new') {
        params.province = params.citys[0]
        params.city = params.citys[1]
        params.county = params.citys[2]
      }
      this.$addInformation(params).then(data => {
        console.log('220', data)
        this.queryInformation()
      })
    },
    // 地址回显
    siteData (arr) {
      if (arr) {
        this.$queryProvince().then(data => {
          let provinceArr = data.result.data
          provinceArr.map((item, index) => {
            item.label = item.regionNAME
            item.value = item.regionId
          })
          this.options = provinceArr
          console.log('248', this.options)
        }).then(() => {
          this.$querycity(arr[0]).then(data => {
            let test = ''
            let { result } = data
            this.options.map((item, index) => {
              item.label = item.regionNAME
              item.value = item.regionId
              if (item.regionCode === arr[0]) {
                this.options[index].cities = result.data
                test = index
              }
            })
            console.log('253', this.options)
            return Promise.resolve(test)
          }).then(test => {
            this.$querycounty(arr[1]).then(data => {
              this.options[test].children.map((item, index) => {
                item.label = item.regionNAME
                item.value = item.regionId
                if (item.regionCode === arr[1]) {
                  this.options[test].children[index].children = data.result.data
                }
              })
              console.log('269', this.options)
            }).then(() => {
              // this.form.citys = arr
              console.log('272', this.form.citys)
            })
          })
        })
      }
    },
    //子组件调用
    baiduValue (val) {
      this.form = { ...this.form, ...val }
    },
    // 地址数组处理
    disposeArr (arr, flag) {
      let test = []
      arr.forEach((item, index) => {
        test.push({})
        test[index]['label'] = item.regionNAME
        test[index]['value'] = item.regionCode
        if (!flag) test[index]['children'] = []
      })
      return test
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  width: 100%;
  .title {
    width: 100%;

    p {
      font-size: 18px;
      font-family: Adobe Heiti Std R;
      font-weight: bold;
      color: rgba(59, 73, 102, 1);
      margin: 0 0 0 2.5%;
    }
    div {
      width: 98%;
      height: 2px;
      margin: 0 auto;
      margin-top: 10px;
      background: $--color-primary;
    }
  }
  .content {
    width: 95%;
    margin: 0 auto;
    padding: 30px 0 0 0;
    margin-bottom: 150px;
  }
}

.hybackground {
  height: 270px;
  width: 480px;
  border: 1px solid #dcdfe6;
  display: inline-block;
  vertical-align: top;
  img {
    width: 100%;
    height: 100%;
  }
}
.hint {
  display: inline-block;
  margin-left: 100px;

  .p1 {
    color: $--color-primary;
    font-size: 18px;
    margin-top: 30px;
  }
  .p2 {
    font-size: 12px;
    line-height: 14px;
    margin-top: 10px;
  }
  .p3 {
    width: 200px;
    height: 34px;
    border-radius: 5px;
    font-size: 12px;
    margin-top: 50px;
  }
}

.footer {
  width: 100%;
  height: 70px;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 999;
  background: #434343;
  padding: 0 50px;
  .btn {
    height: 40px;
    line-height: 20px;
    width: 200px;
    border-radius: 2px;
    margin-top: 15px;
    float: right;
  }
}
.baidumap {
  height: 370px;
  width: 100%;
}
</style>
