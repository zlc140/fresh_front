<template>
  <el-col :span="24" class="content">
        
        <head-bar></head-bar>
        <el-col :span="24" class="main" @click="closeNav">
            <router-view></router-view>
        </el-col> 
        <el-col :span="24">
            <foot-bar></foot-bar>
        </el-col>
        <right-nav v-if="rightShow" :closeN = 'closeN'></right-nav>
  </el-col>
</template>

<script>
import footBar from './footer'
import headBar from './head'
import rightNav from './r_nav'

export default {
    data(){
        return{
          rightShow:true,
          closeBox:false,
          closeN:false
        }
    },
    components:{
        footBar,headBar,rightNav 
    },
    created(){
       this.checkRoute(this.$route)
    },
    watch:{
        '$route' (to,from) {
          
          this.checkRoute(to)
        }
    },
    methods:{
      checkRoute(to){
         if(to.meta.rightBar == false){
            this.rightShow = false
         }else{
           this.rightShow = true
         }
      },
      closeNav(){
        this.closeN = true
      }
      
    }
}
</script>

<style lang="scss">
 
 @import '../assets/chang.scss';

// 分页
 .pagination_box{
     padding: 10px 0 30px;
     text-align: center;
 }
 .el-pagination .btn-next .el-icon, .el-pagination .btn-prev .el-icon{
     font-size: 16px;
 }
 .el-pagination button, .el-pagination span{
     font-size: 14px;
 }
 .el-pagination--small .btn-next, .el-pagination--small .btn-prev, .el-pagination--small .el-pager li, .el-pagination--small .el-pager li:last-child{
     font-size: 18px;
     min-width: 30px;
 }
 .el-pager li.active{
     border-color: white;
     background-color: #fff;
     color:#6CA96E;
 }
 .el-pager li:hover{
      color:#6CA96E;
 }
 
  .main{
  width:100%;
  min-height:calc(100% - 564px); 
}
.more_box{
  
   text-align: right;
   background-color: white;
   padding: 20px 30px;
   border: 1px solid white;
   .el-button--text{
     color: #888;
     }
 
}
.checkBox.el-input{
        width:180px;
}
.checkBox .el-input__inner{
    text-align: center;
}
.el-checkbox__input.is-checked .el-checkbox__inner{
    background-color: rgb(108,169,110);
    border-color: rgb(108,169,110);
}
.el-checkbox__inner:hover{
    border-color: rgb(108,169,110);
}
.el-checkbox__input.is-focus .el-checkbox__inner{
        border-color: rgb(108,169,110);
}
.el-message-box .el-button:focus, .el-message-box .el-button:hover{
   color: $baseColor ;
  border-color: $baseColor ;
}
.el-message-box .el-button--primary.el-button{
  background-color: $baseColor ;
  border-color: $baseColor ;
  color:white ;
}

.section{
  flex-grow: 1;  
  -webkit-flex-grow: 1;
  -ms-flex-grow: 1;
  width:100% ;
  
  overflow: hidden;
  overflow-y:auto;
  
}
.section>div{
    background-color: #ccc;
}
.aside{
  max-width:230px;
}
.cart_box{
   font-size: 16px;
   .tb-footer{
        text-align: right;
        padding: 30px 60px 30px 0px;
   }
   .total{
       font-size: 22px;
   }
   .addOrder{
     margin-top: 20px;
      background-color: #6CA96E;
      color: white;
      font-size: 18px;
      letter-spacing: 2px;
   }
   .my{
    font-size: 20px;
    line-height: 60px;
    position: relative;
  .allSeltext{
    position: absolute;
    bottom: -53px;
    z-index: 888;
    left:45px;
    font-size: 14px;
  }
   }
   .el-input-number--small{
     width:100px;
    
   }
   .el-button--text{
      color:#1f2d3d;
   }
   .el-input-number--small .el-input__inner{
     padding: 0 35px;
     text-align: center;
     width:100px;
     border-color:  #EAEAEA;
   }
   .el-input__inner:focus{
     border-color: #EAEAEA;
   }
   .el-input-number--small .el-input-number__decrease{
     right: 70px;
    //  border-right:  #bfcbd9 solid 1px ;
     border-left: none;
     
   }
   .el-input-number__decrease:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled), .el-input-number__increase:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled){
      border-color: #EAEAEA;
   }
   .el-input-number__decrease, .el-input-number__increase{
        background-color:  #EAEAEA;
        border-color: #EAEAEA;
        color:#666;
   }
 
   .el-table{
     border: none;
     background-color: transparent;
   }
   .el-table__header-wrapper{
     margin-bottom: 25px;
   }
   .el-table__footer-wrapper thead div, .el-table__header-wrapper thead div{
     background-color: white;
   }
   .el-table th{
     background-color: white;
     border:none;
   }
   .el-table::after, .el-table::before{
     background-color:white;
   }
   .el-button--small{
     font-size: 16px;
   }
  //  .el-table .cell{
  //    text-align: center;
  //  }
 
 }
// dislog弹出框
 .el-dialog__header{
  background-color: $baseColor;
  padding: 14px 20px 8px;
}
.dialog-footer{
  text-align: center;
}
.dialog-footer .el-button--success{
  background-color: $baseColor;
  letter-spacing: 2px;
  border-color: $baseColor;
  border-radius: 0;
  padding: 10px 30px;
}
.el-dialog__header .el-dialog__headerbtn{
  width:25px;
  height: 25px;
  background-color: white;
  border-radius: 50%;
  margin-top: -30px;
  margin-right: -30px;

}
.el-dialog__header .el-dialog__title{
  color: white;
}
.el-form-item__label{
  color: #959595;
}
.el-input .el-input__inner{
  border-color:#c5c5c5 !important;
  border-radius: 0 !important;
}
.el-input  .el-dialog__body{
  padding: 20px 70px;
}
  /*找回密码  */
 .findback{
   width: 1200px;
   height: 790px;
   margin: 80px auto;
}
.findback_top{
  width: 1180px;
  height: 64px;
  color: #fff;
  line-height: 64px;
  font-size: 18px;
  padding-left: 20px;
  background-color: #6ca96e;
  border-radius: 15px 15px 0 0;
}
.findback_detail{
  width: 1200px;
  height: 500px;
  padding-top: 70px;
  background-color: #fff;
}
.findback_footer{
    height: 500px;
    text-align: center;
    color: #bababa;
    margin-top: 130px;
}
// 列表为空时一个有图一个没图
.nullCar{
    width: 100%;
    height: 400px;
    line-height: 550px;
    text-align: center;
    font-size: 16px;
    margin-bottom: 30px;
    color: #888;
     a{
       color:$baseColor;
       &:hover{
         color:red;
       }
     }
    
  }
.null{
   width: 100%;
    height: 400px;
    line-height: 550px;
    text-align: center;
    font-size: 16px;
    margin-bottom: 30px;
    color: #888;
     a{
       color:$baseColor;
       &:hover{
         color:red;
       }
     }
}
// 加入购物车的动画
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

//  滚动条
div{
    ::-webkit-scrollbar {
        width: 4px;
        height:8px;
    }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgb(139, 186, 142);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    }
}
.greens{
    color:green !important;
}
.reds{
    color:red !important;
}
</style>
