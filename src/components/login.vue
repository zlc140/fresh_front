<template>
     <div class="content bgWhite pd100">
        <div class="login cl">
			<div class="fl left_box">
				<a href="javascript:" title="">
					<img src="../assets/login.jpg" alt="">
				</a>
			</div>
			<div class="fr right_box">
				<p class="title">会员登录</p>
				<el-form :model="user" :rules="rules" ref="ruleForm" label-position="center" v-loading="loginLoading" class="demo-ruleForm login-container" >
                    <el-form-item prop="username">
                    <el-input placeholder = "请输入用户名" v-model="user.username" @keyup.enter.native="check">
                    </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                    <el-input placeholder="请输入密码" type="password" v-model="user.password" @keyup.enter.native="check">
                    </el-input> 
                    </el-form-item>   
                    <el-form-item prop="checkWord">
                    <el-input type="checkWord" placeholder="验证码" v-model="user.checkWord" @keyup.enter.native="check" id="checkBox" class="checkBox">
                    </el-input> 
                    <div class="validation fr">
					    <!-- <el-button>发送验证码</el-button> -->
                        <img :src="codePic" @click="getCode"/>
				    </div>
                     <!-- <a class="forget">忘记密码？</a> -->
                    </el-form-item>
                      
                    <el-col class="denglu">
                        <el-button type="primary" class="btn" @click="check">登录</el-button>
                    </el-col>
                    <div class="register">
					<el-checkbox v-model="checked">下次自动登录</el-checkbox>
					<router-link to="/register"  class="new">新用户注册</router-link>
				</div>
                </el-form>
			</div>
		</div>
        </div>
</template>
<script>

 import axios from 'axios'
 import {getSummary,getCode} from '@/service'
 import {getStore,setStore } from '@/config/storage'
    export default {
        
        data() {
             var validatePass = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请输入密码'));
                } else {
                if(value.length<6 || value.length>12){
                    callback(new Error('密码应该为6-12个字符'));
                    }else if(!(/[^\d]/g).test(value)){
                    callback(new Error('密码不能全为数字'));
                    }else if(!(/[^a-zA-Z]/g).test(value)){
                    callback(new Error('密码不能全为字母'));
                    }
                    callback();
                }
                return callback()
            };
             var validateName = (rule, value, callback) => {
                    if(value.length>0 && value.trim() == '' ){
                        this.$refs.ruleForm.username = ''
                        callback(new Error('用户名不能为空'));
                    }else{
                        callback();
                    }
             }
            return {
                codePic:'http://192.168.0.9:8080/user-center/code',
                checked:false,
                loginLoading:false,
                user:{
                    username:'',
                    password: '',
                    checkWord:'',
                    key:''                
                },
                rules: {
                    username: [
                        { required: true, message: '账号不能为空', trigger: 'blur,change' },
                        { validator:validateName,trigger:'blur'}
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur,change' },
                        // { validator:validatePass,trigger:'blur'}
                    ],
                    checkWord:[
                        { required: true, message: '验证码不能为空', trigger: 'blur,change' }
                    ]
               
            },
            }
        },
        components:{
            
        },
         computed: {
            // 验证手机号
            rightPhoneNumber: function () {
                    return /^1[34578]\d{9}$/gi.test(this.user.username) 
            }
        },
        mounted() {
            this.getCode()
        },
        methods: {
            getCode(){
                 if(getStore('keyCode') == null){
                    let str = new Date().getTime()+''+Math.random()
                     setStore('keyCode',str)
                    this.user.key = getStore('keyCode') 
                }else{
                    this.user.key = getStore('keyCode') 
                }
                if(this.codePic.indexOf('?')>0){
                     this.codePic =  this.codePic.split('?')[0]
                }
                let news = new Date().getTime()
                this.codePic = this.codePic+'?key='+this.user.key+'&time='+news
                console.log(this.user.key)
            },
             getValue (url) {
                    let values = {}
                    if(url.indexOf('?') != -1 &&　url.indexOf('&') == -1) {
                        let str = url.substr(1)
                        let strs = str.split('redirect=');
                        values['redirect'] = strs[1]
                    }
                    if(url.indexOf('?') != -1 &&　url.indexOf('&') != -1){
                        let str = url.split('?')[1]
                        values['redirect'] = str.split('&')[0].split('=')[1]
                        values['query'] = str.split('&')[1].split('=')
                    }
                    return values
            }, 
            check () {
              let _this = this
              this.$refs.ruleForm.validate((valid) => {
                if(valid) {
                    this.loginLoading=true
                     _this.$store.dispatch('login',_this.user).then((res) => {
                         this.loginLoading=false
                            if(res == true){
                                // _this.checkLogin()
                                let url = decodeURIComponent(window.location.search)
                                if(url == ''){
                                    _this.$router.push('/index')
                                }else{
                                    console.log(_this.getValue(url).redirect)
                                    if(_this.getValue(url).query){
                                        let name = decodeURIComponent(_this.getValue(url).query[0])
                                        _this.$router.push({
                                            path:decodeURIComponent(_this.getValue(url).redirect),
                                            query:{
                                                id:decodeURIComponent(_this.getValue(url).query[1])
                                                }
                                        })

                                    }else{
                                         _this.$router.push (decodeURIComponent(_this.getValue(url).redirect))
                                    }
                                    
                                }
                            }else if(res== false){
                                this.getCode()
                                this.$message('登录失败！')
                            }else{
                                this.getCode()
                                this.$message(res)
                            }
                     })
                    }
                })

            },
            //  checkLogin(){
            //     getSummary().then((res) => {
            //         console.log(res)
            //     if(res == true){
            //         this.$message('资料未完善，请去完善资料！')
            //         let username = getStore('username')
            //         setStore('getName',JSON.stringify(username))
            //         this.getName = getStore('getName')
            //         this.$router.push('/stepTwo')
            //     }else if(res == false){

            //     }else{
            //         this.$store.commit('REMEMBER_NAME',res.username)
            //     }
            //     })
            // }
        }
    }
