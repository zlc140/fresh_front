<template>
     <div class="content">
         <!--图片只有一张时  -->
          <div class="img_box" v-if="bannerList.length == 1">
              <img :src='bannerList[0].path' :alt="bannerList[0].title" />
          </div>
          <!--滑动  -->
          <el-carousel v-if="type=='slide' && bannerList.length > 1 " :autoplay='false' trigger="click" indicator-position="outside" :interval="9000"   arrow="never" height="470px">
                <el-carousel-item v-for="item in 4" :key="item">
                 <img :src='bannerList[0].path' :alt="bannerList[0].title"/>
                </el-carousel-item>
          </el-carousel>
     <!--淡入淡出  -->
        <div class="carousel" v-if="type=='fade' && bannerList.length > 1 ">
            <ul>
                <li v-for="(item,idx) in bannerList" :key="idx" :class="idx === curIndex?'on':''" @mouseover="Over" @mouseout="autoPlay">
                    <img :src="item.path" />
                </li>
            </ul>
            <div class="btn-box">
                <span v-for="(item, idx) in bannerList" :key="idx" :class=" idx === curIndex?'on':''" @click="setState(idx)"></span>
            </div>
        </div>
      </div>
</template>

<script>
import banner from '@/assets/images/banner.jpg'
export default {
    props:['type'],
    data() {
        return {
            timer: null,
            curIndex: 0,
            bannerList: [
                {
                    path: banner,
                    title: '首页banner图'
                },
                {
                    path: banner,
                    title: '首页banner图'
                },
                {
                    path: banner,
                    title: '首页banner图'
                }

            ]
        }
    },
    methods: {
        setState(idx) {
            const vm = this
            clearInterval(vm.timer)
            vm.curIndex = idx
            vm.autoPlay()
            console.log(vm.curIndex, idx)
        },
        autoPlay() {
            const vm = this
            clearInterval(vm.timer)
            vm.timer = setInterval(function () {
                vm.curIndex++
                if (vm.curIndex > vm.bannerList.length - 1) {
                    vm.curIndex = -1
                    vm.curIndex++
                }
            }, 2000)
        },
        Over() {
            clearInterval(this.timer)
        }
    },
    mounted() {
        const vm = this
        vm.$nextTick(function () {
            vm.autoPlay()
        })
    }
}
</script>

<style >
.img_box {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.img_box img {
    min-width: 100%;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    margin: 0 auto;
}

.el-carousel__item img {
    min-width: 100%;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    margin: 0 auto;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.el-carousel__indicators--outside {
    position: absolute;
    bottom: 0;
    transform: translate(-50%);
}

.el-carousel__indicator.is-active button {
    background-color: #6CA96E;
    opacity: 1;
}

.el-carousel__button {
    width: 50px;
    height: 3px;
}

.carousel {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.carousel>ul {
    height: 100%;
}

.carousel>ul li {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    transition: 1s all;
}

.carousel>ul li img {
    min-width: 100%;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    margin: 0 auto;
}

.carousel>ul li.on {
    opacity: 1;
}

.carousel .btn-box {
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 100%;
    margin-left: -200px;
}

.carousel .btn-box span {
    display: inline-block;
    width: 60px;
    height: 3px;
    border-radius: 10%;
    background-color: #ccc;
    margin-left: 20px;
    cursor: pointer;
}

.carousel .btn-box span.on {
    background:  #6CA96E;;
}
</style>
