<template>
  <div class='page'>
    <!-- <el-card class='box-card'>
      <div slot='header' class='clearfix'>
        <span>日程列表</span>
      </div>
      <el-button style='padding: 3px 0' type='text' @click='handleFrom'>新增日程</el-button>
      <el-table :data='tableData' stripe style='width: 100%'>
        <el-table-column prop='schedule' label='日程'></el-table-column>
        <el-table-column prop='date' label='时间'></el-table-column>
        <el-table-column prop='site' label='地点'></el-table-column>
        <el-table-column prop='room' label='会场'></el-table-column>

        <el-table-column prop='seat' label='座位'>
          <template slot-scope='scope'>
            <el-button type='text' @click='handleRoom(scope.$index, scope.row)'>{{ scope.row.room }}</el-button>
          </template>
        </el-table-column>

        <el-table-column label='操作'>
          <template slot-scope='scope'>
            <el-button size='mini' @click='handleEdit(scope.$index, scope.row)'>编辑</el-button>
            <el-button size='mini' type='danger' @click='handleDelete(scope.$index, scope.row)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>-->

    <div class='wrapper'>
      <el-card class='box-card' v-for='(item, index) in cardData' :key='index'>
        <div slot='header' class='clearfix'>
          <i class='el-icon-close' @click='deleteCard(index)'></i>
          <span v-if='item.editState'>{{ item.title }}</span>
          <el-input v-if='!item.editState' v-model='item.title' placeholder='请输入标题' style='width:90%'></el-input>
        </div>
        <div v-if='item.editState' class='cardShow'>
          <p style='margin-top: 0'>
            <span class='cardSpan'>日期：</span>
            {{ item.date }}
          </p>
          <p>
            <span class='cardSpan'>开始时间：</span>
            {{ item.startTime }}
          </p>
          <p>
            <span class='cardSpan'>结束时间：</span>
            {{ item.endTime }}
          </p>
          <p>
            <span class='cardSpan'>地点：</span>
            {{ item.site }}
          </p>
          <p>
            <span class='cardSpan'>人物：</span>
            {{ item.room }}
          </p>
          <p>
            <span class='cardSpan'>座位：</span>
            {{ item.seat }}
          </p>
        </div>
        <div v-if='!item.editState' class='cardEdit'>
          <p>
            <span class='cardSpan'>日期：</span>
            <el-input v-model='item.date' placeholder='请填写日期' style='width:72%'></el-input>
          </p>
          <p class='cardEdit_p'>
            <span class='cardSpan'>开始时间：</span>
            <el-input v-model='item.startTime' placeholder='请填写开始时间' style='width:72%'></el-input>
          </p>
          <p class='cardEdit_p'>
            <span class='cardSpan'>结束时间：</span>
            <el-input v-model='item.endTime' placeholder='请填写结束时间' style='width:72%'></el-input>
          </p>
          <p class='cardEdit_p'>
            <span class='cardSpan'>地点：</span>
            <el-input v-model='item.site' placeholder='请填写地点' style='width:72%'></el-input>
          </p>
          <p class='cardEdit_p'>
            <span class='cardSpan'>会场：</span>
            <el-select v-model='item.room' filterable placeholder='请选择会场'>
              <el-option v-for='item in options' :key='item.value' :label='item.roomName' :value='item.id'></el-option>
            </el-select>
          </p>
          <p class='cardEdit_p'>
            <span class='cardSpan'>座位：</span>
            <el-button type='text' @click='handleRoom'>{{ item.seat }}</el-button>
          </p>
        </div>
        <div class='cardBtn'>
          <el-button type='text' @click='handleSave(index)'>保存</el-button>
          <el-button type='text' @click='handleEdit2(index)' style='color: red'>编辑</el-button>
        </div>
      </el-card>

      <!-- 添加卡片 -->
      <el-card class='box-card' shadow='hover'>
        <div class='coverDiv'>
          <img draggable='false' src='~@/../static/images/addCard.png' @click='addCard'>
        </div>
      </el-card>
    </div>

    <RoomDialog @addSucess='addSucess' ref='roomdialog'></RoomDialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          schedule: '日程1',
          date: '2019.3.31',
          site: '岳麓区湘邮科技园2栋202',
          room: '上海市普陀区金沙江路 1518 弄',
          seat: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      options: [],
      selectValue: '',
      cardData: [
        {
          editState: true,
          title: '日程1',
          date: '2018',
          startTime: '2018-23123',
          endTime: '2018-123123',
          site: '岳麓区湘邮科技园2栋202',
          room: '',
          seat: '2X2 100'
        }
      ]
      // editState: true,
    }
  },
  mounted () {
    let url = `${this.$roomQuery}/user/${JSON.parse(this.$cookie.get('userinfo')).id}`
    this.tableInfo(url, 'get')
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
      this.$refs.fromdialog.form = row
      this.$refs.fromdialog.open()
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleRoom () {
      // this.$refs.roomdialog.open()
      this.$router.push({ name: 'metting-seat' })
    },

    handleFrom () {
      this.$refs.fromdialog.open()
    },
    addSucess () {
      console.log('添加成功')
    },

    // 添加卡片
    addCard () {
      this.cardData.push({
        title: '',
        editState: false,
        date: '',
        startTime: '',
        endTime: '',
        site: '',
        room: '',
        seat: '配置座位'
      })
    },

    deleteCard (index) {
      this.cardData.splice(index, 1)
    },

    // 卡片保存
    handleSave (index) {
      this.cardData[index].editState = true
    },
    // 卡片编辑
    handleEdit2 (index) {
      this.cardData[index].editState = false
    },

    // 会场查询
    tableInfo (url, method, data) {
      this.$axios({
        url: url,
        method: method,
        data: data
      }).then(({ data }) => {
        if (data.flag) {
          this.options = data.data
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
$card-width: 400px;
$card-height: 420px;
.wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 5px;
  grid-column-gap: 5px;

  .box-card {
    width: $card-width;
    height: $card-height;
    display: inline-block;
    position: relative;
    &:hover {
      box-shadow: 0 2px 12px 0 rgba($color: $black, $alpha: 0.1);
    }
    .coverDiv {
      position: absolute;
      width: $card-width;
      height: $card-height;
      top: 0;
      left: 0;
      z-index: 99;
      background: white;
      img {
        position: absolute;
        top: ($card-height - 128px) / 2;
        left: ($card-width - 128px) / 2;
      }
    }
    .el-icon-close {
      display: inline-block;
      font-size: 22px;
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 99;
    }
    .cardBtn {
      position: absolute;
      bottom: 10px;
      right: 40px;
    }
    .cardShow p {
      margin-top: 20px;
    }
    .cardEdit_p {
      margin-top: 10px;
    }
    .cardSpan {
      display: inline-block;
      text-align: right;
      width: 80px;
    }
  }
}
</style>
