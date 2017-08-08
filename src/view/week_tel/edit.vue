<template>
  <div>
    <div class="dialog-wrap">
      <div class="dialog-cover" v-if="isShow" @click="closeMyself"></div>
      <transition name="drop">
        <div class="dialog-content" v-if="isShow">
          <div class="search">
            <input type="text" placeholder="搜索商品名称...">
            <button type="submit">搜索</button>
          </div>
          <div class="list">
            <div class="direction prev">
              <a @click="prev">
                <img src="../../assets/prev.jpg" alt="">
              </a>
            </div>
            <div class="list_box">
              <ul ref="movebox">
                <li v-for="(detail,index) in detailList" :key="index">
                  <div class="list_detail">
                    <div class="img_box">
                      <img :src="detail.src">
                    </div>
                    <div class="title">{{detail.title}}</div>
                    <div class="content_detail">
                      <div class="price">￥{{detail.price}}</div>
                      <a class="increase" @click="closeMyself">+</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="direction">
              <a @click="next">
                <img src="../../assets/next.jpg" alt="">
              </a>
            </div>
          </div>
          <p class="dialog-close" @click="closeMyself">x</p>
          <slot></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      moveNum: 0,
      detailList: [
        {
          src: require('../../assets/list_detail.jpg'),
          title: '西兰花 花椰菜 有机蔬菜 山泉农场直供（约20g）',
          price: '5.00'
        },
        {
          src: require('../../assets/list_detail.jpg'),
          title: '西兰花 花椰菜 有机蔬菜 山泉农场直供（约20g）',
          price: '5.00'
        },
        {
          src: require('../../assets/list_detail.jpg'),
          title: '西兰花 花椰菜 有机蔬菜 山泉农场直供（约20g）',
          price: '5.00'
        },
        {
          src: require('../../assets/list_detail.jpg'),
          title: '西兰花 花椰菜 有机蔬菜 山泉农场直供（约20g）',
          price: '5.00'
        },
        {
          src: require('../../assets/list_detail.jpg'),
          title: '西兰花 花椰菜 有机蔬菜 山泉农场直供（约20g）',
          price: '5.00'
        },
        {
          src: require('../../assets/list_detail.jpg'),
          title: '西兰花 花椰菜 有机蔬菜 山泉农场直供（约20g）',
          price: '5.00'
        },
        {
          src: require('../../assets/list_detail.jpg'),
          title: '西兰花 花椰菜 有机蔬菜 山泉农场直供（约20g）',
          price: '5.00'
        },
        {
          src: require('../../assets/list_detail.jpg'),
          title: '西兰花 花椰菜 有机蔬菜 山泉农场直供（约20g）',
          price: '5.00'
        },
        {
          src: require('../../assets/list_detail.jpg'),
          title: '西兰花 花椰菜 有机蔬菜 山泉农场直供（约20g）',
          price: '5.00'
        },
        {
          src: require('../../assets/list_detail.jpg'),
          title: '西兰花 花椰菜 有机蔬菜 山泉农场直供（约20g）',
          price: '5.00'
        },
         {
          src: require('../../assets/list_detail.jpg'),
          title: '西兰花 花椰菜 有机蔬菜 山泉农场直供（约20g）',
          price: '5.00'
        },
        {
          src: require('../../assets/list_detail.jpg'),
          title: '西兰花 花椰菜 有机蔬菜 山泉农场直供（约20g）',
          price: '5.00'
        },
        {
          src: require('../../assets/list_detail.jpg'),
          title: '西兰花 花椰菜 有机蔬菜 山泉农场直供（约20g）',
          price: '5.00'
        },
        {
          src: require('../../assets/list_detail.jpg'),
          title: '西兰花 花椰菜 有机蔬菜 山泉农场直供（约20g）',
          price: '5.00'
        },
        {
          src: require('../../assets/list_detail.jpg'),
          title: '西兰花 花椰菜 有机蔬菜 山泉农场直供（约20g）',
          price: '5.00'
        },
        {
          src: require('../../assets/list_detail.jpg'),
          title: '西兰花 花椰菜 有机蔬菜 山泉农场直供（约20g）',
          price: '5.00'
        }
      ]
    }
  },
  methods: {
    closeMyself() {
      this.$emit('on-close')
    },
    prev() {
      if (this.detailList.length > 6) {
        if (this.moveNum < this.detailList.length - 4) {
          // this.moveNum+=6
          // this.$refs.movebox.style.left = -150*this.moveNum+'px'
        }
        else {
          this.moveNum = 0
          this.$refs.movebox.style.left = 150 * this.moveNum + 'px'
        }
      }
    },
    next() {
      if (this.detailList.length > 6) {
        this.moveNum += 6
        if (this.moveNum <= this.detailList.length - 4) {
          this.$refs.movebox.style.left = -150 * this.moveNum + 'px'
        }
      }
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.drop-enter-active {
  transition: all .5s ease;
}

.drop-leave-active {
  transition: all .3s ease;
}

.drop-enter {
  transform: translateY(-500px);
}

.drop-leave-active {
  transform: translateY(-500px);
}

.dialog-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 5;
}

.dialog-cover {
  background: #000;
  opacity: .3;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.dialog-content {
  width: 1100px;
  position: fixed;
  overflow: auto;
  background: #fff;
  top: 20%;
  left: 50%;
  margin-left: -25%;
  z-index: 999;
  padding: 2%;
  line-height: 1.6;
}

.dialog-close {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  text-align: center;
  background-color: rgb(109, 168, 110);
  border-radius: 50%;
  color: #fff;
  text-align: center;
  cursor: pointer;
}

.search {
  width: 347px;
  margin: 0 auto;
}

.search input {
  float: left;
  width: 291px;
  height: 34px;
  border: none;
  border: 1px solid rgb(167, 202, 169);
  text-indent: 16px;
}

.search button {
  border: none;
  width: 56px;
  height: 34px;
  background-color: rgb(108, 169, 110);
  color: #fff;
}

.dialog-content .list {
  display: inline-block;
  margin-top: 60px;
  min-width: 1060px;
  overflow-x: auto;
  margin-bottom: 120px;
}

.dialog-content .list ul {
  height: 227px;
  display: inline-block;
  width: 1500px;
  position: relative;
  left: 0;
  transition: all 1s;
}

.dialog-content .list .list_box {
  height: 227px;
  display: inline-block;
  width: 900px;
  overflow: hidden;
}

.dialog-content .list li {
  display: inline-block;
  width: 130px;
  height: 221px;
  overflow: hidden;
  border: 1px solid rgb(231, 231, 231);
  margin-right: 20px;
  position: relative;
}

.dialog-content .list a {
  display: inline-block;
  height: 61px;
  text-align: center;
  width: 48px;
}

.dialog-content .list .direction {
  width: 48px;
  height: 221px;
  display: inline-block;
  vertical-align: top;
  position: relative;
  overflow: hidden;
}

.dialog-content .list .prev {
  margin-right: 19px;
  float: left;
}

.dialog-content .list .direction a {
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -30.5px
}

.dialog-content .list .list_detail {
  padding: 5px;
  height: 221px;
}

.dialog-content .list .list_detail .img_box {
  padding: 20px 10px;
}

.dialog-content .list .list_detail .img_box img {
  width: 88px;
  height: 82px;
  background-size: cover;
}

.dialog-content .list .list_detail .title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.dialog-content .list .list_detail .content_detail {
  overflow: hidden;
  position: absolute;
  bottom: 10px;
  left: 5px;
  width: 118px;
}

.dialog-content .list .list_detail .content_detail .price {
  float: left;
  color: red;
}

.dialog-content .list .list_detail .increase {
  display: inline-block;
  width: 18px;
  height: 18px;
  text-align: center;
  background-color: rgb(109, 168, 110);
  border: 1px solid #eee;
  border-radius: 50%;
  color: #fff;
  float: right;
}
</style>
