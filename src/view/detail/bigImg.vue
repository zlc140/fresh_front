<template>
  <div class="detail_box">
    <div class="mid" ref="midBox" @mouseenter="enter($event)" @mouseout.stop="leave($event)" @mousemove="changMouse">
        <img :src="mid_url" />
        <div class="hoverBox" ref="hoverBox" @mouseenter="enter($event)" @mousemove="changMouse" v-show="hoverShow"></div>
    </div>
    <div class="big_box"  v-show="hoverShow"><img :src="mid_url" ref="bigImg"/></div>
    <div class="small_box" v-if="imgs.length>1">
        <div class="img_view">
        <ul :style="Width" ref="movebox" >
            <li v-for="(item,index) in imgs" :key="index" >
                <!-- :class="item.sel?'bod':''" -->
                <img :src="item.path"  @mousemove="changImg(item.path)" />
            </li>
        </ul>
        </div>
        <button class="left direction el-icon-arrow-left "  :class="left_disable?'diss':''" @click="pre">  </button>
        <button class="right direction el-icon-arrow-right " :class="right_disable?'diss':''" @click="next"></button>
    </div>
  </div>
</template>

<script>
 
export default {
     props:{
        imgs:{
            type:Array,
            default:[
                
            ]
        }
     },
    data() {
        return {
            mid_url:'',
            fix_url:'',
            // 小图
            Width:'',
            isMOvePre:true,
            isMOveNext:true,
            moveNum:0,
            // 中图
            hoverShow:false,
            hover_Box:{
                left:0,
                top:0
            },
            left_disable:true,
            right_disable:false
        


        }
    },
    mounted(){
        // console.log('sss',this.imgs)
        this.mid_url = this.imgs[0].path
        // console.log(this.mid_url)
        this.Width = {
            'width':this.imgs.length*90+'px'
             
        }
        this.mid_url = this.imgs[0].path
        if(this.imgs.length < 4){
            this.left_disable=true
            this.right_disable=true
        }
    },
    methods:{

        // 小图
        changImg(value) {
            this.mid_url = value
        },
        pre(){
            if(this.imgs.length > 4 ){
               if(this.moveNum!=0 ){
                  this.right_disable = false
                  this.moveNum--
                   this.$refs.movebox.style.left = -90*this.moveNum +'px'
                   if(this.moveNum == 0){
                        this.left_disable=true
                   }
               } else{
                   this.left_disable=true
               }
            }
        },
        next(){
             if(this.imgs.length > 4 ){
              if(this.moveNum < this.imgs.length-4  ){
                   this.left_disable = false
                    this.moveNum++
                   this.$refs.movebox.style.left = -90*this.moveNum +'px'
                   if(this.moveNum == this.imgs.length-4){
                       this.right_disable = true
                   }
               }else{
                  this.right_disable = true
               }
            }
        },
        // 中图
        enter(event){
            this.hoverShow = true
              let pos = this.$refs.midBox.getBoundingClientRect()
             
              this.hover_Box.left = pos.left
              this.hover_Box.top = pos.top
        },
        leave(event){
             this.hoverShow = false
        },
        changMouse(event){
            //   计算hover时方块的位置
            let startLeft = event.clientX- this.hover_Box.left-100
            let startTop = event.clientY-  this.hover_Box.top-100
            startLeft = Math.max(0,startLeft)
            startLeft = Math.min(200,startLeft)
            startTop = Math.max(0,startTop)
            startTop = Math.min(200,startTop)

            this.$refs.hoverBox.style.left = startLeft+'px'
            this.$refs.hoverBox.style.top = startTop+'px'

            // 计算大图的位置
            startLeft = Math.min(400,startLeft*2)
            startTop = Math.min(400,startTop*2)
            this.$refs.bigImg.style.left = -startLeft+'px'
             this.$refs.bigImg.style.top = -startTop+'px'
        }
    }
}
</script>

<style lang="scss" >
    .detail_box{
        width:400px;
        height: 500px;
        position: relative;
        .big_box{
            position: absolute;
            z-index: 999;
            left:430px;
            top: 0;
            width:400px;
            height:400px;
            overflow: hidden;
            background-color: white;
            img{
                width: 200%;
                height:200%;
                position: absolute;
                top: 0;
                left:0;
            }
        }
     .mid{
        width:400px;
        height: 400px;
        background-color: white;
        border:1px solid #f0f0f0;
        position: relative;
        .hoverBox{
            top: 0px;
            left: 0px;
            position: absolute;
            width:200px;
            z-index: 888;
            background-color: rgba(0, 0,0, 0.3);
            height:200px;
            cursor: move;
        }
        img{
            width:100%;
            height:100%;
            cursor: pointer;
        } 
     }
     .small_box{
         width:350px;
         height: 90px;
         padding:5px 25px;
         margin-top: 10px;
         position: relative;
         background-color: white;
         overflow: hidden;
         .img_view{
             width:350px;
             height:90px;
             overflow: hidden;
              position: relative;
         }
         ul{
             position: absolute;
             left: 0;
             top:0px;
             margin: 0;
             padding:0;
             height: 90px;
             width:auto;
             transition: all 0.5s;
             
             li{
                 display: inline-block;
                 width:90px;
                 height:90px;
                 float: left;
                 img{
                     width: 85px;
                     height:85px;
                     &:hover{
                         border:1px solid #6CA96E;
                     }
                 }
                 .bod{
                     border:1px solid #aaa;
                 }
                 
             }
         }
         .direction{
             position: absolute;
             top:0 ;
             display: inline-block;
             width:20px;
             height:100px;
             cursor: pointer;
             font-size:20px;
             color:#888;
             border: none;
             background-color: #fff;
             line-height: 100px;
             
         }
         .left{
             left:0px;
         }
         .right{
             right:0;
         }
         .diss{
             color:#f0f0f0 ;
             cursor: default;
         }
     }
    }
</style>

