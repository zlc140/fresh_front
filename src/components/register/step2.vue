<template>
  <div>
         <div id="register_banner">
        <!--已有账号马上登陆-->
        <div id="register_enter">
           已有账号 ， <router-link to="/login">马上登陆</router-link>
        </div>
        <!--会员注册-->
      <div id="register_member">
          <div id="register_member_t">
              <img :src="step" />
          </div>
          <div id="register_member_b">
               <p class="tip">提示：只有资料完善的用户才可以使用哈福生鲜的功能</p>
                <el-form style="width:500px;min-height:475px;" :model="user" :rules="rules" ref="ruleForm" label-position="center" class="demo-ruleForm login-container" >
                    <el-form-item prop="workUnit">
                        <el-input placeholder = "请输入您所在的公司/机构名称" auto-complete="on" v-model="user.workUnit ">
                            <template slot="prepend"> 
                              <span>公司/机构名称</span>
                            </template>    
                        </el-input>
                    </el-form-item>
                     <el-form-item prop="officeTel ">
                        <el-input placeholder = "请输入公司或机构的座机或手机号码" auto-complete="on" v-model="user.officeTel">
                           <template slot="prepend"> 
                              <span>公司/机构电话</span>
                            </template>   
                        </el-input>
                    </el-form-item>
                     <el-form-item prop="officeAddress">
                        <el-input placeholder = "请输入有效的公司/机构地址" auto-complete="on" v-model="user.officeAddress">
                           <template slot="prepend"> 
                              <span>公司/机构地址</span>
                            </template>   
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="businessLicenseSN"> 
                        <el-input placeholder="请输入有效的营业执照编号" type="text" auto-complete="off" v-model="user.businessLicenseSN">
                           <template slot="prepend"> 
                              <span>营业执照编号</span>
                            </template> 
                        </el-input> 
                    </el-form-item> 
                    <el-form-item prop="organizationCode">
                        <el-input placeholder="请输入有效的组织机构代码" type="text" auto-complete="off" v-model="user.organizationCode">
                            <template slot="prepend"> 
                              <span>组织机构代码</span>
                            </template> 
                        </el-input> 
                    </el-form-item> 
                     <el-form-item >
                        <el-input placeholder = "请输入您身份证号" auto-complete="off"  v-model="member.idCardNo">
                            <template slot="prepend"> 
                              <span>身份证<small>（可填）</small></span>
                            </template>   
                        </el-input>
                    </el-form-item>
                    <div class="pdL30">
                        <div class="register_upload_t">
                            <el-upload class="avatar-uploader" ref="upload" 
                                :action="uploadImg" 
                                :show-file-list="false" 
                                :on-success="handleSuccess3" 
                                :on-error="handleError" 
                                    >
                                <span>身份证图片<small>（可填）</small></span> <a></a>
                            </el-upload>
                            </div> 
                            <div class="register_upload_b">
                                    <img :src="member.idCardPicStr.path"/>  
                            </div>
                        </div>
                    </el-form>
                         <!--证件上传-->
                        <div id="register_member_b_r">
                              <!--证件上传-->
                        
                             <div class="register_upload_t2">
                                  <el-upload class="avatar-uploader" ref="upload" 
                                        :action="uploadImg" 
                                        :show-file-list="false" 
                                        :on-success="handleSuccess" 
                                        :on-error="handleError" 
                                         >
                                       <span>组织机构大码证图片</span> <a></a>
                                    </el-upload>
                                </div> 
                            <div class="register_upload_b2">
                                 <img :src="user.organizationCodePicStr.path" />  
                            </div>
                       
                             <div class="register_upload_t2">
                                  <el-upload class="avatar-uploader" ref="upload" 
                                        :action="uploadImg" 
                                        :show-file-list="false" 
                                        :on-success="handleSuccess2" 
                                        :on-error="handleError2" 
                                         >
                                       <span>营业执照图片</span> <a></a>
                                    </el-upload>
                                 </div> 
                            <div class="register_upload_b2">
                                 <img :src="user.businessLicensePicStr.path" />  
                            </div>
                        </div>
             
             <el-button type="primary" class="btn" @click="validate" id="register_button">完善资料</el-button>
            
          </div>
          <!--底部-->
          <div id="register_footer">
              <span>北京创新乐知信息技术有限公司 版权所有</span>
              <span class="interval">|</span>
              <span>江苏知之为计算机有限公司</span>
              <span class="interval">|</span>
              <span>江苏乐知网络技术有限公司</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import step2 from '@/assets/images/step2.png'
