<template>
  <div>
         <div id="register_banner">
        <!--已有账号马上登陆-->
        <div id="register_enter">
           已有账号 ， <router-link to="/login">马上登陆</router-link>
        </div>
        <!--会员注册-->
      <div id="register_member">
          <div id="register_member_t">会员注册</div>
          <div id="register_member_b">
                <el-form style="width:500px;" :model="user" :rules="rules" ref="ruleForm" label-position="center" class="demo-ruleForm login-container" >
                    <el-form-item prop="username">
                        <el-input placeholder = "您的账户名和登陆名" auto-complete="on" v-model="user.username">
                            <template slot="prepend"> 
                              <span>用户名</span>
                            </template>    
                        </el-input>
                    </el-form-item>
                     <el-form-item prop="nickname">
                        <el-input placeholder = "请输入您的真实姓名" auto-complete="on" v-model="user.nickname">
                           <template slot="prepend"> 
                              <span>真实姓名</span>
                            </template>   
                        </el-input>
                    </el-form-item>
                     <el-form-item prop="iDCardNo">
                        <el-input placeholder = "请输入您的公司名称" auto-complete="off"  v-model="user.iDCardNo">
                           <template slot="prepend"> 
                              <span>公司名/机构名</span>
                            </template>    
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="iDCardNo">
                        <el-input placeholder = "请输入您身份证号" auto-complete="off"  v-model="user.iDCardNo">
                            <template slot="prepend"> 
                              <span>身份证</span>
                            </template>   
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input placeholder="密码长度6~12位数" type="password" auto-complete="off" v-model="user.password">
                            <template slot="prepend"> 
                              <span>密&nbsp;&nbsp;码</span>
                            </template> 
                        </el-input> 
                    </el-form-item> 
                    <el-form-item prop="confirmPassword"> 
                        <el-input placeholder="请确认您的密码" type="password" auto-complete="off" v-model="user.confirmPassword">
                           <template slot="prepend"> 
                              <span>确认密码</span>
                            </template>
                        </el-input> 
                    </el-form-item>
                     <el-form-item prop="eMail"> 
                        <el-input placeholder="请输入有效的邮箱" type="password" auto-complete="off" v-model="user.eMail">
                           <template slot="prepend"> 
                              <span>邮&nbsp;&nbsp;箱</span>
                            </template> 
                        </el-input> 
                    </el-form-item>  
                    <el-form-item prop="phone"> 
                        <el-input placeholder="请输入11位手机号码" type="password" auto-complete="off" v-model="user.phone">
                           <template slot="prepend"> 
                              <span>手机号</span>
                            </template> 
                        </el-input> 
                    </el-form-item> 
                    <el-form-item prop="checkWord">
                        <el-input type="checkWord" v-model="user.checkWord" @keyup.enter.native="check" class="checkBox">
                          <template slot="prepend"> 
                              <span>手机验证码</span>
                            </template> 
                            </el-input> 
                        <div class="validation fr">
                           <el-button>发送验证码</el-button> 
                        </div>
                      </el-form-item>
                        <el-button type="primary" class="btn" @click="validate" id="register_button">注册</el-button>
                        <div id="register_email">
                              <a href="">使用邮箱注册</a>
                              <span >已有账号
                              <router-link to="/login">去登陆</router-link></span>
                        </div> 
                         <!--证件上传-->
                        <div id="register_member_b_r">
                             <div id="register_upload_t">
                                  <el-upload class="avatar-uploader" ref="upload" 
                                        :action="uploadImg" 
                                        :show-file-list="false" 
                                        :on-remove="handleRemove" 
                                        :on-success="handleSuccess" 
                                        :on-error="handleError" 
                                         >
                                       <span>机构证件上传</span> <a></a>
                                    </el-upload>
                                 </div> 
                            <div id="register_upload_b">
                                 <img :src="imageUrl" v-if="imageUrl"/>  
                            </div>
                        </div>
                      
             </el-form>
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
             let pon = /^1[34578]\d{9}$/gi;
             if(value === '') {
                 callback(new Error('手机号码不能为空'))
             }else if(pon.test(value)){
                callback(new Error('请输入11位有效手机号码'))
             }
         }
         var validateCardNo = (rule, value, callback) => {
             let pon = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
             if(value === '') {
                 callback(new Error('身份证号码不能为空'))
             }else if(pon.test(value)){
                callback(new Error('请输入正确的身份证号码'))
             }
         }
       return {
           uploadImg:'/image-base/upload',
           imageUrl:'',
           dialogVisible:false,
          user: {
                
                username: '',//账户
                nickname:'',//真实姓名
                password: '',//密码
                confirmPassword:'',//密码确认
                phone:'',//手机
                eMail:'',//邮箱
                iDCardNo:'',//身份证号码
                iDCardPic:'',//机构图片
                checkWord:''//验证码
            },
            rules: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                nickname: [
                    { required: true, message: '请输入真实姓名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                confirmPassword:[
                    {validator : validatePass, trigger:'blur'}
                ],
                eMail:[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                ],
                 phone:[
                    {validator : validatePhone, trigger:'blur,change'}
                ],
                iDCardNo:[
                    {validator : validatePass, trigger:'blur'}
                ]
                 
            },
       }
     },
     methods:{
       validate(){
         this.$refs.ruleForm.validate((valid) => {
                if(valid) {
                     this.$message('成功')
                    
                }else {
                    console.log('error submit !')
                    return false
                }
            })
       },
       handlePictureCardPreview(file){
            console.log(file)
            // this.imageUrl = val.url
            this.dialogVisible = true
       },
       handleRemove(){

       },
       handleSuccess(val){
           console.log(val)
           this.imageUrl = val[0]

       },
       handleError(){

       }
     }
}
</script>

<style>
  /*已有账号马上登陆*/
#register_banner{
    width: 1200px;
    margin: 0 auto;
}
#register_enter{
    width: 1200px;
    height: 40px;
    padding-top: 40px;
    text-align: right;
    font-size: 16px;
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
    height: 94px;
    font-size: 32px;
    background-color: #6ca96e;
    text-align: center;
    line-height: 94px;
    color: white;
    border-radius: 20px 20px 0 0;
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
    height: 55px;
    font-size: 18px;
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
  font-size: 18px;
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
    height: 55px;
    background-color: #6ca96e;
    color: #ffffff;
    font-size: 24px;
    text-align: center;
    line-height: 55px;
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
    margin-top: 40px;
    margin-right: 40px;
}
#register_upload_t{
    position: relative;
}
#register_upload_t span{
    font-size: 18px;
    color: #393939;
}
#register_upload_t a {
    width: 50px;
    height: 25px;
    display: inline-block;
    margin-bottom: -4px;
}
#register_upload_t a img{
    width: 25px;
    height: 25px;
    display: block;
    margin-left: 10px;
}
#register_upload_b{
    width: 480px;
    max-height: 400px;
    min-height: 300px;
    overflow: hidden;
    margin-top: 40px;
    background-color: #F8F8F8;
   
}
#register_upload_b img{
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
