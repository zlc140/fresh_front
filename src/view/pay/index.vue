<template>
  <div class="account_banner">
    <!-- 支付方式 -->
    <div class="account_way">
      支付方式
    </div>
    <div class="account_payment">
      <ul>
        <li v-for="(list, index) in list" :key="index" :class="{'active':ind === index}" @click="changeBgc(index)">{{list}}</li>
      </ul>
    </div>
    <!--账目明细-->
    <div class="account_data">
      账目明细
    </div>
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="日期" width="400px"></el-table-column>
        <el-table-column prop="name" label="消费金额" width="400px"> </el-table-column>
        <el-table-column prop="address" label="折扣金额"> </el-table-column>
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
                  <div class="transition-box_one">哈佛优惠券 满200 减￥20
                    <span>立即使用</span>
                  </div>
                  <div class="transition-box_one">哈佛优惠券 满200 减￥20
                    <span>立即使用</span>
                  </div>
                  <div class="transition-box_one">哈佛优惠券 满200 减￥20
                    <span>立即使用</span>
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
            <span>账单起始时间：</span>
            <p>2017-12-29</p>
          </li>
          <li>
            <span>账单出账时间：</span>
            <p>2017-12-29</p>
          </li>
          <li>
            <span>账单还款时间：</span>
            <p>2017-12-29</p>
          </li>
          <li>
            <span>商品总额：</span>
            <p>￥789.00</p>
          </li>
          <li>
            <span>优惠券：</span>
            <p>￥789.00</p>
          </li>
          <li>
            <span>应付总额：</span>
            <p>￥72389.00</p>
          </li>
          <li class="btn">提交订单</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import testTem from './test'
export default {
  data() {
    return {
      show3: true,
      list: ['在线支付', '公司转账', '邮局汇款'],
      ind: 0,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      ]
    }
  },
  methods: {
    changeBgc (index) {
      console.log(index)
      this.ind = index
    }
  }
}
</script>

<style lang= "scss">
/*支付方式*/

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
    font-size: 20px;
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
  .account_voucher span {
    width: 70px;
    height: 25px;
    display: block;
    line-height: 28px;
  }
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
    width: 350px;
  }
  .account_voucher_list li.btn{
   height: 44px;
   width:150px;
   text-align: center;
    position: absolute;
    bottom: 200px;
    font-size: 20px;
    color: #ffffff;
    line-height: 44px;
    cursor: pointer;
    right: 0;
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
    width: 340px;
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
