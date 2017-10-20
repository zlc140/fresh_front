<template>
   <div class="content minH400"  v-loading="fullscreenLoading">
       <div class="productlist_list cl" v-if="isNull">
         <div class="list_one" v-for="(item,id) in goods.content" :key="id">
                <div class="list_one_img">
                   <router-link :to="{path:'detail',query:{id:`${item.goodsId}`}}"> 
                       <img :src="item.goodsPic[0].path" alt="" :title="item.goodsTitle"/>
                       </router-link>
                    </div>
                <div class="list_one_word">
                    <div><router-link :to="{path:'detail',query:{id:`${item.goodsId}`}}"  :title="item.goodsTitle">{{item.goodsTitle}}</router-link></div>
                    <p>￥{{item.price.GOODS_MARKET_PRICE}}<span>（约{{item.price.GOODS_MARKET_PRICE}}元/{{item.goodsStock.sku}}）</span></p>
                </div>
                <!--加入购物车-->
                <div class="list_add">
                    <div class="list_add_cart" @click="addtoCar(item,$event)">加入购物车</div>
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
import { getStore } from '@/config/storage' 
import { goodsList, addCar } from '@/service'
import cateTem from './cates'
export default {
  data() {
    return {
      fullscreenLoading:false,
      currentPage:1,
      pro:'',
      pageSize:16,
      total:0,
      goods: [],
      page:1,
      isNull:true,
      classId:'',
      name:'',
      check:false

    }
  },
  components:{
    cateTem
  },
   mounted() {
       this.name = ''
       this.classId = ''
        //console.log(this.$route.query)
        if(this.$route.query.classId){
          this.classId =  this.$route.query.classId 
          this.name = ''

        }else if(this.$route.query.name){
            this.name = this.$route.query.name
            this.classId = ''

        }
        this.getList()
  },
  watch:{
      '$route'(to,from){
         if(to.query.classId){
             this.classId =  to.query.classId 
             if(to.query.classId == 'all'){
                 this.classId = ''
             }
             this.name = ''
             this.page = 1
         }else if(to.query.name){
             console.log('text',to.query.name)
            this.name = to.query.name
            this.page = 1
            this.classId = ''
         }else{
            this.name = ''
            this.page = 1
            this.classId = ''
         }
         this.getList()
      }
  },
  methods: {
    async getList(){
        this.fullscreenLoading = true
        let para = {
            pageNum: this.page-1,
            pageSize: this.pageSize,
            reqFrom:'front',
            classId:this.classId,
            goodsTitle:this.name
        }
        this.goods=[]
        this.goods = await goodsList(para)
        console.log('test',this.goods)
        this.fullscreenLoading = false
        this.total = this.goods.totalElements
        this.isNull = this.goods.totalElements>0?true:false
    },
    handleCurrentChange(val){
       this.page=val
       this.getList()
    },
    addtoCar(val,event){
        if(getStore('username') == null){
            this.$router.push('/login')
            return false
        }
         if(getStore('username') != null && getStore('getName') != null){
            this.$message('请先完善您的资料！')
            this.$router.push('/stepTwo')
            return false
        }
        if(this.check == true){
            return false
        }
        this.check = true
        let _this = this
        _this.$emit('addFlew',val.goodsPic[0].path,event)
        let prop = {
            goodsId :val.goodsId,
            count :1,
        }
        addCar(prop).then((res) => {
                console.log('shopcar',res)
                if(res.data.state == 200){
                    _this.$store.dispatch('getShopCar')
                    setTimeout(function(){
                        _this.check = false
                    },1000)
                }else{
                    this.$message(res.data.messages)
                    }
                }).catch((res) => {
                    this.$message(res.data.messages)
                })
         
    },
    addOrder(val){
        if(getStore('username') == null){
            this.$message('请先登录')
            this.$router.push('/login')
            return false
        }
        if(getStore('username') != null && getStore('getName') != null){
            this.$message('请先完善您的资料！')
            this.$router.push('/stepTwo')
            return false
        }
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
.minH400{
    min-height:400px;
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
    left:1%;
    transform: translateY(-50%);
    width: 98%;
    height: auto;
}
.list_one_word{
    padding: 0 10px;
}
.list_one_word div{
    /* display: inline-block; */
    height: 55px;
    font-size: 16px;
    color: #666;
    overflow: hidden;
}
.list_one_word div a{
    color:#666;
}
.list_one_word p{
    font-size: 16px;
    height:25px;
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
    -moz-box-shadow:0px 0px 12px #ccc; 
    -webkit-box-shadow:0px 0px 12px #ccc;
     box-shadow:0px 0px 12px #ccc;
    
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
    height: 31px;
    line-height: 30px;
    display: none;  
    font-size: 16px;
    text-align: center;
    border: 1px solid #6ca96e;
    cursor: pointer;
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
         width:141px;
    }
.list_add div:hover{
    color: white;
    background-color: #6ca96e;
}
 
</style>
