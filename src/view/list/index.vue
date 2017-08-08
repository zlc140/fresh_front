<template>
  <div class="content bgWhite">
    <div class="container">
      <cate-tem></cate-tem> 
      <pro-list @addFlew="addFlew"></pro-list>
    </div>
    <div class="flew"  ref="flew" v-show="flewMove"><img :src="flewPic"/></div>
  </div>
</template>

<script>
 
import cateTem from './cates'
import proList from './pro'
export default {
  data() {
    return {
      flewPic:'',
      flewMove:false,
      timer:null
    }
  },
  components:{
    cateTem,proList
  },
  mounted() {
     
   
  },
  methods: {
    addFlew(pic,event){
      this.flewMove = true
      let _this = this
      clearInterval(_this.timer)
      this.flewPic = pic
      let Width = document.body.clientWidth
      let X = parseInt(Width-event.clientX)
      let Y = parseInt(event.clientY)
      let changeX = parseInt((X - 30)/10)
      let changeY = parseInt((Y - 350)/10)
      this.$refs.flew.style.top = Y+'px'
      this.$refs.flew.style.right = X+'px'
      // 位置移动
     _this.pos(changeX,changeY,X,Y)
      
    },
    pos(changeX,changeY,X,Y){
          let [opa,goTop,_this,num] = [1,goTop,this,0]
          console.log(changeY)
          this.timer = setInterval(function(){
            if(changeY > 10){
                if(num < 4){
                  num++
                  Y -= changeY*1.3
                }else{
                  Y -= changeY*0.8
                }
            }else if(changeY < -10){ 
                if(num < 4){
                  num++
                  Y += changeY
                }else{
                  Y += -changeY*1.4　
                }
                
            }else {
                 if(num < 4){
                  num++
                  Y -= 60
                }else{
                  Y += 40
                }
            }
            if(X > changeX){
               X -= changeX
               opa = opa-0.08
             }else{
               opa = 0
               Y = 350
               num = 0
               this.flewMove = false
               clearInterval(_this.timer)
             }
            _this.$refs.flew.style.right = X+'px'
            _this.$refs.flew.style.top = Y+'px'
             _this.$refs.flew.style.opacity = opa
          },50)
    }
  }
}
</script>

<style >
  .flew{
     position: fixed;
     top: 0px;
     right:0px;
     width:25px;
     height: 25px;
     background-color: rgba(0,0,0,0.1);
     color: white;
     display: inline-block;
     padding: 5px;
     line-height: 0;
     border-radius: 50%;
     opacity: 0;
 }
 .flew img{
    width:90%;
    height: 90%;
    animation: rot 0.3s infinite;
    -webkit-animation: rot 0.3s infinite;
  }
 @keyframes rot{
  from{transform: rotate(0deg);}
  to{transform: rotate(540deg);}
 }
 @-webkit-keyframes  rot{
  from{-webkit-transform: rotate(0deg);}
  to{-webkit-transform: rotate(360deg);}
 }
  
</style>
