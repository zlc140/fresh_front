<template>
    <div class="week_tel">
        <div class="container">
            <div class="week_tel_title">
                <div class="select_all">
                    <el-checkbox v-model="checkAllFlag" @change="checkAll()">全选</el-checkbox>
                </div>
                <div class="book_order">
                    <img src="../../assets/week_tel.jpg" alt="">
                    <a>预约订单</a>
                </div>
            </div>
            <div class="week_tel_content">
    
                <div class="div_7">
                    <template v-for="day in dayList">
                        <div class="day" :class="day.cur?'cur':''">
                            <div class="titl" :class="day.checked?'on':''" @click="sel(day)">
                                <el-checkbox v-model="day.checked" @change="selectDay(day)" class="input"></el-checkbox>
                                <span>{{day.title}}</span>
                            </div>
                            <div class="conten">
                                <div class="product_box">
                                    <template v-for="goods in day.goodsList">
                                        <div class="content-box">
                                            <div class="goods">{{goods.title}}</div>
                                            <div class="num">
                                                <a class="decrease" @click="changeMoney(goods,-1)">-</a>
                                                <input type="text" value="0" v-model="goods.quentity" min="0">
                                                <a class="increase" @click="changeMoney(goods,1)">+</a>
                                            </div>
                                            <div class="price">{{goods.price | currency }}
                                                <span>x</span>{{goods.quentity}}</div>
                                            <div class="hr" v-if="!goods.last"></div>
                                        </div>
                                    </template>
                                </div>
                                <div class="add">
                                    <a @click="aboutClick">+</a>
                                </div>
                                <div class="total" v-if="day.total">
                                    <span>总价：{{day.totalPrice | currency}}</span>
                                </div>
                            </div>
                        </div>
                    </template>
                    <edit :is-show="isShowDialog" @on-close="closeDialog('isShowDialog')" v-if="isShowDialog"></edit>
                </div>
    
                <div class="allPrice">
                    <span>总计：{{total1 | currency}}</span>
                </div>
    
            </div>
            <div class="edit">
                <a>保存</a>
                <a>保存映射至预订单</a>
                <a>返回</a>
            </div>
        </div>
    </div>
</template>
<script>
import Edit from './edit'
export default {
    components: {
        Edit
    },
    data() {
        return {
            checkAllFlag: false,
            total1: 0,
            isShowDialog: false,
            dayList: [
                {
                    title: '日',
                    total: true,
                    totalPrice: 25.80,
                    cur: false,
                    checked: false,
                    goodsList: [
                        {
                            title: '鸡毛菜 (100g)鸡毛菜 (100g)鸡毛菜 (100g)鸡毛菜 (100g)',
                            quentity: 1,
                            price: 16.80
                        },
                        {
                            title: '鸡毛菜 (100g)',
                            quentity: 1,
                            price: 16.80
                        },
                        {
                            title: '鸡毛菜 (100g)',
                            quentity: 1,
                            price: 16.80
                        },
                        {
                            title: '鸡毛菜 (100g)',
                            quentity: 1,
                            price: 16.80
                        },
                        {
                            title: '鸡毛菜 (100g)',
                            last: true,
                            quentity: 1,
                            price: 16.80
                        }
                    ]
                },
                {
                    title: '一',
                    cur: true,
                    checked: false,
                    goodsList: []
                },
                {
                    title: '二',
                    cur: false,
                    checked: false,
                    goodsList: []
                },
                {
                    title: '三',
                    total: true,
                    totalPrice: 25.80,
                    cur: true,
                    checked: false,
                    goodsList: [
                        {
                            title: '鸡毛菜 (100g)',
                            quentity: 1,
                            price: 16.80
                        },
                        {
                            title: '鸡毛菜 (100g)',
                            quentity: 1,
                            price: 16.80
                        },
                        {
                            title: '鸡毛菜 (100g)',
                            quentity: 1,
                            price: 16.80
                        },
                        {
                            title: '鸡毛菜 (100g)',
                            last: true,
                            quentity: 1,
                            price: 16.80
                        }
                    ]
                },
                {
                    title: '四',
                    cur: false,
                    checked: false,
                    goodsList: []
                },
                {
                    title: '五',
                    total: true,
                    totalPrice: 25.80,
                    cur: true,
                    checked: false,
                    goodsList: [
                        {
                            title: '鸡毛菜 (100g)',
                            quentity: 1,
                            price: 16.80
                        },
                        {
                            title: '鸡毛菜 (100g)',
                            quentity: 1,
                            price: 16.80
                        },
                        {
                            title: '鸡毛菜 (100g)',
                            quentity: 1,
                            price: 16.80
                        },
                        {
                            title: '鸡毛菜 (100g)',
                            last: true,
                            quentity: 1,
                            price: 16.80
                        }
                    ]
                },
                {
                    title: '六',
                    cur: false,
                    checked: false,
                    goodsList: [

                    ]
                },
            ]
        }
    },
    mounted() {
        this.totals()
    },
    methods: {
        closeDialog(attr) {
            this[attr] = false
        },
        aboutClick() {
            this.isShowDialog = true
        },
        changeMoney(item, way) {
            if (way > 0) {
                item.quentity++
            } else {
                item.quentity--
                if (item.quentity < 1) {
                    item.quentity = 1
                }
            }
            this.totals()
        },
        totals() {
            let _this = this
            _this.total1 = 0
            _this.dayList.forEach(function (ele) {
                ele.totalPrice = 0
                for (var j = 0; j < ele.goodsList.length; j++) {
                    ele.totalPrice += ele.goodsList[j].price * ele.goodsList[j].quentity
                }
                if (ele.checked) {
                    _this.total1 += ele.totalPrice
                }
            })
        },
        selectDay(day) {
            let _this = this
            _this.total1 = 0
            _this.checkAllFlag = true
            _this.dayList.forEach(function (ele, idx) {
                if (ele.checked) {
                    _this.total1 += ele.totalPrice
                } else {
                    _this.checkAllFlag = false
                }
            })
        },
        sel(day) {
            day.checked = !day.checked
            this.selectDay(day)
        },
        checkAll() {
            // this.checkAllFlag = this.checkAllFlag
            let _this = this
            _this.total1 = 0
            _this.dayList.forEach(function (ele, idx) {
                if (_this.checkAllFlag) {
                    _this.total1 += ele.totalPrice
                }
                if (typeof ele.checked == 'undefined') {
                    _this.$set(ele, "checked", _this.checkAllFlag)
                } else {
                    ele.checked = _this.checkAllFlag
                }
            })
        },
    }
}
</script>
<style scoped lang="scss">
 ::-webkit-scrollbar {
    width: 4px;
}

 ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
}

 ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgb(139, 186, 142);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
}

