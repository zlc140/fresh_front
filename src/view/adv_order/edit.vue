<template>
  <div class="container">
    <h2 class="pageTitle">填写并核对订单信息</h2>
    <div class="addr_box">
      <p>收货人信息
        <el-button type="text" class="fr" @click="addEvent">添加地址
          <span class="arrow">+</span>
        </el-button>
      </p>
      <div class="addr_list" :class="moreShow?'more':''">
        <ul>
          <li v-for="(item,index) in addrs" v-if="item.isdefault" class="selDefault" @click="selAddr(item.orderDaddressId)" :key="index">
            <span class="checkBtn">{{item.name}}</span>
            <span class="addr">{{item.address}}</span>
            <span>{{item.phone}}</span>
          </li>
           <li v-for="(item,index) in addrs"  v-if="!item.isdefault" @click="selAddr(item.orderDaddressId)" :key="index">
            <span class="checkBtn">{{item.name}}</span>
            <span class="addr">{{item.address}}</span>
            <span>{{item.phone}}</span>
          </li>
        </ul>
      </div>
      <div class="more_box " v-if="addrs.length>1">
        <el-button type="text" @click="showMore">{{moreShow?'收起 ︽':'查看更多︾'}}</el-button>
      </div>
      <div class="nullAddr"  v-if="addrs.length<1 ||　!addrs.length">您还没有添加收货地址！ </div>
    </div>
    
    <full-calendar class="test-fc" 
          :events="fcEvents" 
          v-if="flag"
          first-day='1' 
          locale="zh" 
          checkMore="false" 
          @changeMonth="changeMonth" 
          @eventClick="eventClick" 
          @dayClick="dayClick" 
          @moreClick="moreClick">
      <!-- <template slot="fc-event-card" scope="p">
                <p><i class="fa"></i> {{ p.event.title }} test</p>
            </template> -->
    </full-calendar>
    <div class="btn_box">
      <a class="btn" @click="saveOrder">保存预订单</a>
    </div>
     <el-dialog title="新增收货地址"  v-model="addFormVisible" :close-on-click-modal="false">
        <add-address @closeDailog="closeDailog" v-if="addFormVisible"></add-address>
      </el-dialog>
  </div>
</template>

<script>
import fullCalendar from '@/components/calendar'
import addAddress from '../common/addr'
import { advOrderList,orderAddress,selAddress } from '@/service'
let demoEvents = [
  {
    title: 'Sunny 725-727',
    start: '1499443200000',
    end: '',
    cssClass: 'family'
  },
  {
    title: 'Lun 725-727',
    start: '1499443200000',
    end: '',
    cssClass: 'family2'
  },
  {
    title: 'Lun 725-727',
    start: '2017-07-09',
    end: '',
    cssClass: 'family2'
  }

];
export default {
  data() {
    return {
      addFormVisible:false,
      name: 'Sunny!',
      fcEvents: [],
      flag:false,
      formData:{
          name:'',
          county:'',
          addrDetail:'',
          phone:'',
          tel:''
        },
      defaultAddr: '0011',
      moreShow: false,
      addrs: []
    }
  },
  components: {
    fullCalendar,addAddress
  },
   mounted() {
    this.getAddr()
    this.getList()
  },
  methods: {
    async getAddr(){
        this.addrs = await orderAddress()
    },
    async getList(){ 
        let lists = await advOrderList()
        this.flag = true
        this.fcEvents = lists
        console.log(this.fcEvents)
    },
    closeDailog(val){
        if(val == false){
          this.addFormVisible = false
        }
        this.getAddr()
    },
    addEvent(){
        this.addFormVisible = true
        this.formData = {
          name:'',
          county:'',
          addrDetail:'',
          phone:'',
          tel:''
        }
    },
    changeMonth(start, end, current) {
      // console.log('changeMonth', start.format(), end.format(), current.format())
    },
    eventClick(event, jsEvent, pos) {
      //  console.log('eventClick', event, jsEvent, pos)
    },
    dayClick(day, jsEvent) {
      this.selDay = day
      // console.log('dayClick', day)
    },
    moreClick(day, events, jsEvent) {
      // console.log('moreCLick', day, events, jsEvent)
    },
    selAddr(val) {
      let _this = this
      let prop = {
        memberId : 'M20170814170704005',
        orderDaddressId :val
      }
      selAddress(prop).then((res) => {
        if(res.data.state == 200){
          _this.getAddr()
        }
      })
      
    },
    showMore() {
      this.moreShow = !this.moreShow
    },
    saveOrder(){
      console.log(this.fcEvents)
    }

  }
}
</script>

<style lang="scss">
@import '../../assets/chang.scss';
.nullAddr{
  text-align: center;
  line-height: 100px;
  font-size: 20px;
  color: #ccc;
}
.pageTitle {
  font-size: 18px;
  color: #888;
  padding: 20px 5px;
  font-weight: normal;
}

.addr_box {
  background-color: white;
  padding: 10px 5px;
  color: #666;
  &>p {
    font-size: 16px;
    padding-right: 85px;
    padding-left: 25px;
    .el-button {
      color: #666;
      .arrow {
        display: inline-block;
        width: 16px;
        height: 16px;
        text-align: center;
        line-height: 16px;
        border: 1px solid $baseColor;
        color: $baseColor;
        border-radius: 50%;
        margin-left: 6px;
      }
      &:hover {
        color: $baseColor;
      }
    }
  }
  
  .addr_list {
    background-color: white;
    padding: 4px 60px;
    height: 45px;
    overflow: hidden;
    width: 1080px;
    li {
      height: 43px;
      line-height: 43px;
      padding: 3px 10px;
      cursor: pointer;

      span {
        float: left;
        display: inline-block;
        margin: 0 10px;
        font-size: 14px;
        height: 40px;
      }
      .addr {
        width: 735px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 48px;
      }
      .checkBtn {
        height: 40px;
        width: 160px;
        border: 1px solid #ccc;
        background-color: white;
        text-align: center;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &:hover {
        background-color: #f0f0f0;
      }
    }
    .selDefault {
      display: block;
    }
  }
  .more {
    height: auto;
    li {
      display: block;
    }
  }
}

 
.more_box {
  text-align: left;
  background-color: white;
  padding-left:80px;
  border: 1px solid white;
  .el-button--text {
    color: #888;
  }
}

.addB {
  border-top: 1px solid $baseColor;
}

.btn_box {
  text-align: right;
  margin: 30px 0 50px;
}

.btn {
  display: inline-block;
  font-size: 18px;
  color: $baseColor;
  height: 45px;
  line-height: 45px;
  width: 180px;
  border: 2px solid $baseColor;
  text-align: center;
  margin: 0 10px;
}

.btn.bgBtn {
  background-color: $baseColor;
  color: white;
}
</style>
