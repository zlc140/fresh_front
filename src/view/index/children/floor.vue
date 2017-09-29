<template>
    <div class="container" id="floor">
        <div v-for="(item, index) in floorList" :key="index">
            <div v-if="item.type == 'FLOOR_IMAGES'" class="one_template">
                <div class="reduce">
                    <img :src="item.titleImage.path" :alt="item.title" v-if="item.titleImage.path != ''">
                    <p v-else>{{item.title}} </p>
                </div>
                <div class="div_3">
                    <ul class="div_3_list cl">
                        <li v-for="(child,index) in item.body[0].images" :key="index" :class="index == 3 ?'big':''">
                            <a :href="child.url">
                                <img :src="child.path" :alt="child.title">
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="two_template" v-if="item.type=='FLOOR_GOODS'">
                <div class="reduce" >
                    <img :src="item.titleImage.path" :alt="item.title" v-if="item.titleImage.path != ''">
                    <p v-else>{{item.title}} </p>
                </div>
                <div class="div_2">
                    <ul>
                        <!-- <li>
                            <a href="javascript:">
                                <img class="img" :src="classPic" alt=""/>
                            </a>
                            <div class="full_blown_price">
                                <h1>全場驚爆價</h1>
                                <div class="line"></div>
                                <p>直降100元</p>
                            </div> 
    				    </li> -->
                        <li v-for="(child,id) in item.body" :key="id" class="list">
                            <a :href="child.image.url">
                                <img :src="child.image.path" :class="child.goods.length>0?'img1':''">
                            </a>
                            <div class="detail" v-if="child.goods.length>0">
                                <ul class="cl">
                                    <li class="" v-for="(son ,index) in child.goods" :key="index">
                                        <a href="javascript:" title="">
                                            <img class="img2" :src="son.goodsPic[0].path" alt="">
                                            <p class="price">{{son.price.GOODS_MARKET_PRICE | currency}}</p>
                                        </a>
                                    </li>
                                </ul>
                                <div class="more_box">
                                    <a class="more" :href="child.image.url">查看更多</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

 

import { getFloor } from '@/service'

export default {
    data() {
        return {
            floorList: []
        }

    },
    mounted() {
        let _this = this
        getFloor().then(res => {
            if (res.data.state == 200) {
                console.log('floor',res.data)
                _this.floorList = res.data.content
                console.log(_this.floorList)
            }
        })
    }
}
</script>

<style lang="scss" scoped>
#floor {
    background-color: white;
    .reduce {
        height: 70px;
        line-height: 70px;
        font-size: 20px;
        overflow: hidden;
        img {
            width: 100%;
        }
    }
    .one_template {
        .div_3 {
            ul {
                width: 100%;
                li {
                    width: 390px;
                    height:200px;
                    overflow: hidden;
                    float: left;
                    margin-left: 15px;
                    a{
                        display: inline-block;
                        width:100%;
                        height: 100%;
                        position: relative;
                    }
                    img {
                        width: 100%;
                        position: absolute;
                        left: 0;
                        top: 0;
                        bottom: 0;
                        top: 0;
                        margin: auto;

                    }
                    &:first-child {
                        margin-left: 0;
                    }
                }
                .big {
                    width: 100%;
                    margin: 15px 0;
                }
            }
        }
    }
}

.div_2 {
    ul {
        overflow: hidden;
    } // margin-bottom: 20px;~
    .list {
        overflow: hidden;
        float: left;
        width: 590px;
        height: 280px;
        position: relative;
        margin-bottom: 20px;
        a {
            display: inline-block;
            width: 100%;
            img {
                width: 100%;
            }
        }
    }
    .detail {
        opacity: 0;
        width: 550px;
        height: 240px;
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        text-align: center;
        box-shadow: 0px 0px 10px 7px rgba(0, 0, 0, 0.1);
        -webkit-transition: all .5s;
        -o-transition: all .5s;
        -moz-transition: all .5s;
        transition: all .5s;
        li {
            float: left;
            position: relative;
        }
    }
}

.div_2 li:nth-child(2n) {
    margin-left: 20px;
}

.div_2 .detail li {
    margin-left: 40px;
    margin-top: 15px;
    width: 125px;
    height: 145px;
    overflow: hidden;
    a {
        padding-top: 5px;
        display: inline-block;
        width: 100%;
        height: 125px;
        padding-bottom: 20px;
        overflow: hidden;
        position: relative;
        img {
            height: 120px;
            width: 120px;
        }
        p {
            text-align: center;
            width: 100%;
        }
    }
}

.div_2 .detail li:last-child {
    margin-right: 0;
}

a {
    text-decoration: none;
}

.div_2 .detail .price {
    color: rgb(88, 88, 88);
}

.div_2 .detail .more_box {
    border-top: 1px dashed #333;
    margin-top: 20px;
}

.div_2 .detail .more {
    border: 1px solid #333;
    padding: 5px 30px;
    display: inline-block;
    position: absolute;
    bottom: 10px;
    right: 15px;
    width: 50px;
    cursor: pointer;
}

.div_2 .detail .more:hover {
    background-color: #6CA96E;
    color: #fff;
    border-color: #6CA96E;
}

.div_2 li:hover .img1 {
    filter: url(blur.svg#blur);
    /* FireFox, Chrome, Opera */
    -webkit-filter: blur(5px);
    /* Chrome, Opera */
    -moz-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
    filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=5, MakeShadow=false);
    /* IE6~IE9 */
}

.div_2 li:hover .detail {
    opacity: 1;
}

.div_2 li:hover .img {
    opacity: .5;
}

.div_2 .detail li:hover .img2 {
    animation: myfirst 1s;
    -moz-animation: myfirst 1s;
    /* Firefox */
    -webkit-animation: myfirst 1s;
    /* Safari 和 Chrome */
    -o-animation: myfirst 1s;
}

@keyframes myfirst {
    0% {
        opacity: 1;
    }
    50% {
        opacity: .5;
    }
    100% {
        opacity: 1
    }
}

@-moz-keyframes myfirst {
    0% {
        opacity: 1;
    }
    50% {
        opacity: .5;
    }
    100% {
        opacity: 1
    }
}

@-webkit-keyframes myfirst {
    0% {
        opacity: 1;
    }
    50% {
        opacity: .5;
    }
    100% {
        opacity: 1
    }
}

@-o-keyframes myfirst {
    0% {
        opacity: 1;
    }
    50% {
        opacity: .5;
    }
    100% {
        opacity: 1
    }
} // 楼层中间小广告的样式，暂时没有，对应上方注释的部分
.div_2 .full_blown_price {
    opacity: 0;
    width: 270px;
    height: 150px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -75px -135px;
    text-align: center;
    border-radius: 4px;
    box-shadow: 10px 10px 3px rgba(0, 0, 0, .3);
    -webkit-transition: all .5s;
    -o-transition: all .5s;
    -moz-transition: all .5s;
    transition: all .5s;
}

.div_2 li:hover .full_blown_price {
    opacity: 1;
}

.div_2 .full_blown_price h1 {
    margin-top: 38px;
    color: rgb(108, 169, 110);
}

.div_2 .full_blown_price .line {
    width: 223px;
    height: 0;
    border-top: 1px solid rgb(170, 209, 171);
    margin: 10px auto;
}

.div_2 .full_blown_price p {
    color: rgb(146, 202, 148);
}
</style>