</script>
<style>
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
    .pd100{
        padding: 100px 0;
    }
    .login{margin: 0px auto;width:1200px;}
	.login .fl{float: left;}
	.login .fr{display: inline-block;}
	.login .fr .title{
		color: rgb(108,169,110);
		font-size: 24px;
		border-bottom: 1px solid #eee;
		padding-bottom: 20px;
		margin-bottom: 35px;
	}
	.login .fr .username{
		margin-bottom: 20px;
	}
    .login .el-input__inner{
        border-radius: 0;
        border: none;
        height: 39px;
        line-height: 39px;
        background-color: rgb(250,250,250); 
        font-size: 16px;
        letter-spacing: 2px;
    }
	.login .fr .username input{
		text-indent: 16px;
		display: inline-block;
		width: 370px;
		height: 39px;
		border:none;
		/* background-color: rgb(252,252,252); */
        /* background-color: #f0f0f0; */
		padding-right: 16px;
		padding-left: 16px;
    }
.login .fr input::-ms-input-placeholder{
    text-align: left;
    color: #bababa;
    opacity:1;
}
.login .fr input::-webkit-input-placeholder{
    color: #bababa;
    opacity:1;
    text-align: left;
}

.login .fr input::-moz-placeholder{
    color: #bababa;
    opacity:1;
    text-align: left;
}
.login #checkBox>input::-ms-input-placeholder{
    text-align: center;
}
.login #checkBox>input::-webkit-input-placeholder{
    text-align: center;
}
.login #checkBox>input::-moz-placeholder{
    text-align: center;
}
	.login .fr .password{
		margin-bottom: 20px;
	}
    .login .left_box{
        width:730px;
    }
    .login .right_box{
        width:370px;
        padding-left: 100px;
        overflow: hidden;
    }
	.login .fr .password input{
		text-indent: 16px;
		display: inline-block;
		width: 370px;
		height: 39px;
		border:none;
		background-color: rgb(252,252,252);
		padding: 0 16px;
	}
	/* .login .fr .validation input[type=text]{
		display: inline-block;
		width: 192px;
		height: 39px;
		border: none;
		background-color: rgb(252,252,252);
		letter-spacing: 3px;
		text-align: center;
	} */
		.login .fr .validation {
		display: inline-block;
		width: 176px;
		height: 39px;
		color: #fff;
		border: none;
		/* border:1px solid rgb(152,195,153); */
        border-radius: 0;
		text-align: center;
		line-height: 42px;
        letter-spacing: 2px;
		text-decoration: none;
	}
    .login .fr .validation img{
         width:176px;
        max-height: 39px;
        float: left;
    }
	.login .fr .forget{
		display: block;
		text-align: right;
		font-size: 12px;
		text-decoration: none;
		color: rgb(116,116,116);
        position: absolute;
        right: 0;
        top: 100%;
	}
	.login .fr .denglu{
		margin-bottom: 6px;
        margin-top: 24px;
	}
	.login .fr .denglu .el-button{
		display: inline-block;
		width: 370px;
        border-radius: 0;
		color: #fff;
		background-color: rgb(108,169,110);
		border: none;
		text-align: center;
		text-decoration: none;
		font-size: 18px;
	}
	.login .fr .register{
		font-size: 10px;
	}
	.login .fr .register .auto{
		text-decoration: none;
		color: #333;
	}
	.login .fr .register .new{
		float: right;
		font-size: 10px;
		color: rgb(108,169,110);
	}
</style>
