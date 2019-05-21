<template>
  <div class="div">
    <div class="tables">
      <div class="heads">
        <p class="titles">选择票价</p>
      </div>
      <div class="contents">
        <div class="content" v-for="(item, index) in listData" :key="index" @click="contentClink(item)">
          <p>{{ item.ticketName }}</p>
          <p>¥ {{ item.ticketPrice }}</p>
          <p>{{ item.ticketType }}</p>
        </div>
      </div>
      <div class="footerText" v-if="footerText">
        {{ footerText }}
      </div>
      <div class="footer">
        <p class="p1">¥ {{ price }}</p>
        <p class="p2" @click="submit">提交订单</p>
      </div>
    </div>
  </div>
</template>

<script>
// /#/listTable?metId=72
import { api } from '@/utils'
export default {
  data () {
    return {
      listData: [],
      footerText: '',
      price: 0,
      metId: undefined,
      memberId: undefined,
      openId: undefined,
      id: ''

    }
  },
  created () {
    let name, value, str = location.href, num = str.indexOf('?') // 取得整个地址栏
    str = str.substr(num + 1) // 取得所有参数 stringvar.substr(start [, length ]
    let arr = str.split('&') // 各个参数放到数组里
    for (let i = 0; i < arr.length; i++) {
      num = arr[i].indexOf('=')
      if (num > 0) {
        name = arr[i].substring(0, num)
        value = arr[i].substr(num + 1)
        this[name] = value
        if (name === 'memberId') {
          this.$data.memberId = value
        }
        if (name === 'metId') {
          this.$data.metId = value
        }
        if (name === 'openId') {
          this.$data.openId = value
        }
      }
    }

  },
  mounted () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      let params = this.$data.metId
      this.$phoneTable(params).then(data => {
        console.log(data)
        this.listData = data.data
      })
    },
    contentClink (item) {
      this.footerText = `票价描述：${item.ticketDesc}`
      this.price = item.ticketPrice
      this.id = item.id
    },
    // 提交订单
    submit () {
      if (this.id === 0 || this.id === '' || this.id < 0) {
        this.$notify.error({
          title: '错误',
          message: '请选择票价'
        })
      } else {
        console.log('订单提交', this.id)
        var params = {
          goodsId: this.id,
          metId: this.metId,
          memberId: this.memberId,
          openId: this.openId
        }
        api.placeOrder(params).then(res => {
          if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
              document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
          } else {
            this.onBridgeReady(res.data);
          }
        })
      }
    },
    onBridgeReady (res) {
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          "timeStamp": res.timeStamp,
          "package": res.package,
          "paySign": res.paySign,
          "appId": res.appId,
          "signType": "MD5",
          "nonceStr": res.nonceStr
        }, function (res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // window.location.reload();
          } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            alert("取消支付!" + JSON.stringify(res));
            // window.history.go(-1)
          } else {
            this.$notify.error({
              title: '错误',
              message: '支付失败'
            })
          }
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.div {
  background: rgb(245, 244, 245);
  height: 100vh;
}
.tables {
  width: 100vw;
  .heads {
    width: 100%;
    .titles {
      text-align: center;
      height: 2.5rem;
      color: white;
      background: $--color-primary;
      line-height: 2.5rem;
    }
  }
  .contents {
    width: 100%;
    padding: 1.25rem 1.875rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 1.25rem;
    grid-column-gap: 1.25rem;
    background: white;
    .content {
      height: 6.25rem;
      border: 0.0625rem solid rgb(245, 244, 245);
      border-radius: 5px;
      text-align: center;
      p {
        margin-top: 10px;
      }
      &:hover {
        background: rgb(249, 226, 200);
        color: rgb(208, 115, 43);
      }
    }
  }
  .footer {
    height: 2.5rem;
    width: 100%;
    background: white;
    border-top: 1px solid rgb(209, 222, 231);
    position: fixed;
    bottom: 0;
    z-index: 999;
    p {
      display: inline-block;
      line-height: 2.5rem;
    }
    .p1 {
      float: left;
      width: 100px;
      margin-left: 30px;
      font-size: 20px;
      color: red;
    }
    .p2 {
      float: right;
      width: 120px;
      background: rgb(220, 53, 51);
      text-align: center;
      font-size: 14px;
      color: white;
      // &:active{
      //   background: yellow;
      // }
    }
  }
  .footerText {
    position: fixed;
    bottom: 2.5625rem;
    width: 100%;
    padding: 0.125rem 0.3125rem;
    color: rgb(237, 157, 77);
    background: rgb(252, 243, 177);
  }
}
</style>
