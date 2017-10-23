<template>
  <div class="coupon" v-loading="listLoading">
  	<div class="top_select cl" >
      <a class="on">代金券</a>
      </div>
  		 <div class="table1" v-if="lists.length>0" >
			<el-table border  :data="lists" style="width: 98%"  >
				<!-- 父级 -->
				<el-table-column label="编号" prop="voucherId" >  </el-table-column>
				<el-table-column label="描述" prop="description">
				<template scope="scope">
						{{scope.row.description?scope.row.description:''}}
					</template>
				</el-table-column>
				 
				<el-table-column label="生效时间"  prop="effectiveTime" width="110px">
				<template scope="scope">   
						<span>{{ scope.row.effectiveTime | formatDate }}</span>
					</template>
				</el-table-column>
				<el-table-column label="到期时间"  prop="indate" width="110px">
				<template scope="scope">   
						<span>{{ scope.row.indate | formatDate }}</span>
					</template>
				</el-table-column>
				<el-table-column label="额度" prop="money" width="90px">
				<template scope="scope">   
						<span class="price">{{ scope.row.money | currency }}</span>
					</template>
				</el-table-column>
				<el-table-column label="代金券状态" prop="state" >
					<template scope="scope">   
						<span>{{ scope.row.state | voucherType }}</span>
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
      您没有代金券！
    </div>
  </div>
</template>

<script>
import {voucherlist} from '@/service'
export default {
	data(){
		return{
			lists:[],
			listLoading:false
		}
	},
	mounted(){
		this.volist()
	},
	methods:{
		volist(){
			this.listLoading = true
			voucherlist().then(res => {
				console.log(res)
				this.listLoading =false
				if(res.data.state == 200 && res.data.content != null){
						this.lists = res.data.content
				}
			}).catch(() => {
				this.listLoading =false
			})
		}
	}
}
</script>

<style lang="scss"scoped> 

    .top{margin-bottom: 10px;}
     
    .coupon{background-color:#fff;height: 100%;}
    // .coupon table{width: 573px;text-align: center;border:none;}
    // .coupon table thead th{font-weight:bold;}
    // .coupon table tr td:first-child{font-weight:bold;}
    // .coupon table tr td:last-child a{color: rgb(75,118,77);}
    // .coupon .head{background-color: rgb(242,242,242);}
    
</style>
