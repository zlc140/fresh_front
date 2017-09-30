<template>
   
    <div class="container cart_box">
          <p class="my">我的购物车<span class="allSeltext"  v-if="!isNull">全选</span></p>
        <!--列表-->
        <div class="cart_list bigCar" v-if="!isNull">
          <el-table :data="lists"  ref="carList"   v-loading="listLoading"  @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection"  label="全选" width="55" >
            </el-table-column>
             <el-table-column  prop="goodsVoList" label="" width="120"  >
               <template scope="scope">
                   <a class="imgBox"><img :src="scope.row.goodsVoList[0].goods.goodsPic[0].path" /></a>
               </template>
             </el-table-column>
            <el-table-column  prop="goodsVoList" label="商品" min-width="300" >
                <template scope="scope">
                    <router-link :to="{path:'/detail',query:{id:scope.row.goodsVoList[0].goods.goodsId}}" >{{scope.row.goodsVoList[0].goods.goodsTitle}}</router-link>
                </template>
            </el-table-column>
            <el-table-column  prop="goodsVoList" label="价格" min-width="300" >
                <template scope="scope">
                    <span class="price">{{scope.row.goodsVoList[0].goods.price.GOODS_MARKET_PRICE | currency}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="goodsVoList" label="数量" width="180" >
               <template scope="scope">
                 <el-input-number  size="small" v-model="scope.row.goodsVoList[0].number" @change="handleChange(scope.row,scope.$index)" :min="1" ></el-input-number>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="80" >
                <template scope="scope">
                    <div class="delate">
                      <el-button type="text" size="small" @click="handleDel(scope.row,false)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-table :data="islose" class="loseList" ref="carList"  :show-header="false"   @selection-change="selsChange" style="width: 100%;">
            <el-table-column  width="55"> </el-table-column>
             <el-table-column  prop="goodsVoList" label="" width="120"  >
               <template scope="scope">
                   <a class="imgBox">
                     <img :src="scope.row.goodsVoList[0].goods.goodsPic[0].path" />
                     <span class="isLose"></span>
                     </a>
               </template>
             </el-table-column>
            <el-table-column  prop="goodsVoList" label="商品" min-width="300" >
                <template scope="scope">
                    <router-link :to="{path:'/detail',query:{id:scope.row.goodsVoList[0].goods.goodsId}}" >{{scope.row.goodsVoList[0].goods.goodsTitle}}</router-link>
                </template>
            </el-table-column>
            <el-table-column  prop="goodsVoList" label="价格" min-width="300" >
                <template scope="scope">
                    <span class="price">{{scope.row.goodsVoList[0].goods.price.GOODS_MARKET_PRICE | currency}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="goodsVoList" label="数量" width="180" >
               <template scope="scope">
                 <span  >{{scope.row.goodsVoList[0].number}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="80" >
                <template scope="scope">
                    <div class="delate">
                      <el-button type="text" size="small" @click="handleDel(scope.row,true)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
             
        </el-table>
        <el-col :span="24" class="tb-footer">
            <p class="price total">总价格：<span>{{total | currency}}</span></p>
            <el-button class="addOrder" @click="addOrder">加入预订单</el-button>
        </el-col>
        </div>
         <div class="nullCar" v-if="isNull">你的购物车为空，<router-link to="/index">赶快去战斗吧~</router-link></div>
    </div>
   
 
</template>

<script>
import axios from 'axios'
import {carList,delCar,editCar } from '@/service'
import { getStore } from '@/config/storage'
export default {
  data(){
    return{
      total:'0.00',
      listLoading:false,
      checked:false,
      selList:[],
      isNull: false
    }
  },
    mounted(){
      this.caculate()
  },
  computed:{
      lists(){
        // let lis = []
        // if(this.getList() && this.getList().length>0){
        //     lis = this.getList().filter( (u) => u.goodsVoList[0].islose )
        // }
          return this.getList()
      },
      islose(){
        return this.$store.state.shopCar.islose
      }
       
  },
  
  methods:{
    
     getList(){
       let _this =this
        this.listLoading = true
        // this.lists =await carList()
        if(this.$store.state.shopCar.lists.length == 0 && this.$store.state.shopCar.islose.length == 0 && getStore('username') != null){
          this.$store.dispatch('getShopCar').then((res) => {
            if(res == '403'){
              this.$message('登录失效，请重新登录！')
             _this.$store.dispatch('logout').then(() =>{
                     _this.$router.push('/login')
                })
            }
            console.log('e',res)
              this.listLoading = false
              this.isNull = res.length > 0?false:true
              return this.$store.state.shopCar.lists
          })
        }else{
          this.listLoading = false
          // this.isNull = this.$store.state.shopCar.lists.length > 0?false:true
          this.isNull = this.$store.state.shopCar.lists.length > 0?false:true
          return this.$store.state.shopCar.lists
        }
        
    },
    // 计算总价格
    caculate(){
      let _this = this
      this.total = 0
      if(this.selList.length>0){
        this.selList.forEach((item) =>{
          _this.total = parseFloat(_this.total)
          _this.total += item.goodsVoList[0].goods.price.GOODS_MARKET_PRICE*item.goodsVoList[0].number
          // _this.total =  _this.total.toFixed(2)
        })
      }
       
    },
    // 删除行
    handleDel(row,ck,index){
      let _this = this
      let prop = { cartIds : row.cartId }
       
            this.$confirm('您确认把该商品从购物车移除吗？').then(() =>{
              // 发送ajax
                  delCar(prop).then(res => {
                    if(res){
                      if(!ck){
                         prop.islose=false
                      }else{
                         prop.islose=true
                      }
                      console.log(prop)
                      _this.$store.dispatch('delCar',prop)
                      _this.getList()
                      _this.$message({type:'success',message:'移除成功'})
                    }
                  }) 
            }).catch(() =>{
                console.log('取消')
            })
        
    },
    // 选择事件
    selsChange(sel){
          this.selList = []
          this.selList = sel
          this.caculate()
    },
    // 数量改变事件
    handleChange(item,index){
      this.changeNum(item,index)
     
    },
    changeNum(item,ind){
      
       let prop = {
          cartId :item.cartId,
          goodsId :item.goodsVoList[0].goods.goodsId,
          count:item.goodsVoList[0].number,
        }
      
        let _this = this
        editCar(prop).then((res) => {
          
          if(res){
            _this.caculate()
          }
        })
    },
    // 加入预订单
    addOrder(){
       if(this.selList.length>0){
          let ids = []
          this.selList.forEach((res) => {
              ids.push(res.cartId)
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

<style lang="scss">
.loseList {
  a,span{
    color:#999;
  }
  
}
.cart_box .el-table__empty-block{
  display: none;
}
.txtCenter{
  text-align: center;
}
 .bigCar{
   .delate span:hover{
        color:green;
  }
 .imgBox{
    display: block;
    width: 100px;
    margin: 10px 0;
    height: 100px;
    overflow: hidden;
    position: relative;
    img{
      width: 100px;
      margin-top: 50%;
      transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      
    }
    .isLose{
      position: absolute;
      width:100%;
      height:100%;
      top: 0;
      left: 0;
      background-color: rgba(0,0,0,0.3);
    }
 }
 }
 .txtLeft{
   text-align: left;
 }
  .bigCar table  {
      tr a{
        font-size: 16px;
        float: left;
        text-align: left;
        
      } 
      tr span{
        font-size: 16px;
      }
      th{
        font-size: 18px;
      }

  }
</style>
