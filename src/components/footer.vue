<template>
      <div id="bottom" class="footer">
          <div id="bottom_banner">
              <div id="bottom_t">
                  <div id="bottom_t_one">
                      <p>预约配送</p>
                      <span>提前制定商品采购计划</span>
                  </div>
                  <div id="bottom_t_two">
                      <p>线上挂账</p>
                      <span>购买商品无须现结</span>
                  </div>
                  <div id="bottom_t_three">
                      <p>品质保证 </p>
                      <span>优选最专业的生鲜供应商</span>
                  </div>
                  <!-- <div id="bottom_t_four">
                      <p>品质保障</p>
                      <span>12项工序确保食材新鲜</span>
                  </div> -->
              </div>
              <div id="bottom_b">
                  <dl class="footer_dl" v-for="(item,index) in footBar" :key="index">
                      <dt>
                          {{item.title}}
                      </dt>
                      <dd v-for="(child,id) in item.lists" :key="id" >
                          <a :href="child.linkTo">{{child.title}}</a>
                      </dd>
                  </dl>
                  
              </div>
          </div>
      </div>
</template>

<script>
export default {
  data(){
    return{
      footBar:[
        {
          title:'购物指南',
          lists:[
            {title:'购物流程',linkTo:'/'},
            {title:'订单查询',linkTo:'/'},
            {title:'联系客服',linkTo:'/'}
          ]
        },
         {
          title:'支付方式',
          lists:[
            {title:'货到付款',linkTo:'/'},
            {title:'网上支付',linkTo:'/'},
            {title:'积分支付',linkTo:'/'},
             {title:'优惠券',linkTo:'/'}
          ]
        },
         {
          title:'配送方式',
          lists:[
            {title:'全程冷链',linkTo:'/'},
            {title:'运费标准',linkTo:'/'},
            {title:'配送范围',linkTo:'/'},
             {title:'配送时间',linkTo:'/'}
          ]
        },
         {
          title:'售后保障',
          lists:[
            {title:'退换货政策',linkTo:'/'},
            {title:'退换货流程',linkTo:'/'},
            {title:'常见问题',linkTo:'/'},
             {title:'投诉与建议',linkTo:'/'}
          ]
        },
         {
          title:'关于我们',
          lists:[
            {title:'公司介绍',linkTo:'/'},
            {title:'媒体报道',linkTo:'/'},
            {title:'联系我们',linkTo:'/'}
          ]
        }
      ]
    }
  }
}
</script>

<style>

.footer{
    width: 100%;
    height:380px;
    background-color:#EEF5EE; 
  }
#bottom{
    width: 100%;
    height: 376px;
    background-color: #eef5ee;
}
#bottom_banner{
    width: 1200px;
    margin: 0 auto;
    padding-top: 50px;
}
#bottom_banner #bottom_t{
    width: 1180px;
    padding-left:20px;
    height: 70px;
}
 
#bottom_banner #bottom_t div{
    width: 180px;
    padding-left: 70px;
    height: 70px;
    float: left;
    margin-left:206px;
}
#bottom_banner #bottom_t div:first-child{
    margin:0
}
#bottom_banner #bottom_t p{
    font-size: 20px;
    color: #303030;
    margin-top: 8px;
}
#bottom_banner #bottom_t span{
    font-size: 16px;
    color: #406f42;
}
#bottom_b{
    margin-top: 50px;
}
#bottom_b .footer_dl{
    float: left;
    text-align:center;
}
#bottom_b .footer_dl dt{
 font-size: 16px;
    color: #303030;
}
#bottom_b .footer_dl dt{
  padding-bottom: 10px;
}
#bottom_b .footer_dl dd{
   line-height: 25px;
}
#bottom_b .footer_dl{
  margin-left: 207px;
   }
#bottom_b .footer_dl:first-child{
  margin-left: 27px;
}
#bottom_b .footer_dl dd a{
    font-size: 12px;
    color: #484848;
}
</style>
