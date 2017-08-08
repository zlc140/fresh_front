// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import elementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/index.js'

import '../static/css/bgPic.css'

Vue.config.productionTip = false

Vue.use(elementUI)

import Mock from './mock'
Mock.bootstrap()

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
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
