<template>
  <div>
         <div id="register_banner">
        <!--已有账号马上登陆-->
        <div id="register_enter">
           已有账号 ， <router-link to="/login">马上登陆</router-link>
        </div>
        <!--会员注册-->
      <div id="register_member">
          <div id="register_member_t">
              <img :src="step" />
          </div>
          <div id="register_member_b">
                 <div class="findback_detail">
                    <i class="el-icon-check"></i>
                    <span class="findback_a">
                        <router-link to="/login">恭喜您，您已成为哈福生鲜会员，快去登录吧！</router-link>
                        （<span class="num">{{time}}</span>）秒后为你跳转到
                        <router-link to="/login"> 登录页 ...</router-link></span>
                </div>
          </div>
          <!--底部-->
          <div id="register_footer">
              <span>北京创新乐知信息技术有限公司 版权所有</span>
              <span class="interval">|</span>
              <span>江苏知之为计算机有限公司</span>
              <span class="interval">|</span>
              <span>江苏乐知网络技术有限公司</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import step3 from '@/assets/images/step3.png'
export default {
     data(){
       return {
            step:step3,
            time:5
       }
     },
     mounted(){
         this.times()
     },
     methods:{
        times() {
            var self = this;
            var timer = setInterval(function () {
                self.time--;
                if (self.time <= 0) {
                    clearInterval(timer);
                    self.$router.push('/login')
                }
            }, 1000)
        },
     }
}
</script>

<style>
  /*已有账号马上登陆*/
#register_banner{
    width: 1200px;
    margin: 0 auto;
}
.mgL300{
    margin-left: 300px;
}
#register_enter{
    width: 1200px;
    height: 40px;
    padding-top: 40px;
    text-align: right;
    font-size: 16px;
}
 
#register_enter a{
    font-size: 16px;
    color:  #6ca96e;
}
#register_enter a:hover{
    color: #6ca96e;
}
/*会员注册*/
#register_member_t{
    width: 1200px;
    height: 75px;
    position: relative;
    overflow: hidden;
}
.stepPic{
    width: 1200px;
    height: 75px;
    position: absolute;
    top: 0;
    left: 0;
}
 #register_member_b{
    background-color: #ffffff;
    padding-left: 50px;
    min-height: 500px;
    overflow: hidden;
    padding-top: 30px;
    padding-bottom: 50px;
    position: relative;
}
  .findback_detail{
      font-size: 20px;
      line-height: 100px;
  }
 .findback_detail .el-icon-check{
      color: #6CA96E;
  }
.findback_detail  .num{
      color:#6CA96E
  }
</style>