.week_tel {
    * {
        box-sizing: border-box;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .container {
        width: 1200px;
        margin: 0 auto;
        background: #fff;
        margin-top: 10px;
        height: 877px;
        .week_tel_title {
            font-size: 18px;
            color: rgb(106, 169, 112);
            height: 65px;
            border-bottom: 1px solid #eee;
            position: relative;
            .select_all {
                position: absolute;
                left: 10px;
                bottom: 10px;
                vertical-align: middle;
                input {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                }
            }
            .book_order {
                position: absolute;
                right: 40px;
                bottom: 10px;
                vertical-align: middle;
                a {
                    color: rgb(106, 169, 112);
                    display: inline-block;
                    width: 90px;
                    border-bottom: 1px solid rgb(106, 169, 112);
                }
            }
        }
        .week_tel_content {
            width: 1200px;
            .div_7 {
                overflow: hidden;
                .day {
                    width: 14.28%;
                    float: left;
                    .titl {
                        height: 90px;
                        text-align: center;
                        line-height: 90px;
                        position: relative;
                        font-size: 16px;
                        cursor: pointer;
                        border-bottom: 1px solid #eee;
                        .input {
                            display: inline-block;
                            width: 15px;
                            height: 15px;
                            position: absolute;
                            top: -30px;
                            ;
                            left: 10px;
                        }
                    }
                    .on {
                        background-color: rgb(108, 169, 110);
                        color: #fff;
                        border: 1px solid #eee;
                    }
                    .conten {
                        position: relative;
                        height: 460px;
                        padding: 10px;
                        padding-top: 20px;
                        border-bottom: 1px solid #eee;
                        .content-box {
                            .goods {
                                text-align: left;
                                font-size: 14px;
                                margin-bottom: 10px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            .num {
                                display: inline-block;
                                .decrease {
                                    display: inline-block;
                                    width: 18px;
                                    height: 18px;
                                    text-align: center;
                                    background-color: rgb(234, 234, 234);
                                    border: 1px solid #eee;
                                }
                                input {
                                    display: inline-block;
                                    width: 28px;
                                    height: 18px;
                                    text-align: center;
                                    border: none;
                                    border-top: 1px solid #eee;
                                    border-bottom: 1px solid #eee;
                                    vertical-align: top;
                                }
                                .increase {
                                    display: inline-block;
                                    width: 18px;
                                    height: 18px;
                                    text-align: center;
                                    background-color: rgb(234, 234, 234);
                                    border: 1px solid #eee;
                                }
                            }
                            .price {
                                float: right;
                                color: rgb(254, 157, 1);
                            }
                            .hr {
                                margin-bottom: 20px;
                                margin-top: 20px;
                                border-bottom: 1px solid #eee;
                            }
                        }

                        .add {
                            a {
                                display: inline-block;
                                width: 30px;
                                height: 30px;
                                line-height: 30px;
                                font-size: 24px;
                                border-radius: 50%;
                                text-align: center;
                                background-color: rgb(108, 169, 110);
                                color: #fff;
                                margin-top: 20px;
                                position: absolute;
                                bottom: 40px;
                                left: 70px;
                            }
                        }
                        .total {
                            position: absolute;
                            bottom: 0px;
                            right: 10px;
                            span {
                                color: rgb(254, 157, 1);
                                font-size: 16px;
                            }
                        }
                    }
                }
                .cur {
                    background-color: rgb(250, 250, 250);
                }
            }
            .allPrice {
                position: relative;
                height: 60px;
                line-height: 60px;
                border-bottom: 1px solid #eee;
                z-index: 0;
                span {
                    display: inline-block;
                    padding-right: 20px;
                    font-size: 18px;
                    color: rgb(254, 157, 1);
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    z-index: 0;
                }
            }
        }
        .edit {
            margin-top: 50px;
            a {
                display: inline-block;
                border: 2px solid rgb(108, 169, 110);
                padding: 10px 100px;

                margin-right: 30px;
                color: rgb(110, 169, 111);
                font-size: 20px;
            }
            a:first-child {
                margin-left: 140px;
            }
        }
    }
}

.product_box {
    width: 151px;
    height: 331px;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>
