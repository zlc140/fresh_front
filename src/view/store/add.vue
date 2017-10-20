<template>
    <div class="addStore" v-loading="fullscreenLoading">
        <div class="findback_top"> {{txt}}</div>
        <div class="addStore_box" v-if="formMove">
        <el-form :model="addForm" :rules="rules" label-width="180px" size="small" v-loading="loginLoading"  ref="addForm">
            <el-form-item label="店铺名称" prop="storeName">
                <el-input v-model="addForm.storeName" auto-complete="off" placeholder="店铺名称为中英文,下划线，长度2~20位"></el-input>
            </el-form-item>
            <el-form-item label="执照编号" prop="businessLicenseNo">
                <el-input v-model="addForm.businessLicenseNo" auto-complete="off" placeholder="请填写有效的执照编号"></el-input>
            </el-form-item>
            <el-form-item label="店铺地址" prop="address">
                <el-input v-model="addForm.address" placeholder="请输入店铺真实地址" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="店铺电话" prop="tel">
                <el-input v-model="addForm.tel" auto-complete="off" placeholder="请输入店铺座机或手机号"></el-input>
            </el-form-item>
            <el-form-item label="店铺传真" prop="fax">
                <el-input v-model="addForm.fax" auto-complete="off" placeholder="请输入店铺传真（可不填）"></el-input>
            </el-form-item>
            <el-form-item label="成立时间" prop="regTime">
                <el-date-picker v-model="addForm.regTime" type="date" placeholder="选择时间" >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="店铺简介" prop="about" placeholder="请输入店铺介绍">
                <el-input type="textarea" v-model="addForm.about" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item required label="上传执照" prop="imgs">
                <template scope="scope">
                    <!-- 上传图片  -->
                     <div class="register_upload_t">
                        <el-upload class="avatar-uploader" ref="upload" 
                                :action="uploadImg" 
                                :show-file-list="false" 
                                :on-success="handleSuccess" 
                                :on-error="handleError" 
                                >
                             <a></a>
                            </el-upload>
                    </div> 
                    <div class="register_upload_b">
                        <img :src="addForm.imgs.path" />  
                    </div>
                    <p class="tip">提示：请上传真实的执照图片，我们会有专人审核！</p>
                </template>
            </el-form-item>
        </el-form>
        <div slot="footer" class="denlu">
            <el-button class="btn"  @click.native="addSubmit" :loading="addLoading">保　存</el-button>
        </div>
        </div>
        <div class="addStore_box" v-if="!formMove">
            <div class="null">
               <a href="#" v-if="textMove">您的店铺以及存在！点击进入商家入口这里</a>
               <span href="#" v-if="!textMove">您的开店申请已提交，请耐心等待管理员审核......</span>
            </div>
        </div>
    </div>
</template>