import {addMember,userUpdate} from '@/service'

export default {
     data(){
         var validatePass = (rule,value,callback) => {
             if(value === ''){
                 callback(new Error('请再次输入密码'))
             }else if(value !== this.user.password) {
                 callback(new Error('两次输入的密码不一致'))
             }else{
                 callback()
             }
         }
         var validatePhone = (rule, value, callback) => {
              var par=/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8}$/;
             var phone = /^1[34578]\d{9}$/ ;
            if (!phone.test(value) && !par.test(value) && value.trim() != '' ) {
                callback(new Error('请输入电话号码的正确格式'));//09557777777
            } else if (value.trim() == '') {
                callback(new Error('电话号码不能为空'))
            } else {
                callback()
            }
         }
         var validateCardNo = (rule, value, callback) => {
             let pon = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
             if(pon.test(value)){
                callback(new Error('请输入正确的身份证号码'))
             }else{
                  callback()
             }
         }
       return {
            step:step2,
            uploadImg:'/image-base/upload',
            imageUrl:'',//机构代码证
            imageUrl2:'',//营业执照
            imageUrl3:'',//身份证
            dialogVisible:false,
            member:{
                idCardNo:'',
                idCardPicStr:{
                    path:''
                }
            },
            user: {
                businessLicenseSN: '',//营业执照编号
                businessLicensePicStr:{path:''},//营业执照图片{path:''}
                organizationCode:'',//组织机构代码
                organizationCodePicStr : {path:''},//组织机构代码图片
                // confirmPassword:'',//密码确认
                officeTel :'',//办公室电话
                officeAddress:'',//地址
                workUnit :'',//工作单位
                 
            },
            rules: {
                businessLicenseSN: [
                    { required: true, message: '营业执照编号必填', trigger: 'blur' },
                ],
                officeTel : [
                    { required: true, message: '公司或机构电话为必填', trigger: 'blur' },
                     { validator: validatePhone, trigger: 'blur' }
                ],
                workUnit : [
                    { required: true, message: '公司或机构名称必填', trigger: 'blur' },
                ]
                
            },
       }
     },
     mounted(){
     },
     methods:{
       validate(){
           let _this = this
         this.$refs.ruleForm.validate((valid) => {
                if(valid) {
                    let prop = Object.assign({},this.user)
                    console.log(prop)
                     addMember(prop).then((res) => {
                         console.log('add' ,res)
                         if(res.data.state == 200){
                              let user = {
                                  username:res.data.content.username,
                                  password:'123456'
                              }
                                 _this.$store.dispatch('logout').then(() =>{
                                   _this.$router.push('/regSuccess')
                                })
                            
                         }else{
                             _this.$message('信息完善失败，请重完善')
                             _this.user = {
                                    businessLicenseSN :'',
                                    businessLicensePicStr:{path:''},
                                    organizationCode:'',
                                    organizationCodePicStr : {path:''},
                                    officeTel :'',
                                    officeAddress:'',
                                    workUnit :'',
                                    
                                }
                         }
                     })
                     if(this.member.idCardNo != '' || this.member.idCardPicStr.path != ''){
                            let para = Object.assign({},this.member)
                            userUpdate(para).then(res => {
                                console.log('update',res)
                            })
                     }
                     
                    
                }else {
                    console.log('error submit !')
                    return false
                }
            })
       },
       
       
       handleSuccess(val){
          if(val.state == 200){
            this.user.organizationCodePicStr.path = val.content.url
           }else{
               this.$message('上传失败')
           }

       },
       handleError(){
            this.$message('上传失败')
       },
        handleSuccess3(val){
         if(val.state == 200){
            this.member.idCardPicStr.path = val.content.url
           }else{
               this.$message('上传失败')
           }

       },
       handleError3(){
             this.$message('上传失败')
       },
        handleSuccess2(val){
         if(val.state == 200){
            this.user.businessLicensePicStr.path = val.content.url
           }else{
               this.$message('上传失败')
           }

       },
       handleError2(){
             this.$message('上传失败')
       }
     }
}
</script>

<style>
  /*已有账号马上登陆*/
  .pdL30{
      padding-left: 50px;
  }
  .tip{
      text-align: left;
      color:orange;
      padding: 10px 0;
  }
