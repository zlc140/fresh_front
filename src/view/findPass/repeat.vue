<template>
  <div class="findback">
     <div class="findback_top"> 重置密码</div>
     <div class="findback_detail">
       <el-form :model="user" :rules="rules" ref="ruleForm" label-position="center" v-loading="loginLoading" class="demo-ruleForm login-container" >
                    <el-form-item prop="password">
                    <el-input placeholder = "请设置6-12位长度的密码，包括数字,符号，英文" v-model="user.password" @keyup.enter.native="check" class="call_phone">
                      <template slot="prepend"> 
                              <span class="callfind"><strong>*</strong>请设置密码:</span>
                      </template>    
                    </el-input>
                    </el-form-item>
                    <el-form-item>
                  <el-input placeholder="请再次输入密码" type="password" v-model="user.confirmPassword" @keyup.enter.native="check" class="findback_call">
                    <template slot="prepend"> 
                              <span class="callfind"><strong>*</strong>请确认密码:</span>
                      </template>   
                    </el-input> 
                    </el-form-item>      
                     <el-col class="denglu">
                        <el-button type="primary" class="btn" @click="check">下一步</el-button>
                    </el-col> 
                </el-form>
     </div>
     <div class="findback_footer">©CopyRight 2006-2017 JB51.Net Inc All Rights Reserved. 脚本之家 版权所有</div>
  </div>
</template>

<script>

 import axios from 'axios'
    export default {
          data() {
                var validatePass = (rule,value,callback) => {
                if(value === ''){
                    callback(new Error('请再次输入密码'))
                }else if(value !== this.user.password) {
                    callback(new Error('两次输入的密码不一致'))
                }else{
                    callback()
                }
            };
            return {
                loginLoading:false,
                user:{
                    password: '',//密码
                    confirmPassword:'',//密码确认                
                },
                rules: {
                    password: [
                                { required: true, message: '请输入密码', trigger: 'blur' },
                            ],
                    confirmPassword:[
                                {validator : validatePass, trigger:'blur'}
                            ],
            },
            }
        },
        components:{
            
        },
         computed: {
           
        },
        mounted() {
            
        },
        methods: {
           check(){
                this.$refs.ruleForm.validate((valid) => {
                        if(valid) {
                            this.$message('成功')
                            
                        }else {
                            console.log('error submit !')
                            return false
                        }
                    })
                }
            }
    }
</script>
<style lang= "scss">
 .findback{
  
 .el-input-group__prepend {
    border-right: 0;
    border: none;
    float: left;
    font-size: 17px;
}
input::-moz-placeholder{
    color: #bababa;
    opacity:1;
    text-align: left;
}
.call_phone{
    width: 380px;
    height: 50px;
    position: relative;
    display: inline-block;
}
 
.callfind{
  position: absolute;
  top: 5px;
  left: -122px;
  color:#666;
}
.findback_call{
  width: 380px;
  display: inline-block;
  position: relative;
  position: absolute;
  top: 5px;
  left: 370px;

}
.el-input-group>.el-input__inner {
    vertical-align: middle;
    display: table-cell;
    height: 40px;
    border-radius: 5px 5px;
    font-size: 16px;
}
.el-form-item__content {
    line-height: 36px;
    position: relative;
    font-size: 14px;
    text-align: center;
}
.fr {
    float: right;
    margin-right: 370px;
}
	.el-form-item__error {
    color: #ff4949;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 106%;
    right: 215px;
}
.fr .el-button {
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c4c4c4;
    color: #1f2d3d;
    margin: 0;
    padding: 10px 15px;
    border-radius: 4px;
    width: 145px;
    height: 50px;
    margin-top: 5px;
    font-size: 16px;
    color: #6ca96e;
}

.denglu .el-button {
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
    margin-left: 480px;
    background-color: #6ca96e;
}
.el-input:first-child {
    margin-left: 77px;
}
 }
</style>
