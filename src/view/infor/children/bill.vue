<template>
 	<div class="bill">
 		<div class="top_select cl">
			 <a @click="getList('one')" :class="select=='one'?'on':''">全部账单</a>
			 <a @click="getList('two')" :class="select=='two'?'on':''">未付款账单</a>
			 <a @click="getList('three')" :class="select=='three'?'on':''">已支付账单</a>
		</div>
 		<div class="table1" v-if="lists.length>0">
			<el-table border  :data="lists" style="width: 100%"  v-loading="listLoading">
				<!-- 父级 -->
				<el-table-column label="描述" type="expand" prop="description" min-width="150">
					<template scope="scope">
						<span  v-if="scope.row.description == null">-</span>
						<div class="moreTxt" v-else v-html="scope.row.description"></div>
					</template>
				</el-table-column>
				<el-table-column label="账单号" prop="id" width="180">  </el-table-column>
				<el-table-column label="期号" prop="issue" >  </el-table-column>
				<el-table-column label="出账时间"  prop="generatedBillsTime" width="110px">
				<template scope="scope">   
						<span>{{ scope.row.generatedBillsTime | formatDate }}</span>
					</template>
				</el-table-column>
				<el-table-column label="金额" prop="money" width="110px">
				<template scope="scope"> 
					 <span  v-if="scope.row.money == 0">-</span>   
						<span v-else class="price">{{ scope.row.money | currency }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="已付金额" prop="paymentMoney" width="110px">
				<template scope="scope">   
					  <span  v-if="scope.row.paymentMoney == 0">-</span>
					  <span v-else class="price">{{ scope.row.paymentMoney | currency }}</span>
					</template>
				</el-table-column>
				<el-table-column label="状态" prop="state" >
					<template scope="scope">   
						<span>{{ scope.row.state | filterBill}}</span>
					</template>
				</el-table-column>
				<el-table-column label="支付时间" align="center" prop="paymentTime" width="120px">
				<template scope="scope">  
					<span  v-if="scope.row.paymentMoney == 0">-</span> 
						<span v-else class="price">{{ scope.row.paymentTime | formatDate }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center"   label="操作" >
					<template scope="scope">
						<div class="play_box">
							<a  @click="aboutClick(scope.row)">详情</a>
							<a class="reds" @click="goPay(scope.row)" v-if="scope.row.state==100">去支付</a>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<!-- <el-col :span="24" class="pagination_box">
				<el-pagination small layout="total,prev,pager,next" :current-page.sync="currentPage1" :page-size='pageSize' :total="total" @current-change="handleCurrentChange">
				</el-pagination>        
             </el-col> -->
  	</div>
	<div class="null" v-if="lists.length<1">
      您没有相关账单信息！
    </div>
		 <bill-detail :datas="bills" @on-close="closeDialog('isShowDialog')" v-if="isShowDialog" ></bill-detail> 	
 	</div>
</template>

<script>
import billDetail from './billDetail'
import {billLists} from '@/service'
export default {
		data(){
			return{
				listLoading:false,
				select:'one',
				isShowDialog:false,
				lists:[],
				bills:[],
				state:''
			}
		},
		components:{
			billDetail
		},
		mounted(){
			this.getBills()
		
		},
		methods:{
			getBills(){
				this.listLoading = true
				let prop = {
					state:this.state
				}
				billLists(prop).then((res) => {
					console.log('bills',res)
					this.listLoading = false
					if(res.data.state == 200){
						this.lists = res.data.content.content
					}
				}).catch(() =>{
					this.listLoading = false
				})
			},
			getList(val){
				this.select = val
				if(val == 'one'){
					this.state = ''
				}else if(val == 'two'){
					this.state = 100  //未付款
				}else if(val == 'three'){
					this.state = 200  // 已付款
				}
				this.getBills()
			},
			aboutClick(row){
				console.log(row)
				this.bills = row.billsInfos
				this.isShowDialog = true
			},
			closeDialog (attr) {
				this[attr] = false
			},
			goPay(row){
				this.$router.push({
					path:'/pay',
					query:{id:row.id}
				})
			}

		}
	
}
</script>

<style>
 
  .bill{background-color:#fff;height: 100%;}
   .play_box a{
	   display: block;
   }
    .play_box a:hover{
		color:#5e9360;
	}
</style>
