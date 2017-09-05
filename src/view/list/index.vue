<template>
  <div class="content bgWhite">
    <bread-rumb :breadname="breadname"></bread-rumb>
    <div class="container">
      <cate-tem @getName="getName"></cate-tem> 
      <pro-list @addFlew="addFlew"></pro-list>
    </div>
    <div class="flew"   ref="flew" v-show="flewMove"><img :src="flewPic"/></div>
  </div>
</template>

<script>
 
import cateTem from './cates'
import proList from './pro'
import breadRumb from '@/components/breadrumb'
export default {
  data() {
    return {
      flewPic:'',
      flewMove:false,
      timer:null,
      breadname:''
    }
  },
  components:{
    cateTem,proList,breadRumb
  },
  mounted() {
     if(this.$route.query.name){
       this.breadname = this.$route.query.name
     }
  },
  watch:{
    '$route'(to,from){
      if(to.query.name && to.query != from.query){
        this.breadname = to.query.name
      }
       
    }
  },
  methods: {
    getName(name){
      this.breadname = name
    },
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
 