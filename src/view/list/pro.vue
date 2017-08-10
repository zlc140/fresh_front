<template>
   <div class="content">
       <div class="productlist_list cl" v-if="isNull">
         <div class="list_one" v-for="(item,id) in goods.list" :key="id">
                <div class="list_one_img">
                   <router-link :to="{path:'detail',query:{id:`${item.goodsId}`}}"> <img :src="item.goodsPic[0].path" alt=""/></router-link>
                    </div>
                <div class="list_one_word">
                    <a>{{item.goodsTitle}}</a>
                    <p>￥{{item.price.GOODS_COST_PRICE}}<span>（约2.5元/500g）</span></p>
                </div>
                <!--加入购物车-->
                <div class="list_add">
                    <div class="list_add_cart" @click="addtoCar(item.goodsId,item.goodsPic[0].path,$event)">加入购物车</div>
                    <div class="list_add_order" @click="addOrder(item.goodsId)">加入预订单</div>
                </div>
            </div>
        </div>
        <div class="pagination_box" v-if="isNull">
             <el-pagination  small layout="total,prev,pager,next" :current-page.sync="currentPage" :page-size='pageSize' :total="total" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
        <div class="null" v-if="!isNull">相关商品暂时为空，<router-link to="/index">您可以去看看其他...</router-link></div>
   </div>
</template>

<script>
import pro from '@/assets/images/pro.jpg'
import { getStore } from '@/config/storage' 
import { goodsList, addCar } from '@/service'
import cateTem from './cates'
export default {
  data() {
    return {
      currentPage:0,
      pro:pro,
      pageSize:8,
      total:0,
      goods: [],
      page:1,
      isNull:false
      
    }
  },
  components:{
    cateTem
  },
   mounted() {
        //console.log(this.$route.query)
        this.getList()
  },
  methods: {
    async getList(){
        let para = {
            page: this.page,
            pageSize: this.pageSize
        }
        this.goods = await goodsList(para)
        this.total = this.goods.total
        this.isNull = this.goods.list.length>1?true:false
    },
    handleCurrentChange(val){
       this.page=val
       this.getList()
    },
    addtoCar(val,pic,event){
        if(getStore('username') == null){
            this.$router.push('/login')
            return false
        }
        let _this = this
        _this.$emit('addFlew',pic,event)
        let prop = {
            id:val,
            num:1
        }
        _this.$store.dispatch('addCar',prop)
         
    },
    addOrder(val){
        this.$router.push({
            path:'/addOrder',
            query:{
                id:val,
                num:1
            }
        })
    }
  }
}
</script>

<style>
 /*商品列表*/

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
.productlist_list{
    width: 100%;
    margin-top:30px;
}
.productlist_list .list_one{
    width: 284px;
    height: 392px;
    float: left;
    margin-top: 22px;
    margin-right: 18px;
    border: 1px solid #e7e7e7;
    overflow: hidden;
    background-color: white;
}
.productlist_list .list_one:nth-child(4n){
    margin-right: 0px;
}
.list_one_img{
    height:284px;
    width:100%;
    overflow: hidden;
    position: relative;
}
.list_one_img img{
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: auto;
}
.list_one_word{
    padding: 0 10px;
}
.list_one_word a{
    display: inline-block;
    height: 55px;
    font-size: 18px;
    color: #666;
}
.list_one_word p{
    font-size: 16px;
    color: #cc0707;
    font-weight: bold;
    margin-top: 20px;
    transition: all 0.3s;
}
.list_one_word p span{
    font-size: 14px;
    color: #4e4e4e;
    font-weight: normal;
    margin-left: 20px;
}
/*鼠标悬停*/
.productlist_list .list_one:hover{
    margin-top: 12px; 
    height: 400px;
    border: none;
    transition: .3s all;
    -webkit-box-shadow: -2px 0 5px #e7e7e7,0 -2px 5px #e7e7e7,2px 0 5px #e7e7e7;
    -moz-box-shadow: -2px 0 5px #e7e7e7,0 -2px 5px #e7e7e7,2px 0 5px #e7e7e7;
    box-shadow: -2px 0 5px #e7e7e7,0 -2px 5px #e7e7e7,2px 0 5px #e7e7e7;
}

.productlist_list .list_one:hover .list_add{
   display: block;
}
.productlist_list .list_one:hover .list_one_word p{
    margin-top: 3px;
}

 
/*<!--加入购物车-->*/
.list_add{
    width: 282px;
    height: 30px;
    line-height: 30px;
     display: none;  
    font-size: 16px;
    text-align: center;
    border: 1px solid #6ca96e;
    cursor: pointer;
    background-color:  #6ca96e;
    position: relative;
}
.list_add div{
    width: 140px;
    height: 100%;
    float: left;
    background-color: white;
    color: #6ca96e;
    
    }
    .list_add div:first-child{
         border-right:  1px solid #6ca96e; 
    }
.list_add div:hover{
    color: white;
    background-color: #6ca96e;
}
 
</style>