#register_banner{
    width: 1200px;
    margin: 0 auto;
}
.mgL300{
    margin-left: 300px;
}
#register_enter{
    width: 1200px;
    height: 40px;
    padding-top: 40px;
    text-align: right;
    font-size: 16px;
}
span small{
    font-size: 10px;
    color:#888;
}
#register_enter a{
    font-size: 16px;
    color:  #6ca96e;
}
#register_enter a:hover{
    color: #6ca96e;
}
/*会员注册*/
#register_member_t{
    width: 1200px;
    height: 75px;
    position: relative;
    overflow: hidden;
}
.stepPic{
    width: 1200px;
    height: 75px;
    position: absolute;
    top: 0;
    left: 0;
}
 #register_member_b{
    background-color: #ffffff;
    /* height: 920px; */
    padding-left: 50px;
    overflow: hidden;
    padding-top: 30px;
    padding-bottom: 50px;
    position: relative;
}
  #register_member_b .el-input-group__append, .el-input-group__prepend{
   color: #393939;
 }
  #register_member_b .el-form-item__error{
   left: 235px;
 }
#register_member input{
    border:0;
    width: 275px;
    height: 45px;
    font-size: 16px;
    color: #333;
    float: right;
    letter-spacing:3px;
    text-align: left;
    background:transparent;
}
#register_member input::-ms-input-placeholder{
    text-align: left;
    color: #bababa;
    opacity:1;
}
#register_member input::-webkit-input-placeholder{
    color: #bababa;
    opacity:1;
    text-align: left;
}
#register_member .el-form-item__content{
  line-height: 16px;
}
#register_member input::-moz-placeholder{
    color: #bababa;
    opacity:1;
    text-align: left;
}
#register_member_b .el-input{
  background-color: #F8F8F8;
}
#register_member_b .checkBox{
  width: 300px;
}
#register_member_b .checkBox input{
  width:100px;
}
#register_member_b .el-input-group__prepend{
  border: none;
  background-color: transparent;
  font-size: 16px;
  letter-spacing: 3px;
  padding-left: 50px;
}
#register_member_b .validation{
  width: 185px;
}
#register_member_b .validation .el-button{
    display: inline-block;
		width: 185px;
		height: 53px;
    color: #fff;
    font-size: 18px;
		border: none;
    /* background-color: rgb(152,195,153); */
    background-color: #f8f8f8;
    color:rgb(152,195,153);
    border-radius: 0;
		text-align: center;
		line-height: 53px;
    letter-spacing: 2px;
    text-decoration: none;
    }
#register_member_b_l{
    float: left;
} 
/*注册按钮*/
#register_button{
    width: 500px;
    height: 45px;
    background-color: #6ca96e;
    color: #ffffff;
    font-size: 20px;
    letter-spacing: 6px;
    text-align: center;
    line-height: 45px;
    margin-top: 30px;
}
/*使用邮箱注册*/
#register_email{
    margin-top: 30px;
    font-size: 18px;
}
#register_email a{
    color: #6ca96e;
}
 #register_email span{
   float: right;

 }
/*证件上传*/
#register_member_b_r{
    width: 478px;
    height: 350px;
    position: absolute;
    top: 10px;
    left: 600px;
    margin-top: 20px;
    margin-right: 40px;
}
.register_upload_t{
    text-align: left;
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
    height: 200px;
    overflow: hidden;
    margin-top: 10px;
    background-color: #F8F8F8;
}
.register_upload_b img{
      width:100%;
      height:auto;
      border-radius:4px;
    }
.register_upload_t2{
    text-align: left;
    margin-top: 10px;
    position: relative;
}
.register_upload_t2 span{
    font-size: 16px;
    color: #393939;
}
.register_upload_t2 a {
    width: 50px;
    height: 25px;
    display: inline-block;
    margin-bottom: -4px;
}
.register_upload_t2 a img{
    width: 25px;
    height: 25px;
    display: block;
    margin-left: 10px;
}
.register_upload_b2{
    width: 360px;
    height: 200px;
    overflow: hidden;
    background-color: #F8F8F8;
   
}
.register_upload_b2 img{
      width:100%;
      height:auto;
      border-radius:4px;
    }
/*底部*/
#register_footer{
    text-align: center;
    color: #c3c3c3;
    font-size: 16px;
    margin:20px 0 50px;
}
</style>
