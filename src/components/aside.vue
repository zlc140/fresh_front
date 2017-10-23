<template>
    <el-col :span="24">
        <el-col :span="24">
            <div class="username " :title="name">{{name}}</div>
            <ul class="side_bar">
                <li v-for="(item,index) in sideData" :key="index" :class="$route.path == `/user/${item.path}`?'active':''">
                    <router-link :to="`/user/${item.path}`">
                        <span :class="`${item.icon}`"></span>{{item.name}}</router-link>
                </li>
            </ul>
        </el-col>
    </el-col>
</template>

<script>
export default {
    data() {
        return {
            sideData: [
                { path: 'infor', name: '个人资料', icon: 'infor' },
                { path: 'order', name: '我的订单', icon: 'order' },
                { path: 'coupon', name: '代金券', icon: 'coupon' },
                { path: 'address', name: '收货地址', icon: 'address' },
                { path: 'bill', name: '我的账单', icon: 'bill' }
            ]
        }
    },
    props: ['name'],

    computed: {
        onRouter() {
            //这里通过路由得到的侧边栏，注意设置默认样式时需要处理
            let routs = this.$route.path.split('/')
            return '/' + routs[1] + '/' + routs[2]
        }
    },
    mounted() {
       
        // console.log(this.$route.path)
    },
    methods: {
        handleopen() {
            // console.log('handleopen');
        },
        handleclose() {
            // console.log('handleclose');
        },
        handleselect: function (a, b) {
            console.log(this.onRouter + "组件中")
            this.$emit('handleselect', this.onRouter)

        },
        showMenu(i, status) {
            this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
        }
    }
}
</script>

<style lang="scss" scoped>
.username {
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    width: 223px;
    height: 58px;
    line-height: 58px;
    text-align: center;
    background-color: rgb(242, 242, 242);
    color: green;
    font-size: 18px;
    border: 1px solid #ddd;
}

a {
    text-decoration: none;
}

.side_bar {
    width: 225px;
    text-align: center;
    font-size: 16px;
    background-color: #fff;
    height: 600px;

    li {
        line-height: 58px;
        height: 58px;
        color: green;
        margin-top: 20px;
        a {
            font-size: 16px;
            color: green;
            display: inline-block;
            width: 200px;
            padding-left: 25px;
            text-align: left;
            height: 100%;
            span {
                display: inline-block;
                width: 58px;
                height: 58px;
                float: left;
            }
        }
    }
    li:nth-child(1) {
        margin-top: 0;
    }
    .active {
        background-color: rgb(94, 147, 96);
        a {
            color: #e4efff;
        }
    }
}
</style>
