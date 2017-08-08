<template>
  <div class="addr_list">
    <div class="top_select cl">
      <a class="addr">收货地址</a>
      <el-button type="text" class="fr pos" @click="handAdd"> <span class="arrow">+</span>新增地址
       
      </el-button>
    </div>
    <div class="detail">
      <p v-for="(item,id) in addrList" :key="id">
        <span class="name">{{item.name}}</span>
        <span class="addr">{{'上海市'+item.county}}{{item.addrDetail}}</span>
        <span class="tel">{{item.phone | phone}}</span>
        <a href="javascript:" title="" @click="handEdit(item)" class="arrow"> 编辑</a>
      </p>
    </div>
    <!--新增/编辑地址界面-->
    <el-dialog :title="title" v-model="addFormVisible" :close-on-click-modal="false">
      <add-address @closeDailog="closeDailog" :formData="editForm" v-if="addFormVisible"></add-address>
    </el-dialog>
  
  </div>
</template>

<script>
import addAddress from '@/view/common/addr'
import { getAddrList, editAddr, addAddr } from '@/service'
export default {
  data() {
    return {
      title: '',
      addrList: [],
      // 添加
      addFormVisible: false,
      addForm: {
        name: '',
        county: '',
        addrDetail: '',
        phone: '',
        tel: ''
      },
      // 编辑
      editForm: {
        name: '',
        county: '',
        addrDetail: '',
        phone: '',
        tel: ''
      }
    }
  },
  components: {
    addAddress
  },
  mounted() {
    this.getList()
  },
  methods: {
    closeDailog(val) {
      if (val == false) {
        this.addFormVisible = false
        this.getList()
      }
    },
    async getList() {
      this.addrList = await getAddrList()
    },
    handAdd() {
      this.title = "新增收货地址"
      this.addFormVisible = true
      this.editForm = null
    },
    handEdit(val) {
      this.title = "编辑收货地址"
      this.addFormVisible = true
      this.editForm = Object.assign({}, val)

    },

  }

}
</script>

<style lang="scss" >
@import '../../../assets/chang.scss';

.addr_list {
  background-color: #fff;
  height: 100%;
}
.el-button.pos {
    color: #666;
    margin: 9px 20px;
    .arrow {
      display: inline-block;
      width: 16px;
      height: 16px;
      text-align: center;
      line-height: 16px;
      border: 1px solid $baseColor;
      color: $baseColor;
      border-radius: 50%;
      margin-right:4px;
    }
    &:hover {
      color: $baseColor;
    }
  }


.addr_list {
  .name {
    width: 60px;
  }
  .addr {
    max-width: 650px
  }
  .detail_addr input {
    width: 450px;
  }

  .detail p {
    height: 52px;
    line-height: 52px;
    padding-left: 54px;
    padding-right: 20px;
    font-size: 14px;
    border-bottom: 1px solid #ddd;
  }
  .detail p span {
    margin-right: 10px;
    float: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
  }
  .detail p a {
    float: right;
    padding-left: 25px;
    margin-right: 15px;

  }
}
</style>
