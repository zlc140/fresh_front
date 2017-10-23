<template>
  <div>
         <div id="register_banner">
        <!--已有账号马上登陆-->
        <div id="register_enter">
           已有账号 ， <router-link to="/login">马上登录</router-link>
        </div>
        <!--会员注册-->
      <div id="register_member">
          <div id="register_member_t">
              <img :src="step" />
          </div>
          <div id="register_member_b" v-loading="loginLoading">
                <el-form style="width:500px;idisplay:block;margin:0 auto;" :model="user" :rules="rules" ref="ruleForm" label-position="center" class="demo-ruleForm login-container" >
                    <el-form-item prop="username" >
                        <el-input placeholder = "您的用户名用于登录您的账号" auto-complete="on" v-model="user.username">
                            <template slot="prepend"> 
                             <span class="reds">*</span><span>用 户 名</span>
                            </template>    
                        </el-input>
                    </el-form-item>
                     <el-form-item prop="name">
                        <el-input placeholder = "请输入您的真实姓名" auto-complete="on" v-model="user.name">
                           <template slot="prepend"> 
                              <span class="reds">*</span><span>真实姓名</span>
                            </template>   
                        </el-input>
                    </el-form-item>
                     <!-- <el-form-item prop="nickName">
                        <el-input placeholder = "请输入您的昵称" auto-complete="on" v-model="user.nickName">
                           <template slot="prepend"> 
                              <span>昵　　称</span>
                            </template>   
                        </el-input>
                    </el-form-item> -->
                    <el-form-item prop="phone"> 
                        <el-input placeholder="请输入11位手机号码" type="text" auto-complete="off" v-model="user.phone">
                           <template slot="prepend"> 
                              <span class="reds">*</span><span>手 机 号</span>
                            </template> 
                        </el-input> 
                    </el-form-item> 
                    <el-form-item prop="password">
                        <el-input placeholder="密码长度6~20位数" type="password" auto-complete="off" v-model="user.password">
                            <template slot="prepend"> 
                              <span class="reds">*</span><span>密　　码</span>
                            </template> 
                        </el-input> 
                    </el-form-item> 
                    <el-form-item prop="confirmPassword"> 
                        <el-input placeholder="请确认您的密码" type="password" auto-complete="off" v-model="user.confirmPassword">
                           <template slot="prepend"> 
                              <span class="reds">*</span><span>确认密码</span>
                            </template>
                        </el-input> 
                    </el-form-item>
                     <el-form-item prop="eMail"> 
                        <el-input placeholder="请输入有效的邮箱" type="text" auto-complete="off" v-model="user.eMail">
                           <template slot="prepend"> 
                              <span class="reds"> </span><span>邮箱地址<small>（可空）</small></span>
                            </template> 
                        </el-input> 
                    </el-form-item>  
                   
                    <!-- <el-form-item prop="checkWord">
                        <el-input type="checkWord" v-model="user.checkWord" @keyup.enter.native="check" class="checkBox">
                          <template slot="prepend"> 
                              <span>手机验证码</span>
                            </template> 
                            </el-input> 
                        <div class="validation fr">
                           <el-button>发送验证码</el-button> 
                        </div>
                      </el-form-item> -->
                        
                        <div id="register_email">
                              <!-- <a href="">使用邮箱注册</a> -->
                              <!-- <span >已有账号
                              <router-link to="/login">去登陆</router-link></span> -->
                        </div> 
                       
             </el-form>
             <el-button type="primary" class="btn " @click="validate" id="register_button">下一步</el-button>
          </div>
          <!--底部-->
          <div id="register_footer">
              <span>上海嘉善科技有限公司  &copy版权所有</span>
              <!-- <span class="interval">|</span>
              <span>海嘉善科技有限公司</span>
              <span class="interval">|</span>
              <span>海嘉善科技有限公司</span> -->
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import step1 from '@/assets/images/step1.png'
import {Register,login} from '@/service'
import {setStore} from '@/config/storage'
export default {
     data(){
          var noSpace = (rule, value, callback) => {
                    if(value.length>0 && value.trim() == '' ){
                        callback(new Error('不能全部输入空格'));
                    }else{
                        callback();
                    }
             }
         var validateCompare = (rule,value,callback) => {
             if(value === ''){
                 callback(new Error('请再次输入密码'))
             }else if(value !== this.user.password) {
                 callback(new Error('两次输入的密码不一致'))
             }else{
                 callback()
             }
         }
          var validatePass = (rule,value,callback) => {
              let pon = /^[A-Za-z0-9_]{6,20}$/;
             if(value === '') {
                 callback(new Error('密码不能为空'))
             }else if(!pon.test(value)){
                callback(new Error('密码为数字字母下划线组成，长度6-20位'))
             }else{
                  callback()
             }
             
         }
         var validateUser = (rule, value, callback) => {
              let par = /^[0-9a-zA-Z_]{2,18}$/;
            if(value.length>0 && value.trim() == '' ){
                        callback(new Error('不能全部输入空格'));
            }else if(!par.test(value.trim()) ) {
                 callback(new Error('用户名为2~18位数字与英文字母下划线组成'))
             }else{
                 callback()
             }
         }
         var validatePhone = (rule, value, callback) => {
             let pon = /^1[34578]\d{9}$/gi;
             if(value === '') {
                 callback(new Error('手机号码不能为空'))
             }else if(!pon.test(value.trim())){
                callback(new Error('请输入11位有效手机号码'))
             }else{
                  callback()
             }
         }
         var validateCardNo = (rule, value, callback) => {
             let pon = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
             if(pon.test(value.trim())){
                callback(new Error('请输入正确的身份证号码'))
             }else{
                  callback()
             }
         }
       return {
            loginLoading:false,
            step:step1,
            uploadImg:'/image-base/upload',
            imageUrl:'',
            dialogVisible:false,
            user: {
               
                username: '',//账户
                name:'',//真实姓名
                nickName:'',//昵称
                password: '',//密码
                confirmPassword:'',//密码确认
                phone:'',//手机
                eMail:'',//邮箱
                idCardNo:'',//身份证号码
                idCardPicStr:{},//机构图片
                // checkWord:''//验证码
            },
            rules: {
                username: [
                    { required: true, message: '请输入您的用户名', trigger: 'blur' },
                    { validator:validateUser, trigger:'blur'}
                ],
               
                name: [
                    { required: true, message: '请输入真实姓名', trigger: 'blur' },
                    {validator:noSpace, trigger:'blur'}
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { validator : validatePass, trigger:'blur' }
                ],
                confirmPassword:[
                    {validator : validateCompare, trigger:'blur'}
                ],
                eMail:[
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                ],
                phone:[
                    { required: true, message: '请输入正确的电话号码', trigger: 'blur' },
                    {validator : validatePhone, trigger:'blur,change'}
                ],
                iDCardNo:[
                    {validator : validateCardNo, trigger:'blur'}
                ]
                 
            },
       }
     },
     methods:{
       validate(){
           let _this = this
           
         this.$refs.ruleForm.validate((valid) => {
                if(valid) {
                    this.loginLoading = true
                    let prop = Object.assign({},this.user)
                    prop.username = prop.username.trim()
                    prop.phone = prop.phone.trim()
                    console.log(prop)
                    Register(prop).then((res) => {
                        _this.loginLoading = false
                        if(res == true){
                            _this.login()
                        }else if(res == false){
                            _this.$message('注册失败')
                        }else{
                             _this.$message(res)
                        }
                    })
                    
                }else {
                    console.log('error submit !')
                    return false
                }
            })
       },
       login(){
            let _this = this
            let prop = {
                username:this.user.username,
                password:this.user.password
            }
             _this.$store.dispatch('login',prop).then(() => {
                  setStore('getName',JSON.stringify(prop.username))
                  _this.$router.push('/stepTwo')
             })
            // login(prop).then(res => {
            //     console.log(res)
            //     if(res.data.state == 'SUCCESS'){
            //         _this.setStore('getName',prop.username)
            //         _this.$router.push('/stepTwo')
            //     }
            // })
       },
       handleRemove(){

       },
       handleSuccess(val){
           console.log(val)
           if(val.state == 200){
            this.imageUrl = val.content.url
           }else{
               this.$message('上传失败')
           }
           

       },
       handleError(){
            this.$message('上传失败')
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
    padding:30px 50px 50px;
    overflow: hidden;
    position: relative;
    text-align: center;
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
    position: absolute;
    top: 10px;
    left: 600px;
    margin-top: 20px;
    margin-right: 40px;
}

/*底部*/
#register_footer{
    text-align: center;
    color: #c3c3c3;
    font-size: 16px;
    margin:20px 0 50px;
}
</style>
