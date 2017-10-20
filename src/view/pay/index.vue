<template>
  <div class="account_banner"  v-loading="fullscreenLoading">
    <!-- 支付方式 -->
    <!-- <div class="account_way">
      支付方式
    </div>
    <div class="account_payment">
      <ul>
        <li v-for="(list, index) in list" :key="index" :class="{'active':ind === index}" @click="changeBgc(index)">{{list}}</li>
      </ul>
    </div> -->
    <!--账目明细-->
    <div class="detail_bills_box" v-if="details != null">
        <ul>
          <li><label> 期　号：</label>{{details.issue}}</li>
          <li><label> 账单号：</label>{{details.id}}</li>
          <li><label> 出账时间：</label>{{details.generatedBillsTime | formatDate}}</li>
        </ul>
    </div>
    <div class="account_data">
      账目明细
    </div>
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="expand" width="50">
            <template scope="scope">
                <div v-if="scope.row.order">
                <el-table  border  :data="scope.row.order.goodsList"  style="width: 90%">  
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
                    <li><span>订单号:</span> {{scope.row.order.ordersId}}<span>应付金额:</span><span class="price"> {{scope.row.order.price | currency}}</span></li>
                </ul>
                </div>
                <div v-else>没有详情</div>
            </template>
        </el-table-column>
        <el-table-column prop="createTime" label="日期" width="400px">
          <template scope="scope">
              {{scope.row.createTime | formatDate}}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="money" label="金额" width="400px"> </el-table-column> -->
         <el-table-column align="center" prop="description" label="描述" > </el-table-column>
          <el-table-column align="left" prop="money" label="金额" width="120">
              <template scope="scope">
                  <span :class="scope.row.type == 300?'greens':'reds'">{{ scope.row.type==300?'+':'-' }} {{ scope.row.money | currency}}</span>
              </template>
          </el-table-column>
  </el-table>
    </template>
    <!--是否使用抵用券-->
    <div class="account_voucher">
      <template>
        <div class="account_voucher_te">
          <div class="account_voucher_p" @click="show3 = !show3">是否使用抵用券
            <i class="el-icon-arrow-down"></i>
          </div>
          <div>
            
            <el-collapse-transition>
              <div v-show="show3">
                <div class="transition-box">
                  <div class="transition-box_one"  @click="handLeChange(item)" v-for="(item,index) in vouchers" :key="index" :title="item.description">
                    <span class="price">抵扣现金{{item.money | currency}}</span>
                    <el-checkbox  v-model="item.checks">立即使用</el-checkbox>
                    </div>
                  
                </div>
              </div>
            </el-collapse-transition>
          </div>
        </div>
      </template>
      <div class="account_voucher_list">
        <ul>
          <li>
            <span>账单出账时间：</span>
            <p>{{generatedBills | formatDate}}</p>
          </li>
          <li>
            <span>商品总额：</span>
            <p>{{goodPrice|currency }}</p>
          </li>
          <li>
            <span>已付金额：</span>
            <p>{{aleadyPrice | currency}}</p>
          </li>
          <li>
            <span>优惠金额：</span>
            <p >{{total|currency}}</p>
          </li>
         
          <li>
            <span>应付总额：</span>
            <p>{{totalPrice|currency}}</p>
          </li>
          <li class="btn" @click="paySubmit()">提交订单</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {billLists,voucherlist,paySub} from '@/service'
export default {
  data() {
    return {
      fullscreenLoading:false,
      show3: true,
      list: ['在线支付', '公司转账', '邮局汇款'],
      ind: 0,
      checked: false,
      details:null,
      tableData:[],
      vouchers:[],
      generatedBills: '',
      goodPrice: 0.00,
      total: 0.00,
      totalPrice: 0.00,
      aleadyPrice:0
    }
  },
  mounted(){
    console.log(this.$route.query.id)
    let _this = this
    if(this.$route.query.id){
      this.getBillDetail(this.$route.query.id)
    }
    this.fullscreenLoading = true
    this.vouchers =[]
    voucherlist().then((res) =>{
      this.fullscreenLoading = false
      console.log('voucher',res)
      if(res.data.state == 200 && res.data.messages != '暂无数据！'){
        _this.vouchers = res.data.content
        if(_this.vouchers.length>0){
          _this.vouchers.forEach(function(ele) {
              ele.checks = false
          });
        }
      }else{
        // this.$message(res.data.messages)
      }
    }).catch((res) =>{
       
    })
  },
  methods: {
    getBillDetail(id){
        let prop = {
					billsId:id
				}
				billLists(prop).then((res) => {
					console.log('你好',res)
					this.listLoading = false
					if(res.data.state == 200){
            this.details = res.data.content.content[0]
            this.tableData = this.details.billsInfos 
            this.generatedBills = this.details.generatedBillsTime
            this.goodPrice = this.details.money
            this.aleadyPrice = this.details.paymentMoney
            this.totalPrice = this.goodPrice - this.total - this.aleadyPrice
            console.log('订单详情',this.details)
					}
				}).catch(() =>{
					this.listLoading = false
				})
    },
    changeBgc (index) {
      console.log(index)
      this.ind = index
    },
    checking(){
       if(this.totalPrice = 0){
          item.checks = false
          return false
        }
    },
    handLeChange(item){
        //console.log('按键',item.checks)
        
        // if(this.totalPrice == 0){
        //   console.log(this.totalPrice)
        //    item.checks = false
        //   return false
        // }else{
          // this.$nextTick(function(){
           if(item.checks == false && this.totalPrice == 0){
             this.$messge('已经减至最低')
                return false
            }
              item.checks = !item.checks
            
          // })
          
        // }
        if(item.checks == true){
          this.total+=parseFloat(item.money)
        }else{
          this.total-=item.money
        }
        //console.log('优惠券总额',this.total)
        this.totalPrice=this.goodPrice-parseFloat(this.total) - this.aleadyPrice
        if(this.totalPrice<0){
          this.totalPrice = 0
        }
        
    },
    paySubmit(){
        
        let prop = {
          billsId:this.details.id,
          voucherIds:[]
        }
        if(prop.billsId == ''){
          return false
        }
        if(this.vouchers.length>0){
            this.vouchers.forEach(v => {
              if(v.checks == true){
               prop.voucherIds.push(v.voucherId)
              }
            })
        }
         prop.voucherIds = prop.voucherIds.join(',')
        console.log(prop)
       
        paySub(prop).then(res => {
          console.log('pat',res)
          if(res.data.state == 200){
           window.open(res.data.content )
            // window.location.href=res.data.content
            this.layer()
          }
        }).catch((res) => {
          console.log('error',res)
        })
    } ,
    layer(){
      this.$confirm('请您在新打开的网上银行页面进行支付，支付完成确认支付结果','在线支付', {
          confirmButtonText: '支付成功',
          cancelButtonText: '支付失败',
          type: 'info'
        }).then(() => {
          this.$router.push('/user/bill')
        }).catch(() => {
          this.$message('重新支付')     
        });
    }
  }
}
</script>