<script>
import {saveStore,checkStore,updateStore} from '@/service'
export default {
    data() {
          // 店铺名称
        var nospace = (rule, value, callback) => {
            var par = /^[\d\a-zA-Z\u4E00-\u9FA5\_]{2,20}$/
            if (!par.test(value) && value.trim() != '') {
                callback(new Error('店铺名称为中英文,数字、下划线，长度2~20位'));
            } else if (value.trim() == '') {
                callback(new Error('店铺名称不能为空'))
            } else {
                callback()
            }
         };
          //  店铺地址,店铺简介，执照编号，店主编号
           var  validaddress= (rule, value, callback) => {
             if (value.trim() == '') {
                callback(new Error('不能输入一串空字符'))
            } else {
                callback()
            }
         };
        //  店铺电话
          var notel = (rule, value, callback) => {
            var par=/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,8}$/;
            var phone = /^1[34578]\d{9}$/ ;
            if (!phone.test(value) && !par.test(value) && value.trim() != '' ) {
                callback(new Error('请输入电话号码的正确格式'));//09557777777
            } else if (value.trim() == '') {
                callback(new Error('电话号码不能为空'))
            } else {
                callback()
            }
         };
        return {
            time:5,
            type:'add',
            txt:'创建店铺',
            fullscreenLoading:false,
            // 日期时间
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            uploadImg:'/image-base/upload',
            // 图片
            picShow: false,
            selectPic: {
                radio: '1200:350',
                cropShow: false,
                multiple: false,
                picList: []
            },
            // form
            loginLoading: false,
            addLoading: false,
            addForm: {
                imgs: {
                    path: ''
                },
                storeName: '',// 店铺名称
                // memberId: 'MR20170930145940306',// 店主id
                businessLicenseNo: '',//公司执照编号
                address: '',// 店铺地址
                tel: '',// 店铺电话
                fax: '',//店铺传真[可空]
                about: '',// 店铺简介[可空]
                regTime: '',// 公司成立时间[可空]
            },
            rules: {
                storeName: [
                    { required: true, message: '请输入店铺名称', trigger: 'blur' },
                    { validator: nospace, trigger: 'blur' }
                ],
                businessLicenseNo: [
                    { required: true, message: '请输入公司执照编号', trigger: 'blur' },
                    { validator: validaddress, trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请输入店铺地址', trigger: 'blur' },
                    { validator: validaddress, trigger: 'blur' }
                ],
                tel: [
                    { required: true, message: '请输入店铺电话', trigger: 'blur' },
                     { validator: notel, trigger: 'blur' }
                ],
                about: [
                    { required: true, message: '请输入店铺简介', trigger: 'blur' },
                    { validator: validaddress, trigger: 'blur' }
                ],
            },
            formMove:true,
            textMove:false
        }
    },
    components: {
        
    },
   computed:{
        userName(){
            return this.$store.state.username 
        }
   },
    mounted() {
        if(this.userName != ''){
            this.getStore()
        }
         
    },
    methods: {
        // 验证店铺存在与否
        getStore(){
            this.fullscreenLoading=true
            let _this = this
            checkStore().then(res => {
                 this.fullscreenLoading=false
                console.log('store',res)
                if(res.data. state == 200){
                if( res.data.messages == '暂无数据！'){
                    _this.formMove = true
                    
                }else if(res.data.messages == '我是管理员！'){
                    console.log('管理员不能开店！')
                    this.$message('管理员不能开店')
                    this.$router.push('/index')
                    _this.formMove = false
                }else if(res.data.messages == '店铺未通过审核！' && res.data.content.state == 'STORE_STATE_CHECK_OFF'){
                    _this.type = 'edit'
                    _this.txt = '店铺审核未通过，请重新编辑资料！'
                    let datas = res.data.content
                    _this.addForm= {
                        storeName: datas.storeName,// 店铺名称
                        businessLicenseNo: datas.businessLicenseNo,// 公司执照编号
                        // memberId: datas.member.memberId,// 店主id
                        storeId:datas.storeId,
                        imgs: {
                            path: datas.businessLicense.path
                        },// 公司执照图片
                        address: datas.officeAddress[0],// 店铺地址
                        tel: datas.officeTel[0],// 店铺电话
                        fax: '',// 店铺传真
                        about: datas.about,// 店铺简介
                        regTime: datas.regTime==0?'':datas.regTime,// 公司成立时间
                    }
                     if(datas.faxes){
                        _this.addForm.fax = datas.faxes[0]
                    }
                    _this.formMove = true
                    console.log('店铺审核中')
                    
                }else if(res.data.messages == '店铺未通过审核！' && res.data.content.state == 'STORE_STATE_ON_CHECKING'){
                     _this.formMove = false
                     _this.textMove = false
                    console.log('店铺审核中')
                     this.close()
                }else{
                    _this.formMove = false
                    _this.textMove = true
                    console.log('您的店铺已完成')
                }
                }
            }).catch(res =>{
                this.fullscreenLoading=false
                
            })
        },
        // 保存
        addSubmit() {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    let _this = this
                    if (this.addForm.imgs.path == '' || this.addForm.imgs.path == 'undefined') {
                        this.$message('请上传图片')
                        return false
                    }
                    this.loginLoading = true
                    let para = Object.assign({}, this.addForm)
                    // console.log('test',para.regTime.getTime())
                    if(para.regTime ){
                        para.regTime = para.regTime.getTime()
                    }
                    para.imgs = JSON.stringify(para.imgs)
                    console.log(para)

                    if(this.type == 'add'){
                        saveStore(para).then((res) => {
                            this.loginLoading = false;
                            console.log('addstore',res)
                            if(res.data.state == 200){
                                _this.formMove = false
                                _this.textMove = false
                                this.$message('申请已发送，请等待审核结果')
                                this.close()
                            }else{
                                this.$message(res.data.messages)
                            }
                            
                        })
                        }else{
                            updateStore(para).then((res) => {
                                this.loginLoading = false;
                                console.log('addstore',res)
                                if(res.data.state == 200){
                                    _this.formMove = false
                                    _this.textMove = false
                                    this.$message('申请已发送，请等待审核结果')
                                }else{
                                    this.$message(res.data.messages)
                                }
                            })
                        }
                     
                }
            })
        },
        
        // 上传图片 
        handleSuccess(val) {
            console.log(val)
            this.addForm.imgs.path =  val.content.url
        },
        handleError(res){
            console.log(res)
        },
        close(){
            let self = this;
            var timer = setInterval(function () {
                self.time--;
                if (self.time <= 0) {
                    clearInterval(timer);
                    self.$router.push('/index')
                }
            }, 1000)
        }
    }
}
</script>
<style  lang= "scss">
.addStore{
    width:1200px;
    margin: 80px auto; 
    min-height:790px;
    background-color: white;
    overflow: hidden;
    .addStore_box{
        padding: 30px 100px;
        .el-form-item__label{
            color:#333;
            font-size: 14px;
        }
        .el-textarea__inner{
            border-color: #c5c5c5;
            border-radius: 0;
        }
        .el-form{
            width:600px;
            margin: 0 auto
        }
    }
    .register_upload_t{
    text-align: left;
    margin-top: 10px;
    position: relative;
}
.register_upload_t span{
    font-size: 16px;
    color: #393939;
}
.register_upload_t a {
    width: 50px;
    height: 25px;
    display: inline-block;
    margin-bottom: -4px;
}
.register_upload_t a img{
    width: 25px;
    height: 25px;
    display: block;
    margin-left: 10px;
}
.register_upload_b{
    width: 360px;
    min-height: 200px;
    overflow: hidden;
    background-color: #F8F8F8;
   
}
.register_upload_b img{
      width:100%;
      height:auto;
      border-radius:4px;
    }
}
   .denlu{
       text-align: center;
       .btn{
            display: inline-block;
            white-space: nowrap;
            cursor: pointer;
            border: 1px solid #c4c4c4;
            padding: 10px 15px;
            border-radius: 4px;
            width: 170px;
            height: 45px;
            margin-top: 60px;
            font-size: 16px;
            color: #fff;
            background-color: #6ca96e;
       }
   }
</style>
 