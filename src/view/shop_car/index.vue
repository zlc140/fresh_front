<template>
   
    <div class="container cart_box">
          <p class="my">我的购物车<span class="allSeltext"  v-if="!isNull">全选</span></p>
        <!--列表-->
        <div class="cart_list bigCar" v-if="!isNull">
            <el-table :data="lists" ref="carList"   v-loading="listLoading"  @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" label="全选" width="55">
            </el-table-column>
             <el-table-column  prop="goodsPic" label="" width="120"  >
               <template scope="scope">
                   <a class="imgBox"><img :src="scope.row.goodsPic" /></a>
               </template>
             </el-table-column>
            <el-table-column  prop="goodsTitle" label="商品" min-width="300" >
                <template scope="scope">
                    <router-link :to="{path:'/detail',query:{id:scope.row.id}}" >{{scope.row.goodsTitle}}</router-link>
                </template>
            </el-table-column>
            <el-table-column  prop="price" label="价格" min-width="300" >
                <template scope="scope">
                    <span class="price">{{scope.row.price.GOODS_COST_PRICE | currency}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="num" label="数量" width="180" >
               <template scope="scope">
                 <el-input-number size="small" v-model="scope.row.num" @change="handleChange(scope.row)" :min="1" :max="10"></el-input-number>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="80" >
                <template scope="scope">
                    <div class="delate">
                      <el-button type="text" size="small" @click="handleDel(scope.row)">删除</el-button>
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
import {carList,delCar } from '@/service'
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
          return this.getList()
      }
       
  },
  
  methods:{
     getList(){
        this.listLoading = true
        // this.lists =await carList()
        if(this.$store.state.shopCar.lists.length == 0 && getStore('username') != null){
          this.$store.dispatch('getShopCar').then((res) => {
            console.log(this.$store.state.shopCar.lists)
              this.listLoading = false
              this.isNull = this.$store.state.shopCar.lists.length > 1?false:true
              return this.$store.state.shopCar.lists
          })
        }else{
          this.listLoading = false
          this.isNull = this.$store.state.shopCar.lists.length > 1?false:true
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
          _this.total += item.price.GOODS_COST_PRICE*item.num
          // _this.total =  _this.total.toFixed(2)
        })
      }
       
    },
    // 删除行
    handleDel(row,index){
        this.$confirm('您确认把该商品从购物车移除吗？').then(() =>{
          // 发送ajax
          console.log(row)
          let prop = {id:row.goodsId}
           this.$store.dispatch('delCar',prop)

          this.$message({type:'success',message:'移除成功'})
        }).catch(() =>{
          
        })
    },
    // 选择事件
    selsChange(sel){
          this.selList = sel
          this.caculate()
    },
    // 数量改变事件
    handleChange(){
      this.$nextTick(function(){
          this.caculate()
      })
    },
    // 加入预订单
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

<style lang="scss">
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
    img{
      width: 100px;
      margin-top: 50%;
      transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      
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
