// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import tool from './config/tool'

import elementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// import 'element-ui/lib/index.js'
Vue.use(elementUI)

import '../static/css/bgPic.css'
// 提交
Vue.config.productionTip = false

// import Mock from './mock'
// Mock.bootstrap()

// 时间格式化
Vue.filter('formatDate',function(value) {
  if(value == 0 || value == '' || value =='undefined'){
    return null
  }
  return tool.formatDate.format((value),'yyyy-MM-dd')

})
// 价格（保留两位小数）
Vue.filter('currency',(value) => {
  value = parseFloat(value)
  if(value != '' && value != null && value != 'undefind' ){
    let price
     if(value == 0){
       price = '0.00'
     }else{
      price  = value.toFixed(2)
     }
    return '￥'+price
  }else{
    return '￥0.00'
  }
})
// 电话隐藏中间四位
Vue.filter('phone',(value) => {
   value = ''+value
  if(value != '' && value != null && value != 'undefind' ){
    let phone=''
      phone += value.substr(0,4)
      phone += '****'
      phone += value.substr(8,3)
    return phone
  }
})
// 代金券状态
Vue.filter('voucherType',function(value) {
  if(value=='VOUCHER_STATE_ON_CHECKING'){
    return '待审核'
  }else if(value=='VOUCHER_STATE_CHECK_ON'){
    return '审核通过'
  }else if(value=='VOUCHER_STATE_CHECK_OFF'){
    return '审核不通过'
  }else if(value='VOUCHER_STATE_OV_ERDUE'){
    return '代金券过期'
  }else if(value='VOUCHER_STATE_USED'){
    return '代金券已使用'
  }
}) 
// 订单状态
Vue.filter('filterState',(value)=>{
  value = parseInt(value)
  if(value==20){
      return '待发货'
  }else if(value==30){
      return '待收货'
  }else{
      return '已签收'
  }
})
// 账单状态
Vue.filter('filterBill',(value)=>{
  value = parseInt(value)
  if(value==0){
      return '未出账'
  }else if(value==100){
      return '未付款'
  }else if(value==200){
      return '已付款'
  }else if(value==300){
    return '账单关闭'
  }else if(value==400){
    return '账单完成'
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
