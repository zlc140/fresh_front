import Vue from 'vue'
import Router from 'vue-router'

import main from '../components/main'
import {Login,Register,resetpassword,passSuccess,findback} from './component'
import {Index,Detail,List,Infor,addOrder,editOrder,addWeekTel,editWeekTel,shopCar,pay} from './component'
import {Address,Bill,Coupon,Information,Order} from './component'


Vue.use(Router)

const route = new Router({
  mode:'history',
  routes: [
    {  path:'',component:main,children:[
    {  path:'/',redirect:'/index'},
    {  path:'/user',redirect:'/user/infor',meta:{
      rightBar:true
    }},
    {  path: '/index', name: '首页', component: Index ,meta:{
      rightBar:true
    }},
    {  path:'/login', name:'登录', component:Login ,meta:{
      rightBar:false
    }},
    {  path:'/register', name:'注册', component:Register ,meta:{
      rightBar:false
    }},

    {  path:'/reset', name:'重置密码', component:resetpassword ,meta:{
      rightBar:false
    }},
    {  path:'/passok', name:'修改成功', component:passSuccess ,meta:{
      rightBar:false
    }},
    {  path:'/findback', name:'手机找回密码', component:findback ,meta:{
      rightBar:false
    }},
      
    {  path:'/detail', name:'详情', component:Detail,meta:{
      rightBar:true
    } },
    {  path:'/list', name:'列表', component:List ,meta:{
      rightBar:true
    }},
    {  path:'/shopCar', name:'购物车', component:shopCar ,meta:{
      rightBar:false
    }},
    {  path:'/pay', name:'账单结算', component:pay ,meta:{
      rightBar:true
    }},
    {  path:'/addOrder', name:'预订单', component:addOrder ,meta:{
      rightBar:false
    }},
    {  path:'/editOrder', name:'编辑预订单', component:editOrder ,meta:{
      rightBar:false
    }},
    {  path:'/addWeekTel', name:'周模板', component:addWeekTel ,meta:{
      rightBar:false
    }},
    {  path:'/editWeekTel', name:'编辑周模板', component:editWeekTel ,meta:{
      rightBar:false
    }},

    {  
        path:'/user', name:'个人中心', component:Infor,meta:{
      rightBar:true
    },
        children:[
          {path:'infor',name:'个人资料',component:Information },
          {path:'order',name:'我的订单',component:Order},
          {path:'coupon',name:'代金券',component:Coupon},
          {path:'address',name:'收货地址',component:Address},
          {path:'bill',name:'我的账单',component:Bill}
        ]
    
    }
    ]}
    
  ]
})
//通过afterEach做的页面名称的改变
route.afterEach(( to,from ) => {
   let titles = []
   let matched = to.name
  // title动态添加
  document.title = matched
  const decode = decodeURIComponent
  // 打印路由
  if(process.env.NODE_ENV === 'development'){
      console.info(`[路由日志] ${decode(from.path || '')} => ${decode(to.path)}`)
  }
  
})

export default route