<template>
  <div>
    <div class="title">
      <div class="chunk"></div>
      <p>嘉宾介绍</p>
      <div class="btn" @click="handleDialog(false)">
        <i class="el-icon-circle-plus-outline"></i>
        <span>新增</span>
      </div>
    </div>
    <el-card class="box-card">
      <div class="container">
        <div class="content" v-for="(item, index) in datas" :key="index">
          <div class="sixedge">
            <div class="boxT" v-if="item.guestPic" :style="{background: 'url('+$axios.adornUrl('/wx/downFile/' + item.guestPic) +')',backgroundSize: '100% 100%'}">
            </div>
          </div>
          <div class="synopsis">
            <p class="name1">{{item.guestName}}</p>
            <p class="name2">{{item.guestPost}}</p>
            <p class="name3">{{item.guestDesc}}</p>
            <div class="footerBtn">
              <div class="footerBtn_btn _btn1" @click="handleDialog(true, item)">
                <i class="el-icon-edit-outline"></i>
                <span>编辑</span>
              </div>
              <div class="footerBtn_btn _btn2" @click="removeCard(index, item.id)">
                <i class="el-icon-delete"></i>
                <span>删除</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="flags">
        暂无嘉宾，请添加
      </div>
    </el-card>
    <honoredDiaglog @addSucess="addSucess" ref="honoreddiaglog"></honoredDiaglog>
  </div>
</template>

<script>
export default {
  inject: ['reload'], // 依赖注入
  data () {
    return {
      datas: []
    }
  },
  computed: {
    flags () {
      if (this.datas.length === 0) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    this.queryCard()
  },
  methods: {
    // dialog
    addSucess () {
      this.queryCard()
    },
    handleDialog (str, item) {
      this.$refs.honoreddiaglog.open()
      if (str) {

        this.$refs.honoreddiaglog.imgflag = true // 编辑入口显示
        this.$refs.honoreddiaglog.ruleForm = { ...item, img: [] }
        this.$refs.honoreddiaglog.flag = false
      } else {
        this.$refs.honoreddiaglog.imgflag = false // 新增入口打开隐藏img2
        this.$refs.honoreddiaglog.ruleForm = {
          guestName: '',
          guestPost: '',
          guestDesc: '',
          img: [],
          guestPic: ''
        }
        this.$refs.honoreddiaglog.flag = true
      }
    },
    removeCard (index, id) {
      this.$removeHonored(id).then(data => {
        if (data.flag) {
          this.datas.splice(index, 1)
          this.reload()
        }
      })
    },
    queryCard () {
      let id = this.$store.state.met.id || this.$cookie.get('metId')
      this.$queryHonored(id).then(data => {
        if (data.flag) {
          this.datas = data.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 50px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  .chunk {
    height: 100%;
    width: 12px;
    display: inline-block;
    background: $--color-primary;
  }
  p {
    display: inline-block;
    line-height: 50px;
    vertical-align: top;
    margin-left: 10px;
    font-size: 15px;
    font-family: Adobe Heiti Std R;
    font-weight: normal;
    color: $--color-primary;
  }
  .btn {
    width: 80px;
    height: 30px;
    background: $--color-primary;
    float: right;
    margin: 9px 10px 0 0;
    cursor: pointer;
    color: white;
    border: 1px solid #ebeef5;
    text-align: center;
    font-weight: 100;
    user-select: none;
    i {
      font-size: 16px;
      line-height: 30px;
      vertical-align: middle;
    }
    span {
      font-size: 13px;
    }
    &:active {
      background: rgba(6, 126, 163, 0.993);
    }
  }
}

.box-card {
  margin-top: 10px;
  .container {
    width: 100%;
    // background: gainsboro;
    display: inline-block;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-row-gap: 15px;
    grid-column-gap: 50px;
    .content {
      width: 280px;
      height: 370px;
      // border: 1px solid black;
      text-align: center;
      position: relative;
      .synopsis {
        width: 100%;
        height: 270px;
        border: 1px solid rgba(210, 210, 210, 1);
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 9;
        .name1 {
          font-size: 16px;
          margin-top: 65px;
          font-family: Adobe Heiti Std R;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
        }
        .name2 {
          font-size: 13px;
          margin-top: 8px;
          font-family: Adobe Heiti Std R;
          font-weight: normal;
          color: rgba(64, 64, 64, 1);
        }
        .name3 {
          padding: 0 20px;
          text-align: left;
          margin-top: 16px;
          text-indent: 14px;
          font-family: Adobe Heiti Std R;
          font-weight: normal;
          color: rgba(124, 124, 124, 1);
        }
        .footerBtn {
          width: 100%;
          height: 36px;
          position: absolute;
          bottom: 0;
          display: flex;
          color: white;
          .footerBtn_btn {
            display: inline-block;
            flex: 1;
            font-size: 16px;
            line-height: 36px;
            user-select: none;
            font-family: Adobe Heiti Std R;
            font-weight: normal;
          }
          ._btn1 {
            text-align: right;
            padding-right: 25px;
            background: $--color-primary;
            &:active {
              background: rgba(6, 126, 163, 0.993);
            }
          }
          ._btn2 {
            text-align: left;
            padding-left: 25px;
            background: #ff5959;
            &:active {
              background: rgb(238, 59, 59);
            }
          }
        }
      }
    }
  }
}

.sixedge {
  z-index: 999;
  width: 100%;
  position: absolute;
  top: 0;
}
.boxT,
.overlay {
  width: 150px;
  height: 150px;
  display: inline-block;
  border-radius: 50%;
}
.boxT {
  background-image: url("../../../static/images/avatar.png");
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
