<template>
    <div class="right_nav" :class="carBoxShow?'showCar':''" v-on:mouseleave.stop="closeCarbox">
        <ul class="tab">
            <li class="tel">
                <i></i>
                <span>400-8851659</span>
            </li>
            <li class="car">
                <i @click="carShow"></i>
                <div class="addOne" v-if="addActive">+1</div>
            </li>
            <li class="ewm">
                <i></i>
                <span>
                    <img src="../assets/ewmP.jpg" />
                </span>
            </li>
            <li class="goTop" @click="goTop">
                <i></i>
            </li>
        </ul>
        <div class="carList">
            <shop-car v-if=" carBoxShow" @closeBox="closeBox"></shop-car>
             <div class="nullCar" v-if="userName==null || userName==''">
                您还没有登录，<router-link to="/login">快去登录吧！</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import shopCar from './carList'
import { getStore } from '@/config/storage'
export default {
    data() {
        return {
            carBoxShow: false,
            showCar:false,
            addActive:false
        }
    },
    props:{
        closeN:{
            type:Boolean,
            default:false

        }
    },
    computed:{
        lists(){
            return this.$store.state.shopCar.lists
        },
        userName(){
            return this.$store.state.username 
        }
         
    },
    components: {
        shopCar
    },
    mounted() {
        
       
    },
    watch: {
        '$route'(to, from) {
            const toPath = to.path
            const fromPath = from.path
            if (to.path != from.path) {
                this.carBoxShow = false
            }
        },
        'lists'(oldval,newval) {
           if(oldval != newval && !this.carBoxShow){
               let _this = this
               _this.addActive = true
               console.log(this.addActive)
               setTimeout(function(){
                    _this.addActive = false
               },1000)
           }
        }

    },
    methods: {
        closeBox(){
            this.carBoxShow = false
        },
        goTop() {
            if (document.documentElement.scrollTop) {
                document.documentElement.scrollTop = 0
            } else {
                document.body.scrollTop = 0
            }
        },
        carShow() {
            this.carBoxShow = !this.carBoxShow
        },
        closeCarbox(){
             this.carBoxShow = false
        }
    }
}
</script>

<style lang="scss">
.right_nav {
    width: 315px;
    height: 100%;
    padding: 5px 0;
    position: fixed;
    right: -280px;
    z-index: 9999;
    top: 0px;
    transition: all 0.5s;
    &:hover {
        background-color: #333;
    }
    .carList {
        //   display: none;
        position: absolute;
        height: 100%;
        width: 280px;
        background-color: white;
        position: absolute;
        z-index: 999;
        right: 0;
        top: 0;
    }
    .tab {
        position: absolute;
        top: 300px;
        width: 35px;
        li {
            width: 100%;
            height: 40px;
            padding: 5px 0;
            background-color: #333;
            position: relative;
            z-index: 998;
            &>i {
                display: inline-block;
                width: 100%;
                height: 40px;
                position: absolute;
                left: 0;
                top: 10px;
                z-index: 999;
                background-color: #333;
            }
            &>span {
                left: 0px;
                top: 10px;
                display: inline-block;
                position: absolute;
                line-height: 40px;
                padding: 0 10px;
                background-color: green;
                color: white;
                z-index: 997;
                white-space: nowrap;
                width: 100px;
                text-align: center;
                font-size: 16px;
                transition: all 0.5s;
                img {
                    width: 100px;
                    margin: 10px 0;
                }
            }
            &:hover {
                span {
                    left: -120px;
                }
                i {
                    background-color: green;
                }
            }
            .addOne{
                position: absolute;
                z-index: 999;
                background-color: red;
                border-radius: 50%;
                text-align: center;
                width:20px;
                height: 20px;
                color:white;
                top: 0px;
                animation: addNum 1s ease 1;
            }
        }
        .ewm {
            span {
                height: 0;
                overflow: hidden;
                left: -120px;
            }
            &:hover {
                span {
                    height: 120px;
                }
            }
        }
    }
}
.showCar {
    right: 0;
    background-color: #333; //   .carList{
    //       display: block;
    //   }
}
@keyframes addNum {
    0%{ opacity: 1;top:0px;}
    100%{opacity: 0;top:-30px;}
}
</style>
