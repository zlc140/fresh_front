<template>
   <!--新增地址界面-->
    <div class="dailog_addr">
    <el-form :model="addForm" ref="addForm" :rules="addFormRules">
      <el-form-item label="收货人" prop="name">
        <el-input v-model="addForm.name" auto-complete="off" placeholder="请填写收货人真实姓名，方便收货"></el-input>
      </el-form-item>
      <el-form-item label="所在地区" class="sel_addr">
        <div class="el-input">
            <span class="city">上海市</span> 
            <el-select v-model="addForm.county" placeholder="请选择区">
              <el-option v-for="(item,index) in areasList" :key="index" :label="item.name" :value="item.name"></el-option>
            </el-select>
        </div>
      </el-form-item>
      <el-form-item label="详细地址" class="detail_addr" prop="addrDetail">
        <el-input v-model="addForm.addrDetail" placeholder="请填写详细地址" auto-complete="off"></el-input>
      </el-form-item>
     <!-- <el-row :gutter="20"> -->
       <!-- <el-col :span="12"> -->
          <el-form-item prop="phone" label="手机号码" >
            <el-input v-model="addForm.phone" placeholder="请填写收货人手机号码" auto-complete="off"></el-input>
          </el-form-item>
       <!-- </el-col> -->
        <!-- <el-col :span="12" >
          <el-form-item label="固定电话" >
            <el-input v-model="addForm.tel" auto-complete="off"></el-input>
          </el-form-item>
       </el-col> -->
     <!-- </el-row> -->
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click.native="addSubmit" :loading="addLoading">保存地址</el-button>
      </div>
    </div>

</template>

<script>
import {editOrderAddr,addOrderAddr } from '@/service'
export default {
    props:{
        formData:{
            type:Object,
            default:null
        }
    },
    data(){
        return{
            // 添加
            addLoading:false,
            addForm:{
                name:'',
                county:'',
                addrDetail:'',
                phone:'',
                tel:''
            },
            areasList:[
                { name:'黄埔区' },
                { name:'徐汇区' },
                { name:'长宁区' },
                { name:'静安区' },
                { name:'普陀区' },
                { name:'虹口区' },
                { name:'杨浦区' },
                { name:'闵行区' },
                { name:'宝山区' },
                { name:'嘉定区' },
                { name:'浦东新区' },
                { name:'金山区' },
                { name:'松江区' },
                { name:'青浦区' },
                { name:'奉贤区' }
                
            ],
            addFormRules:{
            name:[
                { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
            county:[
                { required: true, message: '地址不能为空', trigger: 'blur' }
                ],
            addrDetail:[
                { required: true, message: '地址详情不能为空', trigger: 'blur' }
                ],
            phone:[
                { required: true, message: '电话不能为空', trigger: 'blur' }
                ],
            
            },
        }
    },
    mounted(){
         if(this.formData != null){
             let adds = this.formData.address.split(',')
             this.addForm = {
                 name : this.formData.name,
                 county:adds[1],
                 addrDetail:adds[2],
                 phone:this.formData.phone,
                 orderDaddressId :this.formData.orderDaddressId 
             }
         }
    },
    methods:{
         
        addSubmit(){
            let _this = this
            this.$refs.addForm.validate((valid) => {
                if(valid) {
                    _this.addLoading = true
                    if(_this.formData == null){
                        let prop = {
                            memberId : 'M20170814170704005',
                            address:'上海市,'+this.addForm.county+','+this.addForm.addrDetail,
                            phone:this.addForm.phone,
                            name:this.addForm.name
                        }
                        let res = addOrderAddr(prop).then((res) => {
                            if(res.data.state == 200){
                                _this.addLoading = false
                                _this.$emit('closeDailog',false)
                                this.$message('添加成功')
                            }
                        })
                    }else{
                         let prop = {
                                memberId : 'M20170814170704005',
                                address:'上海市,'+this.addForm.county+','+this.addForm.addrDetail,
                                phone:this.addForm.phone,
                                name:this.addForm.name,
                                orderDaddressId :this.addForm.orderDaddressId 
                            }
                         let res = editOrderAddr(prop).then((res) => {
                            console.log(res)
                            if(res.data.state == 200){
                             _this.addLoading = false
                             this.$message('编辑成功')
                            _this.$emit('closeDailog',false)
                            }
                           
                        })
                    }
                }
            })
      },
    }

}
</script>

<style lang="scss">
@import '../../assets/chang.scss'; 
.city{
  display: inline-block;
  width:140px;
  border: 1px solid #c5c5c5;
  text-align: center;
  height:34px;
  float:left; 
  margin-right: 8px;
  margin-top: 1px;
}

.sel_addr .el-input__inner{
        width:250px;
}
 
</style>
