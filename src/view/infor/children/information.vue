<template>
  <div>
     <div class="top_select cl">
         <a @click="getList('one')" :class="select=='one'?'on':''">个人信息</a>
         <a @click="getList('two')" :class="select=='two'?'on':''">修改密码</a>
      </div>
	  <div class="form" v-show="select=='one'">
	  	<el-form ref="ruleForm" :model="formData" :rules="rules" label-width="80px">
		  <el-form-item label="姓名" prop="name">
		    <el-input v-model="formData.name" placeholder="请输入你的姓名"></el-input>
		  </el-form-item>
		  <el-form-item label="邮箱" prop="email">
		    <el-input v-model="formData.email" placeholder="请输入你的邮箱"></el-input>
		  </el-form-item>
		  <el-form-item label="机构名" prop="agency">
		    <el-input v-model="formData.agency" placeholder="请输入你的所在机构"></el-input>
		  </el-form-item>
		  <el-form-item label="手机号" prop="number">
		    <el-input v-model="formData.number" placeholder="请输入你的号码"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit">确认修改</el-button>
		  </el-form-item>
	  	</el-form>
	  </div>
	  <div class="form2" v-show="select=='two'">
		<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
		  <el-form-item label="旧密码" prop="oldPass">
		    <el-input v-model="ruleForm2.oldPass" type="password" placeholder="请输入你的旧密码"></el-input>
		  </el-form-item>
		  <el-form-item label="新密码" prop="pass">
		    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入你的新密码"></el-input>
		  </el-form-item>
		  <el-form-item label="确认密码" prop="checkPass">
		    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请确认你的密码"></el-input>
		  </el-form-item>
		  
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit">确认修改</el-button>
		  </el-form-item>
		</el-form>
	  </div>
  </div>
</template>

<script>
export default {
data() {
	var validateNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号码不能为空'));
        }
        let re = /^1[3|4|5|7|8][0-9]{9}$/g
        if(!re.test(value)){
          return callback(new Error('请输入合法的手机号码'));
        }
        return callback()
      };
	var validateEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        }
        let re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ig
        if(!re.test(value)){
          return callback(new Error('邮箱不符合规则,请输入合法的邮箱'));
        }
        return callback()
      };
	var validateAgency = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('机构名不能为空'));
        }
        let re = /[^\w\u4e00-\u9fa5]/g
        if(re.test(value)){
        	return callback(new Error('含有非法字符'));
        }
        return callback()
      };
	 var validateName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('姓名不能为空'));
        }
        let re = /[^\w\u4e00-\u9fa5]/g
        if(re.test(value)){
        	return callback(new Error('含有非法字符'));
        }
        return callback()
      };
      var checkOldPass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('旧密码不能为空'));
        }
        return callback()
      };
      var validatePass = (rule, value, callback) => {

        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if(value.length<6 || value.length>16){
        	callback(new Error('密码应该为6-16个字符'));
        	}else if(!(/[^\d]/g).test(value)){
        	callback(new Error('密码不能全为数字'));
        	}else if(!(/[^a-zA-Z]/g).test(value)){
        	callback(new Error('密码不能全为字母'));
        	}
          	callback();
        }
        return callback()
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
      	select:'one',
        formData: {
          name: '',
          email: '',
          agency: '',
          number: ''
        },
        rules:{
  			  name: [
	            { validator: validateName, trigger: 'blur' }
	          ],
	          email: [
	            { validator: validateEmail, trigger: 'blur' }
	          ],
	          agency: [
	            { validator: validateAgency, trigger: 'blur' }
	          ],
	          number: [
	            { validator: validateNumber, trigger: 'blur' }
	          ]

        },
        ruleForm2: {
          pass: '',
          checkPass: '',
          oldPass: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          oldPass: [
            { validator: checkOldPass, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
    	onSubmit() {
        console.log('submit!');
      },
      getList(val){
        this.select = val
          if(this.select=='one'){
            this.$refs.ruleForm.resetFields();
          }
          if(this.select=='two'){
            this.$refs.ruleForm2.resetFields();
          }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    
	}

  }
</script>

<style>
  .form{
  	width: 100%;
  	height: 100%;
  	position: relative;
  }
  .form .el-input__inner {width: 353px;}
  .form .el-form{
  	display: inline-block;
  	position: absolute;
  	left: 50%;
  	top: 50%;
  	margin-left: -216.5px;
  	margin-top: 73px;
  }
  .el-button{width: 353px;background-color: #fff;border: 1px solid rgb(94,147,96);color:green; }
  .el-button:hover{
  	background-color: #fff;border: 1px solid rgb(94,147,96);color:green;
  }
  .el-button--primary{
  	background-color: #fff;border: 1px solid rgb(94,147,96);color:green;
  }
  .el-button--primary:hover{background-color: #fff;border: 1px solid rgb(94,147,96);color:green;}
  .el-form-item__label{
  	color: #333;
  }
  .form2{
  	width: 100%;
  	height: 100%;
  	position: relative;
  }
  .form2 .el-form{
  	display: inline-block;
  	position: absolute;
  	left: 50%;
  	top: 50%;
  	margin-left: -226.5px;
  	margin-top: 73px;
  }
  .el-button--primary:focus, .el-button--primary:hover {
  	background-color: rgb(94,147,96);
  	color: #fff;
  	border: 1px solid rgb(94,147,96);
  }
</style>