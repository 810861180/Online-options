import axios2 from '@/utils/request'

export default {
  // 地址查询
  mapQurey (params) {
    return axios2.get('place/v2/suggestion?' + params)
  }
}
