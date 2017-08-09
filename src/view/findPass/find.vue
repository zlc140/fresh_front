<template>
    <div class="findback">
        <div class="findback_top"> 手机找回密码</div>
        <div class="findback_detail">
            <el-form :model="user" :rules="rules" ref="ruleForm" label-position="center" v-loading="loginLoading" class="demo-ruleForm login-container" style="text-align: center;">
                <el-form-item prop="phone">
                    <el-input placeholder="请输入手机号码" v-model="user.phone" @keyup.enter.native="check">
                        <template slot="prepend">
                            <span class="call">
                                <strong>*</strong>手机号:</span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="checkWord">
                    <el-input placeholder=875643 type="password" v-model="user.checkWord" @keyup.enter.native="check" class="findback_call">
                        <template slot="prepend">
                            <span class="callfind">
                                <strong>*</strong>请输入验证码:</span>
                        </template>
                    </el-input>
                    <div class="validation fr">
                        <el-button v-on:click="times">{{find}}</el-button>
                    </div>
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
        return {
            find: "发送验证码",
            checked: false,
            loginLoading: false,
            user: {
                phone: '',//手机
                checkWord: '',//验证码             
            },
            rules: {
                phone: [
                    { required: true, message: '账号不能为空', trigger: 'blur change' },
                ],
                checkWord: [
                    { required: true, message: '验证码不能为空', trigger: 'blur change' }
                ]

            },
        }
    },
    components: {

    },
    computed: {
        // 验证手机号
        rightPhoneNumber: function () {
            return /^1[34578]\d{9}$/gi.test(this.user.username)
        }
    },
    mounted() {
        console.log(this.user),
            this.times
    },
    methods: {
        check() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.loginLoading = true
                    axios({
                        method: 'post',
                        url: '/login',
                        data: this.user
                    }).then((res) => {
                        this.loginLoading = false
                        console.log(res.data)
                    }).catch((res) => {
                        this.loginLoading = false
                        console.log(res)
                    })
                }
            })
        },
        times() {
            var self = this;
            var count = 60;
            self.find = count;
            var timer = setInterval(function () {
                self.find--;
                if (self.find <= 0) {
                    clearInterval(timer)
                    self.find = "重新发送";
                }
            }, 1000)
        }
    }
}
</script>
<style  lang= "scss">
.findback {

    .findback_call {
        padding-left: 230px;
    }
    .call{
        color: #666;font-size: 16px;
    }
    .callfind {
        padding-left: 62px;
        color: #666;
        font-size: 16px;
    }

    input::-moz-placeholder {
        color: #bababa;
        opacity: 1;
        text-align: left;
    }
    .el-input-group>.el-input__inner {
        vertical-align: middle;
        display: table-cell;
        height: 40px;
        border-radius: 5px 5px;
    }
    .el-input:first-child {
        margin-left: 20px;
    }
    .fr {
        float: right;
        margin-right: 338px;
    }
    .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 44px;
        right: 215px;
    }
    .el-button {
        background: #fff;
        border: 1px solid #c4c4c4;
        color: #6ca96e;
        padding: 9px 15px;
        width:100px;
        text-align: center;
    }
    .fr .el-button[data-v-70332348] {
        display: inline-block;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #c4c4c4;
        color: #1f2d3d;
        padding: 10px 15px;
        border-radius: 4px;
        width: 120px;
        height: 37px;
        line-height: 37px;
        margin-top: 7px;
        font-size: 16px;
        color: #6ca96e;
        display: inline-block;
        margin-right: 27px;
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
        background-color: #6ca96e;
    }
    .el-input-group__prepend {
        border: none;
    }
    .el-input-group {
        line-height: normal;
        display: inline-table;
        width: 42%;
        border-collapse: separate;
    }
}
</style>
