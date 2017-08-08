<template>
   
    <div class="cart_box">
          <p class="top">
            <el-checkbox @change="toggleSel(lists)"  v-model="checked">{{checked?'取消':'全选'}}</el-checkbox>
               <router-link to="/shopCar">全屏查看</router-link></p>
        <!--列表-->
        <div class="cart_list" >
            <el-table :data="lists" ref="carList"  :show-header="false"  v-loading="listLoading"  @selection-change="selsChange" style="width: 100%;">
                <el-table-column type="selection" label="全选" width="30">
                </el-table-column>
             <el-table-column  prop="goodsPic" label="" width="60"  >
               <template scope="scope">
                   <a class="imgBox"><img :src="scope.row.goodsPic" /></a>
               </template>
             </el-table-column>
            <el-table-column  prop="goodsTitle" label="" width="190" >
                <template scope="scope">
                    <router-link :to="{path:'/detail',query:{id:scope.row.id}}" class="pro_title" >{{scope.row.goodsTitle}}</router-link>
                    <span class="price fl">{{scope.row.price.GOODS_COST_PRICE | currency}}</span>
                    <el-input-number size="small" v-model="scope.row.num" @change="handleChange(scope.row)" :min="1" :max="10" class="fr mgR10"></el-input-number>
                </template>
            </el-table-column>
        </el-table>
        
        </div>
        <div class="car_footer">
          <p>已选<span>{{num}}</span>件<span class="price fr">￥{{total}}</span></p>
          <el-button @click="addOrder">加入预订单</el-button>
        </div>
    </div>
 
</template>

<script>
import {carList} from '@/service'
import { getStore } from '@/config/storage'
export default {
  data(){
    return{
      total:'0.00',
      num:0,
      listLoading:false,
      checked:false,
      selList:[]
    }
  },
  computed:{
      
  },
  mounted(){
    this.caculate()
    // console.log(this.lists)
  },
 computed:{
      lists(){
          return this.getList()
      }
  },
  methods:{
     getList(){
        this.listLoading = true
        // this.lists =await carList()
        if(this.$store.state.shopCar.length == 0 ){
          this.$store.dispatch('getShopCar').then((res) => {
              this.listLoading = false
              return this.$store.state.shopCar.lists
          })
        }else{
              this.listLoading = false
              return this.$store.state.shopCar.lists
        }
        
    },
    // 计算总价格
    caculate(){
      let _this = this
      this.total = '0.00'
      this.num = 0
      if(this.selList.length>0){
        this.selList.forEach((item) =>{
          _this.total = parseFloat(_this.total)
          _this.total += item.price.GOODS_COST_PRICE*item.num
          _this.total =  _this.total.toFixed(2)
          _this.num +=  item.num
        })
      }
       
    },
    // 删除行
    handleDel(){

    },
    // 选择事件
    selsChange(sel){
          this.selList = sel
          if(this.selList.length == this.lists.length){
            this.checked = true
          }else{
            this.checked = false
          }
          this.caculate()
    },
    toggleSel(rows){
      let _this = this
      if(_this.checked == true){
          rows.forEach((ele) => {
            _this.$refs.carList.toggleRowSelection(ele,true)
          })
      }else{
        _this.$refs.carList.clearSelection()
      }
    },
    // 数量改变
    handleChange(val){
          this.$nextTick(function(){
          this.caculate()
      })
    },
    addOrder(){
      
      if(this.selList.length>0){
          let ids = []
          this.selList.forEach((res) => {
              ids.push(res.goodsId)
          })
          this.$router.push({
            path:'/addOrder',
            query:{ ids:ids }
          })
       }else{
         this.$message('请选择商品')
       }
    }
  
  }
}
</script>

<style lang="scss" >
@import '../assets/chang.scss';
// .txtCenter{
//   text-align: center;
// }
 .right_nav{
    .el-table-column--selection .cell{
     padding:5px 3px ;
    }
    .el-table .cell, .el-table th>div{
        padding-left: 3px ;
        padding-right: 3px;
        padding:5px 3px ;
    }
      .el-input-number--small .el-input__inner{
     width:70px;
     height: 25px;
     padding: 0 20px;
     border-color:#EAEAEA;
 }
   .el-input-number--small{
     width:70px;
 }
 .cart_box .el-table__header-wrapper{
   margin-bottom: 0;
 }
   .el-input-number--small .el-input-number__decrease{
     width:20px;
     height:25px; 
     font-size: 10px;
     line-height: 25px;
     right:50px;
     background-color: #EAEAEA; 
     color:#666;
      border-color:#ddd;
 }
   .el-input-number--small .el-input-number__increase{
    width:20px;height:25px;
    font-size: 10px;
    line-height: 25px;
    background-color: #EAEAEA;
    border-color:#ddd; 
    color:#666;
 }
 .pro_title{
   display: inline-block;
   width: 180px;
   overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
 }
 .cart_box{
   height: 100%;
   width:100%;
   position: relative;
   .top{
     padding: 3px 0;
     width:100%;
     background-color: #E6E6E6;
     color: #808080;
     font-size: 14px;
     position: absolute;
     top: 0;
     z-index: 998;
     a{
       float: right;
       margin-right: 5px;
       color: #808080;
     }
     span{
       margin-left: 5px;
     }
   }
   .cart_list{
     position: absolute;
     top: 30px;
     bottom: 80px;
     width:100%;
     overflow-y: auto;
     overflow-x: hidden;
   }
    table  {
    tr a{
      font-size: 12px;
      float: left;
      text-align: left;
      
    } 
    th{
      font-size: 14px;
    }
}
 }
 .car_footer{
   font-size: 14px;
   position: absolute;
   text-align: center;
   bottom: 0;
   height: 80px;
   overflow: hidden;
   background-color:  #E6E6E6;
   width: 100%;
   p{
     padding: 0 24px;
     color: #808080;
     text-align: left;
   }
   .el-button{
     padding: 8px 75px;
     font-size: 14px;
     letter-spacing: 3px;
     background-color: $baseColor;
     color: white;
   }
 }
 } 


 .imgBox{
    display: block;
    width: 50px;
    margin: 3px 0;
    height: 50px;
    overflow: hidden;
    img{
      width: 50px;
      
    }
 }
 .txtLeft{
   text-align: left;
 }
</style>
