<template>
     <div class="cart_box proList"> 
   <el-table :data="proList" ref="proList" :show-header="false"  style="width: 100%;">
             
            <el-table-column  prop="goods" label="商品" width="160" >
                <template scope="scope">
                     <span class="title" >{{scope.row.goods.goodsTitle}}</span>
                </template>
            </el-table-column>
             <el-table-column prop="number" label="数量" width="80" >
               <template scope="scope">
                 <el-input-number size="small" v-model="scope.row.number" @change="handleChange(scope.row)" :min="0" ></el-input-number>
                </template>
            </el-table-column>
            <el-table-column  prop="goods" label="价格" min-width="80" >
                <template scope="scope">
                    <span class="price">{{scope.row.goods.price.GOODS_MARKET_PRICE | currency}}</span>
                </template>
            </el-table-column>
             
        </el-table>
     </div> 
</template>

<script>
export default {
    props:{
        proList:{
            type:Array,
            default:[]
        }
    },
    mounted(){
        console.log('test',this.proList)
    },
    methods:{
        handleChange(val){
            if(val.num == 1){
                this.$confirm('您确认要删除本商品吗？').then((res) =>{
                
                val.num =1
                }).catch((res) => {
                    return false
                })
            }
            // console.log(this.proList)
            this.$emit('editList',this.proList)
        }
    }

}
</script>

<style >
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
</style>
