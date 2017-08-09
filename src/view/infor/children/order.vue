
<template>
  <div class="order">
  	<div class="top_select cl">
      <a class="on">全部订单</a>
      <!-- <a class="">未支付订单</a>
      <a>已结算订单</a> -->
      </div>
  	<div class="table1" v-if="orderList.length>0">
		<el-table :data="orderList" style="width: 90%" border>
			<el-table-column prop="title" label="商品名称" min-width="180">
			</el-table-column>
			<el-table-column prop="price" label="金额" width="180">
				<template scope="scope">
					{{scope.row.price | currency}}
				</template>
			</el-table-column>
			<el-table-column prop="payType" label="状态" width="120">
				<template scope="scope">
					{{scope.row.payType ==1 ?'未支付':'已支付'}}
				</template>
			</el-table-column>
			<el-table-column prop="address" label="时间" width="200">
			</el-table-column>
			<el-table-column type="expand" prop="detail" label="详情" width="80">
				<template scope="scope">
					{{scope.row.detail }}
				</template>
			</el-table-column>
		</el-table>
  	</div>
	<div class="null" v-if="orderList.length<1">
      您还没有添加地址，请尽快添加！
    </div>
  </div>

</template>

<script>
export default {
		data(){
			return{
				orderList:[
					{
						title:'白菜100g超级新鲜的白菜白菜100g超级新鲜的白菜',
						price:'120.0',
						payType:1,
						date:new Date(),
						detail:'详情'
					},
					// 	{
					// 	title:'白菜100g超级新鲜的白菜白菜100g超级新鲜的白菜',
					// 	price:'120.0',
					// 	payType:1,
					// 	date:new Date(),
					// 	detail:'详情'
					// }
				]
			}
		}
}
</script>

<style lang="scss">
  .order{background-color: #fff;height: 100%;}
  
 
</style>
