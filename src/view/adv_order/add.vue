<template>
  <div class="container">
    <div class="cart_box order" :class="moreShow?'more':''">
     <el-table :data="lists" ref="carList"   v-loading="listLoading"  style="width: 100%;" v-if="lists.length>0">
             <el-table-column  prop="goodsPic" label="" width="90"  label="商品" >
               <template scope="scope">
                   <a class="imgBox"><img :src="scope.row.goodsPic" /></a>
               </template>
             </el-table-column>
            <el-table-column  prop="goodsTitle" min-width="300" >
                <template scope="scope">
                    <router-link class="fl title" :to="{path:'/detail',query:{id:scope.row.id}}" >{{scope.row.goodsTitle}}</router-link>
                </template>
            </el-table-column>
            <el-table-column  prop="price" label="单价" width="120" >
                <template scope="scope">
                    <span class="price">{{scope.row.price.GOODS_COST_PRICE | currency}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="num" label="数量" width="80" >
            </el-table-column>
            <el-table-column label="小计" width="120" >
                <template scope="scope">
                    <div  class="price">
                      {{scope.row.num*scope.row.price.GOODS_COST_PRICE | currency}}
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="null" v-if="lists.length<1">您还没有选择商品</div>
    </div>
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
import {carList} from '@/service'
import { getStore } from '@/config/storage'
let demoEvents = [
    {
      title    : 'Sunny 725-727',
      start    : '1499443200000',
      end      : '',
      cssClass : 'family'
    },
    {
      title    : 'Lun 725-727',
      start    : '1499443200000',
      end      : '',
      cssClass : 'family2'
    },
     {
      title    : 'Lun 725-727',
      start    : '2017-07-09',
      end      : '',
      cssClass : 'family2'
    }
    
  ];
export default {
  data(){
      return{
        moreShow:false,
        name:'Sunny!',
        fcEvents:demoEvents,
        listLoading:false,
        checked:false,
        selDay:[]
      }
    },
    components:{
      fullCalendar
    },
    computed:{
      lists(){
        let list = []
         if(this.getList()){
           this.getList().forEach((item) => {
            if(this.$route.query.ids && this.$route.query.ids.indexOf(item.goodsId) > -1){
                list.push(item)
              }
            })
         }
        
        return list
      }
    },
    mounted(){
       
          
    },
    methods:{
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
          console.log(this.selDay)
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
