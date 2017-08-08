<template>
 	<div class="bill">
 		<div class="top_select cl">
			 <a @click="getList('one')" :class="select=='one'?'on':''">全部账单</a>
			 <a @click="getList('two')" :class="select=='two'?'on':''">未支付账单</a>
			 <a @click="getList('three')" :class="select=='three'?'on':''">已支付账单</a>
			 </div>
 		<div class="table1">
 			<table border=".5" cellspacing="0" cellpadding="0">
 				<thead>
 					<tr class="head">
 						<th>账单号</th>
  						<th>账单起始日期</th>
  						<th>出账期</th>
  						<th>账单金额</th>
  						<th>操作</th>
 					</tr>
 				</thead>
 				<tbody>
 					<tr>
 					<td>11233338976022</td>
  					<td>2017-3-24</td>
  					<td>2017-3-24</td>
  					<td>￥780.00</td>
  					<td><a href="" title="">去支付</a><span>|</span><a @click="aboutClick">查看详情</a></td>
 					</tr>
 					 
  				</tbody>
 			</table>
 		</div>	
		 <bill-detail :is-show="isShowDialog" @on-close="closeDialog('isShowDialog')" v-if="isShowDialog"></bill-detail> 	
 	</div>
</template>

<script>
import billDetail from './billDetail'
export default {
		data(){
			return{
				select:'one',
				isShowDialog:false
				
			}
		},
		components:{
			billDetail
		},
		methods:{
			getList(val){
				this.select = val
			},
			aboutClick(){
				this.isShowDialog = true
			},
			closeDialog (attr) {
				this[attr] = false
			}

		}
	
}
</script>

<style>
  .bill{background-color:#fff;height: 100%;}
   
  .bill table{width: 800px;text-align: center;border:none;}
  .bill table tr{height: 40px;}
  .bill table tr td:last-child a{color: rgb(75,118,77);}
  .bill table tr td:last-child span{padding: 0 6px;}
  .bill .table1{border-right: 1px solid rgb(154,154,154);display: inline-block;border-bottom: 1px solid rgb(154,154,154);}
  .bill .head{background-color: rgb(242,242,242);}
  .bill table thead th{font-weight:bold;}
</style>
