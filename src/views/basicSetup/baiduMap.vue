<template>
  <div id="all">
    <p class="text">当前地址：{{ textSite }}</p>
    <el-input type="text" size="mini" id="suggestId" name="address_detail" placeholder="查询地址" v-model="metAddr" class="input_style"></el-input>
    <div id="allmap"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      metAddr: undefined, //详细地址
      userlocation: { lng: '', lat: '' },
      initialValue: undefined,
      textSite: ''
    }
  },
  mounted () {

  },
  methods: {
    // 传值给父组件
    valueEmit () {
      let val = {
        metAddr: this.metAddr,
        ...this.userlocation
      }
      this.$emit('baiduValue', val)
    },
    mapSearch (lng, lat, metAddr) {
      this.textSite = metAddr
      const map = new BMap.Map("allmap");
      const point = new BMap.Point(lng, lat);
      map.centerAndZoom(new BMap.Point(lng, lat), 15);
      map.enableScrollWheelZoom(true);
      map.addOverlay(new BMap.Marker(point))
      let myValue
      let ac = new BMap.Autocomplete(    //建立一个自动完成的对象
      {
        "input": "suggestId",
        "location": map
      })
      ac.addEventListener("onconfirm", (e) => {   //鼠标点击下拉列表后的事件
        let _value = e.item.value
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        this.metAddr = myValue
        setPlace()
      })
      let setPlace = () => {
        map.clearOverlays()    //清除地图上所有覆盖物
        let myFun = () => {
          this.userlocation = local.getResults().getPoi(0).point    //获取第一个智能搜索的结果
          this.valueEmit() //传值给父组件
          map.centerAndZoom(this.userlocation, 18)
          map.addOverlay(new BMap.Marker(this.userlocation))    //添加标注
          console.log('46', this.userlocation)
        }
        let local = new BMap.LocalSearch(map, { //智能搜索
          onSearchComplete: myFun
        })
        local.search(myValue)

        // 地图上标记
        // map.addEventListener("click", (e) => {
        //   console.log(e)
        //   // 清空标记
        //   map.clearOverlays()
        //   // 创建新的标记
        //   map.centerAndZoom(e.point, map.getZoom())
        //   map.addOverlay(new BMap.Marker(e.point))
        // })
      }
    }
  }
}
</script>
<style scoped>
#allmap {
  width: 43.7%;
  height: 300px;
  font-family: "微软雅黑";
  margin-left: 80px;
  margin-top: 5px;
}
.input_style {
  width: 43.7%;
  margin-left: 80px;
  margin-top: 5px;
}
.text {
  width: 43.7%;
  margin-left: 80px;
}
</style>
