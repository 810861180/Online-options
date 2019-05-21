import axios from '@/utils/axios'

export default {
  /* 登录 */
  // login: '/userLogin',
  login (params) {
    return axios.post('/userLogin', params)
  },
  /* 验证码 */
  // captcha: '/images/kaptcha.jpg',
  captcha () {
    return '/images/captcha'
  },
  /* 获取用户信息 */
  getUserInfo: 'getUserInfo',
  /* 会场查询 、新增、修改 */
  roomQuery: 'api/v1/rooms',
  /* 会场分页查询 */
  roomQueryByPage: 'api/v1/rooms/page',
  /* 座位配置查询、新增、修改 */
  seatQuery: 'api/v1/seatconf',
  /* 票价新增 */
  priceQuery: 'api/v1/tickets',
  // 票价删除
  deletePrice(params) { 
    return axios.delete(`/api/v1/tickets/${params}`)
  },
  /* 票价分页查询 */
  priceQueryByPage: 'api/v1/tickets/page',
  /* 省 */
  // queryProvince: 'region/queryProvince/0',
  queryProvince () {
    return axios.get('region/queryProvince/0')
  },
  /* 市 */
  // querycity: '/region/querycity',
  querycity (params) {
    return axios.get('/region/querycity/' + params)
  },
  /* 区 */
  // querycounty: 'region/querycounty'
  querycounty (params) {
    return axios.get('/region/querycounty/' + params)
  },
  /* 新增表单 */
  addForm (params) {
    return axios.post('/api/v1/custom_form', params)
  },
  /* 修改表单 */
  editForm (params) {
    return axios.put('/api/v1/custom_form', params)
  },
  /* 查询表单 */
  queryForm (params) {
    return axios.get(`/api/v1/wx/custom_form/${params.metId}/${params.formType}/${params.memberId}`)
  },
  /* 配置查询表单 */
  queryForm1 (params) {
    return axios.get(`/api/v1/custom_form/${params.metId}/${params.formType}`)
  },
  /* 表单提交 */
  submitForm (params) {
    return axios.post('/api/v1/wx/form_data', params)
  },
   /* 表单提交成功跳转 */
   formToSeat (params) {
    return axios.get(`/miniapp/pay/tickets/order/${params.metId}/${params.memberId}`)
  },
  /* 修改表单数据 */
  editFormData (params) {
    return axios.put('/api/v1/form_data', params)
  },
  /* 查询表单数据 */
  queryFormData (params) {
    return axios.get(`/api/v1/form_data/${params.formId}/${params.id}`)
  },
  /* 用户是否存在 */
  userIsExist (params) {
    return axios.post('/api/v1/registerVerification', params)
  },
  /* 注册用户 */
  regionUser (params) {
    return axios.post('/sysUser/saveUserInformation', params)
  },
  /* 绑定微信 */
  bindWx (params) {
    return '/wx/getWxInfo/' + params
  },
  /* 微信二维码 */
  getWxCode () {
    return axios.post('/wx/createUUID')
  },
  /* 获取用户信息 */
  getUserInfoByUserId (params) {
    return axios.post('/sysUser/selectSysUser/' + params)
  },
  /* 查询活动列表 */
  queryActivties (params) {
    return axios.get(`/api/v1/meetconf/page?uId=${params.uId}&currentPage=${params.currentPage}&pageSize=${params.pageSize}&type=${params.type}&topic=${params.topic}`)
  },
  /** 查询签到数据 */
  querySigninData (params) {
    return axios.get(`/api/v1/scansign/page?metId=${params.metId}&currentPage=${params.currentPage}&pageSize=${params.pageSize}`)
  },
  /* 修改活动状态 */
  changeMeetStatus (params) {
    return axios.delete(`/api/v1/meetconf?ids=${params.ids}&recFlag=${params.recFlag}`)
  },
  /* 新增会议 */
  addMeeting (params) {
    return axios.post('/api/v1/meetconf', params)
  },
  /* 嘉宾介绍查询 */
  queryHonored (params) {
    return axios.get('/api/v1/guests/' + params)
  },
  /* 嘉宾介绍新增 */
  addHonored (params) {
    return axios.post('/api/v1/guests', params)
  },
  /* 嘉宾删除 */
  removeHonored (params) {
    return axios.delete('/api/v1/guests/del/' + params)
  },
  /* 嘉宾修改 */
  editHonored (params) {
    return axios.put('/api/v1/guests', params)
  },
  /* 活动信息查询 */
  queryInformation (params) {
    return axios.get('/api/v1/meetconf/' + params)
  },
  /* 新增活动信息 */
  addInformation (params) {
    return axios.post('/api/v1/meetconf/', params)
  },
  /* 新增日程 */
  creatSchedule (params) {
    return axios.post('/api/v1/sche', params)
  },
  /* 查询日程列表 */
  querySchedules (params) {
    return axios.get(`/api/v1/sche/page?metId=${params.metId}&currentPage=${params.currentPage}&pageSize=${params.pageSize}`)
  },
  /* 修改日程 */
  editSchedule (params) {
    return axios.put('/api/v1/sche', params)
  },
  /* 删除日程 */
  deleteSchedule (params) {
    return axios.delete('/api/v1/sche/' + params)
  },
  /* 上传日程文件 */
  uploadSchedule (params) {
    return axios.post('/api/v1/fileUpload', params)
  },
  /* 查询上传文件1日程，2举办方资料,3嘉宾演讲资料*/
  queryFiles (params) {
    return axios.get(`/api/v1/fileUpload/${params.metId}/${params.type}`)
  },
  /* 获取模板消息 */
  getTemplate (params) {
    return axios.get('/api/v1/template/' + params)
  },
  /* 获取模板消息下拉数据 */
  getSelete () {
    return axios.get('/api/v1/template/down')
  },
  /* 模板消息新增 */
  addTemplate (params) {
    return axios.post('/api/v1/template', params)
  },
  /* 模板消息查询 */
  queryTemplate (params) {
    return axios.get('/api/v1/template/get/' + params)
  },
  /* 模板消息时间提示间隔*/
  timeTemplate (params) {
    return axios.post('/meetconf/saveMeet', params)
  },
  /* 模板消息时间提示间隔*/
  queryTimeTemplate (params) {
    return axios.get('/meetconf/selectmeetconf/' + params)
  },
  /* 模板消息修改状态 */
  stateTimeTemplate(params) {
    return axios.put(`/api/v1/template/${params.uid}/${params.confType}/${params.recFlag}`)
  },
  /* 上传日程文件 */
  uploadSchedule (params) {
    return axios.post('/api/v1/fileUpload', params)
  },
  /* 查询报名数据 */
  querySignupData (params) {
    return axios.get(`/signup/MeetSigPage?metId=${params.metId}&likeName=${params.likeName}&likeAddr=${params.likeAddr}&signStatus=${params.signStatus}&currentPage=${params.currentPage}&pageSize=${params.pageSize}`)
  },
  /* 导出报名数据 */
  downloadSignupData (params) {
    return axios.get(`/metInvite/signup/exportSignup?metId=${params.metId}&likeName=${params.likeName}&likeAddr=${params.likeAddr}&signStatus=${params.signStatus}`, {
      responseType: 'arraybuffer'
    })
  },
  /* 邀请函数据查询 */
  queryInvite(params) {
    return axios.get(`/api/v1/Invite/${params}`)
  },
  /* 邀请函数据新增*/
  addInvite(params) {
    return axios.post('/api/v1/Invite', params)
  },
  /* 邀请函数据修改 */
  editInvite(params) {
    return axios.put('/api/v1/Invite', params)
  },
  /* 查询商户 */
  queryMerchant (params) {
    return axios.get(`/api/v1/mchInfo/${params.uId}`)
  },
  /* 新增商户 */
  addMerchant (params) {
    return axios.post(`/api/v1/mchInfo`, params)
  },
  /* 修改商户 */
  editMerchant (params) {
    return axios.put(`/api/v1/mchInfo`, params)
  },
  /* 新增渠道 */
  addChannel (params) {
    return axios.post(`/api/v1/payChannel`, params)
  },
  /* 修改渠道 */
  editChannel (params) {
    return axios.put(`/api/v1/payChannel`, params)
  },
  /* 删除渠道 */
  deleteChannel (params) {
    return axios.delete('/api/v1/payChannel/' + params)
  },

  // 手机表格
  phoneTable(params) {
    return axios.get(`/api/v1/wx/tickets/${params}`)
  },
  //票价下单
  placeOrder(params) {
    return axios.post('/miniapp/pay/tickets/order/',params)
  }
}
