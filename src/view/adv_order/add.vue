<template>
  <div class="container">
    <div class="cart_box order" :class="moreShow?'more':''" v-if="$route.query.ids">
     <el-table :data="shopList" ref="carList"   v-loading="listLoading"  style="width: 100%;" >
             <el-table-column  prop="goodsVoList" label="" width="90"  label="商品" >
               <template scope="scope">
                   <a class="imgBox"><img  /></a>
               </template>
             </el-table-column>
            <el-table-column  prop="goodsVoList" min-width="300" >
                <template scope="scope">
                    <router-link class="fl title" :to="{path:'/detail',query:{id:scope.row.goodsVoList[0].goods.goodsId}}" >{{scope.row.goodsVoList[0].goods.goodsTitle}}</router-link>
                </template>
            </el-table-column>
            <el-table-column  prop="goodsVoList" label="单价" width="120" >
                <template scope="scope">
                    <span class="price">{{scope.row.goodsVoList[0].goods.price.GOODS_MARKET_PRICE | currency}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="goodsVoList" label="数量" width="80" >
              <template scope="scope">
                <span>{{scope.row.goodsVoList[0].number}}</span>
              </template>
            </el-table-column>
            <el-table-column label="小计" width="120" >
                <template scope="scope">
                    <div  class="price">
                      {{scope.row.goodsVoList[0].number*scope.row.goodsVoList[0].goods.price.GOODS_MARKET_PRICE | currency}}
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
     <div class="cart_box order" :class="moreShow?'more':''" v-if="$route.query.id">
        <el-table :data="shopList" ref="carList"   v-loading="listLoading"  style="width: 100%;" >
              <el-table-column  prop="" label="" width="90"  label="商品" >
                <template scope="scope">
                    <a class="imgBox"><img  /></a>
                </template>
              </el-table-column>
              <el-table-column  prop="goodsTitle" min-width="300" >
                  <template scope="scope">
                      <router-link class="fl title" :to="{path:'/detail',query:{id:scope.row.goodsId}}" >{{scope.row.goodsTitle}}</router-link>
                  </template>
              </el-table-column>
              <el-table-column  prop="price" label="单价" width="120" >
                  <template scope="scope">
                      <span class="price">{{scope.row.price.GOODS_MARKET_PRICE | currency}}</span>
                  </template>
              </el-table-column>
              <el-table-column prop="number" label="数量" width="80" >
                <template scope="scope">
                  <span>{{scope.row.number}}</span>
                </template>
              </el-table-column>
              <el-table-column label="小计" width="120" >
                  <template scope="scope">
                      <div  class="price">
                        {{scope.row.number*scope.row.price.GOODS_MARKET_PRICE | currency}}
                      </div>
                  </template>
              </el-table-column>
          </el-table>
    </div>
     <div class="null" v-if="shopList.length<1" style="height:100px;line-height:100px;">您还没有选择商品<router-link to="list">快去挑选吧~</router-link></div> 
    <div class="more_box" :class="moreShow?'addB':''" v-if="lists.length>1">
      <el-button type="text" @click="showMore">{{moreShow?'收起 ︽':'查看更多︾'}}</el-button>
      </div>
     <full-calendar class="test-fc" :events="fcEvents" 
      first-day='1' locale="zh"  checkMore="true"
      @changeMonth="changeMonth"
      @eventClick="eventClick"
      @dayClick="dayClick"
      @moreClick="moreClick">
        <!-- <template slot="fc-event-card" scope="p">
            <p><i class="fa"></i> {{ p.event.title }} test</p>
        </template> -->
    </full-calendar> 
    <div class="btn_box">
      <a class="btn" @click="addOrder">添加</a>
      <router-link class="btn bgBtn" to="/shopCar">返回</router-link>
    </div>
  </div>
</template>

<script>

import fullCalendar from '@/components/calendar'
import {carList,saveDayOrder,goodsDetail } from '@/service'
import { getStore } from '@/config/storage'
 
export default {
  data(){
      return{
        moreShow:false,
        name:'生鲜日历',
        fcEvents:[],
        listLoading:false,
        checked:false,
        selDay:[],
        shopList:[]
      }
    },
    components:{
      fullCalendar
    },
    computed:{
      lists(){
        let list = []
        if( this.$route.query.ids && this.getList()){
            
           this.getList().forEach((item) => {
            if(this.$route.query.ids && this.$route.query.ids.indexOf(item.cartId) > -1){
                list.push(item)
                this.shopList = list
              }
            })
            
         }else if(this.$route.query.id){
              this.getOne()
         }
        
         return list
      }
    },
    mounted(){
        
    },
    methods:{
      async getOne(){
        console.log(0)
        let _this = this
          let para = {
            goodsId:this.$route.query.id
          }
          let content = await goodsDetail(para)
          let num = this.$route.query.num
          let good ={
                goodsId:content.goodsId,
                goodsTitle:content.goodsTitle,
                price:content.price,
                goodsPic:'',
                number:num?num:1
            }
            _this.shopList = []
            _this.shopList.push(good)
           console.log('text',_this.shopList)
            // return good
           
      },
      getList(){
        this.listLoading = true
        // this.lists =await carList()
        if(this.$store.state.shopCar.lists.length == 0 && getStore('username') != null){
         this.$store.dispatch('getShopCar').then((res) => {
              this.listLoading = false
              return this.$store.state.shopCar.lists
          })
        }else{
          this.listLoading = false
          return this.$store.state.shopCar.lists
        }
        
      },
      showMore(){
        this.moreShow = !this.moreShow
        // console.log(this.moreShow)
      },
        changeMonth (start, end, current) {
          // console.log('changeMonth', start.format(), end.format(), current.format())
        },
        eventClick (event, jsEvent, pos) {
          //  console.log('eventClick', event, jsEvent, pos)
        },
        dayClick (day, jsEvent) {
          this.selDay = day
          // console.log('dayClick', day)
        },
        moreClick (day, events, jsEvent) {
          // console.log('moreCLick', day, events, jsEvent)
        },
        addOrder(){
          if(this.selDay.length < 1){
            this.$message('请选择预订日期')
              return false
          }
           let para = {
              goodsId:'',
              count:'',
              deliverTime:this.selDay,
              memberId:'M20170814170704005'
            }
            let _this = this
          this.lists.forEach( (v,index) => {
             if(index == _this.lists.length-1){
                para.goodsId = para.goodsId+v.goodsVoList[0].goods.goodsId
                para.count =para.count + v.goodsVoList[0].number
             }else{
                para.goodsId = para.goodsId+v.goodsVoList[0].goods.goodsId+','
                para.count =para.count + v.goodsVoList[0].number+','
             }
          })
          // para.goodsId = para.goodsId.Substring(0,para.goodsId.length-1)
          // para.count =para.count.Substring(0,para.count.length-1)
          para.deliverTime = para.deliverTime.join(',')
          console.log(para)
          saveDayOrder(para).then((res) => {
            if(res.data.state == 200) {
                this.$router.push('/editOrder')
            }
            console.log(res.data)
          })
          
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/chang.scss';
.order{
  .el-table{
    overflow: visible;
  }
  width: 100%;
   .el-table__body-wrapper{
     height: 87px;
     border: 1px solid $baseColor;
     overflow: hidden;
   }
   .el-table td, .el-table th.is-leaf{
     border-color: $baseColor;
   }
.imgBox{
    display: block;
    width: 80px;
    margin: 3px 0;
    height: 80px;
    overflow: hidden;
    img{
      max-width: 60px;
      margin-top: 50%;
      transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      
    }
 }
 .price{
   color:#f58500;
 }
th{
  font-size: 18px;
  height: 50px;
}
 a.title{
   white-space: nowrap;
   overflow: hidden;
   display: inline-block;
   width:100%;
   text-overflow: ellipsis;
   text-align: left;
   font-size: 14px;
 }
 }
 .order.more{
   .el-table__body-wrapper{
     height: auto;
    }
  .el-table td, .el-table th.is-leaf{
     border-color:transparent;
   }
  
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
 .addB{
   border-top: 1px solid $baseColor;
 }
.btn_box{
  text-align: right;
  margin: 30px 0 50px;
}
  .btn{
    display: inline-block;
    font-size: 18px;
    color:$baseColor;
    height: 45px;
    line-height: 45px;
    width:180px;
    border: 2px solid $baseColor;
    text-align: center;
    margin: 0 10px;

  }
  .btn.bgBtn{
    background-color: $baseColor;
    color: white;
  }
</style>
