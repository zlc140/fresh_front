<template>
    <div class="findback">
        <div class="findback_top"> 修改成功</div>
        <div class="findback_detail">
            <span class="findback_icon">
                <i class="el-icon-check"></i>
            </span>
            <span class="findback_a">
                <a>您的新密码已经修改成功</a>
                <span>{{time}}</span>秒后为你跳转到
                <a @click="logins"> 登录 </a>页面</span>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
export default {
    data() {
        return {
            time: 5
        }
    },
    mounted() {
        this.times()
    },
    methods: {
        times() {
            var self = this;
            var timer = setInterval(function () {
                self.time--;
                if (self.time <= 0) {
                    clearInterval(timer);
                    self.logins()
                }
            }, 1000)
        },
        logins() {
            this.$router.push({ path: '../../login' })
        }
    }
}
</script>
<style lang= "scss">
.findback {

    .findback_detail {
        width: 1200px;
        height: 500px;
        padding-top: 70px;
        text-align: center;
        background-color: #fff;
        position: relative;

        .findback_icon {
            width: 25px;
            height: 25px;
            display: inline-block;
            margin: 0 10px;
            border-radius: 50%;
            background-color: #6ca96e;
        }
        .findback_icon i {
            text-align: center;
            line-height: 25px;
            color: #fff;
        }
        .findback_a {
            font-size: 16px;
            a {
                color: #6ca96e;
            }
        }
    }
}
</style>
