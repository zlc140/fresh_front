<template>
 <div class="cart_box proList"> 
   <el-table :data="lists" ref="proList" :show-header="false" max-height="300" style="width: 100%;">
            <el-table-column  prop="goods" label="商品" min-width="160" >
                <template scope="scope">
                     <span class="title" >{{scope.row.goods.goodsTitle}}</span>
                </template>
            </el-table-column>
             <el-table-column prop="number" label="数量" width="80" v-if="active">
               <template scope="scope">
                 <el-input-number size="small" v-model="scope.row.number" @change="handleChange(scope.row,scope.row.number)" :min="0" ></el-input-number>
                </template>
            </el-table-column>
            <el-table-column  prop="goods" label="价格" width="80" >
                <template scope="scope">
                    <span class="price">{{scope.row.goods.price.GOODS_MARKET_PRICE | currency}} </span> <span style="color:#aaa;" v-if="!active">×{{scope.row.number}}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="log_footer">预计总价：<span class="price">{{total | currency}}</span></div>
     </div> 
</template>

<script>
export default {
    data(){
        return{
            total:0,
            // lists:[]
        }
    },
    props:{
        proList:{
            type:Array,
            default:[]
        },
        active:{
            type:Boolean,
            default:false
        }
    },
    mounted(){
        this.lists = this.proList
        this.totalPrice()
    },
    watch: {
        'proList' (to,from){
            this.lists = this.proList
            this.totalPrice()
            
        }
    },
    computed:{
        lists(){
            return  this.proList
        }
    },
    methods:{
        handleChange(val,num){
            
            let num1 = val.number
            console.log(val,num1,num)
            // val.number = num
            // if(val.number == 0){
            //     this.$confirm('您确认要删除本商品吗？').then((res) =>{
               
            //     }).catch((res) => {
            //          val.number =1
                     
            //     })
            // }
            this.totalPrice()
            // console.log(this.proList)
            
        },
        totalPrice(){
            let _this = this
            _this.total = 0
              this.$nextTick(() => {
                    this.lists.forEach(function(ele) {
                        _this.total += ele.goodsprice.GOODS_MARKET_PRICE*ele.number
                    }, this);
            })
            

        }
    }

}
</script>

<style lang="scss">
.proList .title{
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width:100%;
    height: 30px;
    line-height: 35px;
    padding-left: 10px;
}
 .proList.cart_box .el-table .cell{
    text-align: left;
    padding-left: 3px;
    padding-right: 3px;
 } 
 .proList.cart_box .el-input-number--small .el-input__inner{
     width:70px;
     height: 25px;
     padding: 0 20px;
     border-color:#EAEAEA;
 }
  .proList.cart_box .el-input-number--small{
     width:70px;
 }
  .proList.cart_box .el-input-number--small .el-input-number__decrease{
     width:20px;
     height:25px; 
     font-size: 10px;
     line-height: 25px;
     right:50px;
     background-color: #EAEAEA; 
     color:#666;
      border-color:#ddd;
 }
  .proList.cart_box .el-input-number--small .el-input-number__increase{
    width:20px;height:25px;
    font-size: 10px;
    line-height: 25px;
    background-color: #EAEAEA;
    border-color:#ddd; 
    color:#666;
 }
 .log_footer{
    position: absolute;
    left: 1px;
    bottom: 1px;
    font-size: 14px;
    width: 340px;
    height: 30px;
    line-height: 20px;
    background:#fff;
    padding: 5px 10px;
    text-align: right;
    box-sizing: border-box;
    z-index: 9999;
    border-top: 1px solid #f0f0f0;
     .price{
         font-size: 16px
     }
     
 }
</style>
