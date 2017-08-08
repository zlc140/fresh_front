<template>
    <div class="container cl infor_index">
        <el-col :span="24">
            <div class="avatar fl">
                <img :src="sum.photo" alt="">
            </div>
            <div class="detail">
                <ul>
                    <li>
                        <a href="javascript:" title="">
                            <span class="icon coup"></span> 我的代金券
                            <span class="number">{{sum.couponNum}}</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:" title="">代金券总额
                            <span class="">{{sum.couponAll}}</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:" title="">
                            <span class="icon noPay"></span>未支付订单
                            <span class="number">{{sum.noPay}}</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:" title="">
                            <span class="icon order"></span>我的预订单
                            <span class="number"></span>
                        </a>
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

import { getSummary } from '@/service'
export default {
    data() {
        return {
            sum: {
                nickname: '未登录',
                photo: userPhoto,
                couponNum: 0,
                couponAll: 0,
                noPay: 0
            }

        }
    },
    components: {
        sideBar
    },
    async mounted() {
        this.sum = await getSummary()
        if (this.sum.photo == null) {
            this.sum.photo = userPhoto
        }
        // console.log(this.sum)
        if (this.sum.nickname == '') {
            this.sum.nickname = '用户'
        }

    },
    methods: {

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
        height: 660px;
    }
    .avatar {
        width: 225px;
        margin-right: 15px;
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
</style>
