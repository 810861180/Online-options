<template>
  <div>
    <el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect" style="width:100%;"></el-autocomplete>
  </div>
</template>
<script>
import maphttp from '@/utils/maphttp'
export default {
  data () {
    return {
      state: '',
      timeout: null,
      city: ''
    };
  },
  methods: {
    querySearchAsync (queryString, cb) {
      if (!!(queryString && this.city)) {
        setTimeout(() => {
          let params = `query=${queryString}&region=${this.city}&city_limit=true&output=json&ak=qB9Q4rlCogQHZq27GBVl3z8mt3BkcpgD`
          maphttp.mapQurey(params).then(data => {
            let restaurants = data.data.result.map(item => {
              item.value = item.name
              return item
            })
            let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
              cb(results)
            }, 1000 * Math.random())
          })
        }, 1500)
      }
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      }
    },
    handleSelect (item) {
      console.log('最终确认',item)
      // this.$emit('childData', item)
    }
  }
}
</script>
