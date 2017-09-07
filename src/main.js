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
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
