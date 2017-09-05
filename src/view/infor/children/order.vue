
<template>
  <div class="order">
  	<div class="top_select cl">
      <a class="on">全部订单</a>
      <!-- <a class="">未支付订单</a>
      <a>已结算订单</a> -->
      </div>
  	<div class="table1" v-if="lists.length>0">
			<el-table border  :data="lists" style="width: 98%">
				<!-- 子级 -->
				<el-table-column type="expand" prop="goodsList">
				<template scope="scope">
						<el-table  border  :data="scope.row.goodsList"  style="width: 90%">  
							<el-table-column   prop="goods.goodsTitle"  label="商品名称" min-width="200px"> </el-table-column>
							<el-table-column prop="goodsId"  label="商品编号" width="200px"> </el-table-column>
							<el-table-column  prop="goods.price.GOODS_MARKET_PRICE" label="商品单价" width="100px">
							<template scope="scope">   
								<span class="price">{{ scope.row.goods.price.GOODS_MARKET_PRICE | currency }}</span>
							</template>
							</el-table-column>
							<el-table-column  prop="number" label="商品数量" width="100px"> 
								<template scope="scope">
									<span>× {{scope.row.number}}</span>
								</template>
							</el-table-column>
							<el-table-column  prop="price" label="小计" width="100px"> 
							<template scope="scope">   
								<span class="price">{{ scope.row.price | currency }}</span>
							</template>
							</el-table-column>
					</el-table>
					 <ul class="getAddr">
						<li><span>收货人:</span> {{scope.row.orderDaddress.name}}</li>
						<li><span>电话:</span> {{scope.row.orderDaddress.phone}}</li>
						<li><span>收货地址:</span> {{scope.row.orderDaddress.address}}</li>
					</ul>
				</template>
				</el-table-column>
				<!-- 父级 -->
				<el-table-column label="订单号" prop="ordersId" >  </el-table-column>
				<el-table-column label="买家" prop="username">
				<template scope="scope">
						{{scope.row.member.username}}
					</template>
				</el-table-column>
				<el-table-column label="收货地址"  prop="orderDaddress" min-width="100px">
				<template scope="scope">   
						<span>{{ scope.row.orderDaddress.address}}</span>
					</template>
				</el-table-column>
				<el-table-column label="下单时间"  prop="createTime" width="110px">
				<template scope="scope">   
						<span>{{ scope.row.createTime | formatDate }}</span>
					</template>
				</el-table-column>
				<el-table-column label="订单总额" prop="price" width="90px">
				<template scope="scope">   
						<span class="price">{{ scope.row.price | currency }}</span>
					</template>
				</el-table-column>
				<el-table-column label="订单状态" prop="orderState" width="90">
					<template scope="scope">   
						<span>{{ scope.row.orderState | filterState }}</span>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<el-col :span="24" class="pagination_box">
				<el-pagination small layout="total,prev,pager,next" :current-page.sync="currentPage1" :page-size='pageSize' :total="total" @current-change="handleCurrentChange">
				</el-pagination>        
             </el-col>
  	</div>
	<div class="null" v-if="lists.length<1">
      您还没有订单信息！
    </div>
  </div>

</template>

<script>
import {orderlist} from '@/service'
export default {
		data(){
			return{
				 
				currentPage1:1,
				lists:[],
				page:1,
				pageSize:10,
				total:0
			}
		},
		mounted(){
			this.getorderlist()
		},
		methods:{
			
			getorderlist(){
				let _this = this
				let para = {
					page: this.page-1,
					pageSize:this.pageSize,
					memberId:''
				}
				orderlist(para).then((res) => {
					console.log(res.data)
					_this.lists=res.data.content.content; 
					_this.total = res.data.content.totalElements
				})
			},
			 //  点击分页
			handleCurrentChange(val) {
				this.page = val
				this.getorderlist()
			},

		}
}
</script>

<style lang="scss">
  .order{background-color: #fff;height: 100%;}
  .getAddr{
  padding: 20px;
  line-height: 30px;
  li{
    span{
      display: inline-block;
      width:60px;
      text-align: right;
      padding-right: 20px;
    }
  }
}
 
</style>
