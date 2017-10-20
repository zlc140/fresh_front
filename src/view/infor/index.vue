<template>
    <div class="container cl infor_index">
        <el-col :span="24">
            <div class="avatar fl">
                 <el-upload class="photo-uploader" 
                        ref="upload" 
                        :action="uploadImg" 
                        :show-file-list="false" 
                        :on-success="handleSuccess" 
                        :on-error="handleError" 
                                         >
                </el-upload>
                <img :src="photo" alt="">
            </div>
            <div class="detail">
                <ul>
                    <li>
                        <router-link to="/" title="">
                            <span class="icon order"></span>商城首页
                            <!-- <span class="">{{sum.couponAll}}</span> -->
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/user/coupon" title="">
                            <span class="icon coup"></span>我的代金券 
                            <!-- <span class="number">{{sum.couponNum}}</span> -->
                        </router-link>
                    </li>
                  
                    <li>
                        <router-link to="/user/bill" title="">
                            <span class="icon noPay"></span>我的账单
                            <!-- <span class="number">{{sum.noPay}}</span> -->
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/editOrder" title="">
                            <span class="icon order"></span>我的预订单
                            <!-- <span class="number"></span> -->
                        </router-link>
                    </li>
                </ul>
            </div>
        </el-col>
        <div class="sideBar">
            <side-bar :name="sum.nickname"></side-bar>
        </div>
        <div class="sideContent">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import userPhoto from '@/assets/face.jpg'
import sideBar from '@/components/aside'
import { getStore } from '@/config/storage'

import { getSummary,addMember } from '@/service'
export default {
    data() {
        return {
            uploadImg:'/image-base/upload',
            photo: userPhoto,
            sum: {
                nickname: getStore('username'),
                couponNum: 0,
                couponAll: 0,
                noPay: 0
            },


        }
    },
    components: {
        sideBar
    },
     mounted() {
        if(getStore('username') != null){
        
            getSummary().then(res=>{
                if(res.data.state == 200){
                    let sum = res.data.content
                    if (!sum.portrait) {
                        this.photo = userPhoto
                    }else{
                        this.photo = sum.portrait.path
                    }
                    // console.log(this.sum)
                    if (sum.nickname == '') {
                        sum.nickname = '用户'
                    }
                
                }else{
                        this.$message('/login')
                    }
            })
        }
    },
    methods: {
        handleSuccess(val){
            console.log('loadimg',val)
            if(val.state == 200 &&　val.content!=null){
               this.savePhoto(val.content.url)
            }else{
                this.$message('上传失败，只能上传jpg、jpeg、png、gif等格式的图片')
            }
        },
        handleError(val){
            
        },
        savePhoto(val){
                let prop = {
                    portraitStr:{
                        path:val
                    }
                }
                addMember(prop).then(res => {
                    console.log('photo',res)
                    if(res.data.state == 200){
                        this.photo = val
                    }else{
                        this.$message(res.data.messages)
                    }
                     
                })
        }

    }
}
</script>

<style lang="scss" >
.infor_index {
    margin-top: 40px;
    margin-bottom: 100px;
    .sideBar {
        width: 225px;
        margin-right: 15px;
        float: left;
    }
    .sideContent {
        width: 960px;
        float: left;
        background-color: white;
        min-height: 660px;
    }
    .avatar {
        width: 225px;
        height: 185px;
        margin-right: 15px;
        overflow: hidden;
        background: white;
        position: relative;
        &>img{
            width: 225px;
            position: absolute;
            left: 0;
            top: 50%;
            max-height: 180px;
            transform: translateY(-50%);
            -webkit-transform: translateY(-50%);
            -moz-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
             
        }
        .photo-uploader{
            width:100%;
            height:100%;
            z-index: 1;
            position: absolute;
            top: 0;
            left: 0;
            .el-upload{
                width:100%;
                height:100%;
            }
        }
    }
    a {
        text-decoration: none;
    }
    .detail {
        display: inline-block;
        width: 960px;
        height: 185px;
        background-color: #fff;
        margin-bottom: 18px;
        ul {
            width: 50%;
            padding: 20px 0 30px;
        }
        li {
            display: inline-block;
            width: 160px;
            margin-left: 70px;
            padding: 20px 0;
            font-size: 14px;
            .number {
                float: right;
            }
        }
        .icon {
            display: inline-block;
            width: 25px;
            height: 25px;
            float: left;
            margin-right: 5px;
        }
    }
    //    右侧内容部分的公共头部
    .top_select {
        margin-bottom: 10px;
        border-bottom: 2px solid green;
        height: 57px;
    }
    .top_select a.on {
        background-color: rgb(94, 147, 96);
        color: #fff;
    }

    .top_select a {
        margin-left: -1px;
        float: left;
        display: inline-block;
        width: 184px;
        height: 58px;
        line-height: 58px;
        text-align: center;
        font-size: 16px;
        letter-spacing: 1px;
        color: green;
        border: 1px solid green;
        box-sizing: border-box;
        vertical-align: middle;
        text-decoration: none;
        &:first-child {
            margin-left: 0;
        }
    }
}
.moreTxt{
	cursor: pointer;
	white-space: nowrap;
	overflow: hidden;
}
</style>
