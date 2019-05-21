<template>
  <div class='seats'>
    <div class='screen-div'>
      <p class='screen'>屏幕</p>
    </div>
    <div>
      <p class='boxchunk'>1</p>
      <el-checkbox v-for='(item, index) in row' :key='index' @change='(e) => boxChangeCol(e, index)' style='margin-left: 15px;' class='colCheckbox'></el-checkbox>
    </div>
    <div class='row' v-for='(item, index) in seats' :key='index'>
      <el-checkbox @change='(e) => boxChangeRow( e,index)' style='margin-left: 15px; margin-right:5px;'></el-checkbox>
      <p class='rowspan'>{{ index + 1}}</p>
      <div v-for='(el, idx) in item' :key='idx' class='seat' @click='clickSeat(idx, index)' :class='{classSeat: el.seatStatus == 1, classWhite: el.seatStatus == -1}'></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seats: Array,
    row: Number
  },
  data () {
    return {
      value: ''
    }
  },
  mounted () { },
  methods: {
    clickSeat (idx, index) {
      this.seats.forEach(item => {
        item.forEach(el => {
          if (index + 1 === el.seatCol && idx + 1 === el.seatRow && el.seatStatus === 0) {
            el.seatStatus = -1
          } else if (index + 1 === el.seatCol && idx + 1 === el.seatRow && el.seatStatus === -1) {
            el.seatStatus = 0
          }
        })
      })
    },

    boxChangeRow (e, index) {
      this.seats[index].map(item => {
        item.seatStatus = item.seatStatus === 0 ? -1 : 0
      })
    },
    boxChangeCol (e, index) {
      this.seats.map(item => {
        item[index].seatStatus = item[index].seatStatus === 0 ? -1 : 0
      })
    }
  }
}
</script>

<style lang='scss' scoped>
$boxSize: 32px;
%inMiddle {
  text-align: center;
  margin: 0 auto;
}

.seats {
  padding: 10px 0;
  margin-top: 20px;
  background: rgb(247, 247, 247);
  @extend %inMiddle;
  .screen-div {
    margin-bottom: 10px;
    .screen {
      display: inline-block;
      width: 30%;
      background: rgb(226, 226, 226);
      padding: 5px 0;
      border-radius: 20px;
      @extend %inMiddle;
    }
  }

  .boxchunk {
    width: 20px;
    height: 100%;
    background: red;
    display: inline-block;
    margin-right: 48px;
    visibility: hidden;
  }
  .colCheckbox {
    margin: {
      left: 19px !important;
      right: 9px !important;
    }
  }
  .row {
    height: $boxSize;
    margin-bottom: 5px;
    .rowspan {
      vertical-align: top;
      line-height: $boxSize;
      display: inline-block;
      width: 30px;
      text-align: center;
    }
    .seat {
      width: $boxSize;
      height: $boxSize;
      background: url("~@/../static/images/seat.png");
      margin-left: 10px;
      display: inline-block;
    }
    .classSeat {
      background: url("~@/../static/images/seat_1.png");
    }
    .classWhite {
      background: url("~@/../static/images/forbid.png");
    }
  }

  .el-checkbox {
    line-height: $boxSize;
    vertical-align: top;
  }
}
</style>