<style lang= "scss">
/*支付方式*/
.detail_bills_box{
  padding:30px 0 10px;
  font-size: 18px;
  label{
    display: inline-block;
    width:120px;
  }
}
.account_banner {
  width: 1200px;
  height: 2000px;
  margin: 0 auto;
  .account_way {
    font-size: 20px;
    margin-top: 10px;
  }
  .account_payment {
    width: 1200px;
    height: 125px;
    margin-top: 60px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .account_payment ul li {
    width: 160px;
    height: 40px;
    float: left;
    display: block;
    font-size: 16px;
    margin-left: 20px;
    line-height: 40px;
    text-align: center;
    position: relative;
    cursor: pointer;
    border: 1px solid #c0c0c0;
  }
  /*账目明细*/
  .account_data {
    font-size: 18px;
  }
  .el-table tr th {
    background-color: #6ca96e;
    text-align: center;
  }
  .el-table th>.cell {
    background-color: #6ca96e;
    color: white;
    font-size: 17px;
  }
  .el-table tr {
    text-align: center;
    font-size: 14px;
    background-color: #f9f9f9;
  }
  .el-table .cell {
    white-space: normal;
    word-break: break-all;
    line-height: 24px;
    font-size: 14px;
    color: #5f5f5f;
  }
  .el-table--enable-row-transition .el-table__body td {
    transition: background-color .25s ease;
    height: 50px;
  }
  .account_voucher .account_voucher_p {
    width: 1160px;
    height: 30px;
    margin-left: 10px;
    font-size: 20px;
    position: relative;
    margin-top: 10px;
  }
  /* .account_voucher span {
    width: 70px;
    height: 25px;
    display: block;
    line-height: 28px;
  } */
  .account_voucher span img {
    width: 25px;
    height: 15px;
    display: block;
    position: absolute;
    top: 22px;
    left: 150px;
    color: red;
  }
  .account_voucher_list {
    width: 1160px;
    height: 620px;
    margin: 0 auto;
  }
  .account_voucher_list ul {
    width: 350px;
    height: 620px;
    float: right;
    margin-right: 20px;
    position: relative;
  }
  .account_voucher_list li {
    overflow: hidden;
    zoom: 1;
    width: 350px;
  }
  .account_voucher_list li.btn{
   height: 44px;
   width:150px;
   text-align: center;
    float: right;
    margin: 30px 0;
    font-size: 20px;
    color: #ffffff;
    line-height: 44px;
    cursor: pointer;
    
} 
  .account_voucher_list li span {
    width: 177px;
    float: left;
    font-size: 20px;
    color: #979797;
    height: 30px;
    margin-top: 20px;
    text-align: right;
  }
  .account_voucher_list li p {
    font-size: 20px;
    color: #595959;
    float: right;
    margin-top: 20px;
  }
  .account_voucher_list li:nth-child(5) p {
    margin-left: 26px;
  }
  .account_voucher_list li:nth-child(6) p {
    font-weight: bold;
    color: #e43b3d;
    font-size: 22px;
  }
  .el-icon-arrow-down:before {
    margin-left: 15px;
  }
  .account_voucher_te {
    border-bottom: 2px solid #eeeeee;
  }
  .account_voucher_te i{
    color: #aaa;
    font-size: 16px;
  }
  .transition-box {
    width: 450px;
    cursor: pointer;
    border-radius: 4px;
    color: #979797;
    padding-top: 20px;
    padding-left: 80px;
    padding-bottom: 10px;
    box-sizing: border-box;
    margin-right: 20px;
  }
  .transition-box_one {
    font-size: 15px;
    padding-bottom: 10px;
  }
}
</style>
