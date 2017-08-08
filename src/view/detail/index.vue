<template>
	<div class="content">
		<div class="container detail cl" v-if='content != null'>
			<div class="left_box" ref="box">
				<big-img :imgs="imgs"></big-img>
			</div>
			<div class="right_box">
				<div class="title">
					<p>{{content.goodsTitle}}</p>
					<p>{{content.goodsSubTitle}}</p>
				</div>
				<div class="price">
					价格：
					<strong>￥{{content.price.GOODS_COST_PRICE}}</strong>
					(约2.5/500g)
				</div>
				<div class="place">
					<span>生产地：上海</span>
					<span>保质期：3天</span>
					<span>存储条件：冷藏</span>
				</div>
				<div class="number">
					购买数量：
					<input type="text" name="" v-model="num" @keyup="changNum">
					<span class="mui-amount-btn">
						<span class="icon-top" @click="add"></span>
						<span class="icon-bottom" @click="reduce"></span>
					</span>
					<span class="mui-amount-unit">件</span>
					<p>(当前库存9996件)</p>
				</div>
				<div class="cart">
					<a class="goCar" @click="addCars(content.goodsId,$event)" :class="addBtn?'diss':''">加入购物车</a>
					<a class="goOrder">加入预订单</a>
				</div>
			</div>
		</div>
		<div class="container" v-if='content != null' v-html="content.goodsBody">
	
		</div>
		<div v-if='content == null' class="nothing">
			该商品详情不存在
		</div>
			<div class="flew"  ref="flew" v-show="flewMove"><img :src="flewPic"/></div>
	</div>
</template>

<script>
import { goodsDetail,addCar } from '@/service'

import bigImg from './bigImg'
export default {
	data() {
		return {
			addBtn: false,
			flewMove:false,
			flewPic:'',
			num: 1,
			content: null,
			imgs: []
		}
	},
	components: {
		bigImg
	},
	async mounted() {

		let para = {
			id: this.$route.query.id
		}

		this.content = await goodsDetail(para)

		if (!this.content) {
			this.content = null
			this.imgs = []
			//   this.$alert('详情出错')
		} else {
			this.imgs = this.content.goodsPic
		}
	},
	methods: {
		changNum() {
			let reg = new RegExp("^[0-9]*$");
			if (!reg.test(this.num)) {
				this.num = 1
			}
		},
		addCars(val,event) {
			console.log(this.num)
			if (!this.addBtn) {
					let _this = this
					_this.addFlew(_this.imgs[0].path,event)
					let prop = {
						id:val,
						num:this.num
			}
			addCar(prop).then((res) => {
				console.log(res)
				_this.$store.dispatch('addCar',res).then((res) => {
						this.$notify({
							title: '',
							message: '您已成功添加购物车',
							type: 'success',
							duration: 1000
							});
						this.addBtn = true
				})
				
			})
			}
		},
		add() {
			this.num++
		},
		reduce() {
			if (this.num > 1) {
				this.num--
			}
		},
	  addFlew(pic,event){
			this.flewMove = true
			let _this = this
			clearInterval(_this.timer)
			this.flewPic = pic
			let Width = document.body.clientWidth
			let X = parseInt(Width-event.clientX)
			let Y = parseInt(event.clientY)
			let changeX = parseInt((X - 30)/10)
			let changeY = parseInt((Y - 350)/10)
			this.$refs.flew.style.top = Y+'px'
			this.$refs.flew.style.right = X+'px'
			// 位置移动
			_this.pos(changeX,changeY,X,Y)
		
		},
		pos(changeX,changeY,X,Y){
			let [opa,goTop,_this,num] = [1,goTop,this,0]
			console.log(changeY)
			this.timer = setInterval(function(){
				if(changeY > 10){
					if(num < 4){
					num++
					Y -= changeY*1.3
					}else{
					Y -= changeY*0.8
					}
				}else if(changeY < -10){ 
					if(num < 4){
					num++
					Y += changeY
					}else{
					Y += -changeY*1.4　
					}
					
				}else {
					if(num < 4){
					num++
					Y -= 60
					}else{
					Y += 40
					}
				}
				if(X > changeX){
				X -= changeX
				opa = opa-0.08
				}else{
				opa = 0
				Y = 350
				num = 0
				this.flewMove = false
					clearInterval(_this.timer)
				}
				_this.$refs.flew.style.right = X+'px'
				_this.$refs.flew.style.top = Y+'px'
				_this.$refs.flew.style.opacity = opa
			},50)
		}
	}

}
</script>

<style scoped>
.nothing {
	text-align: center;
	line-height: 200px;
	font-size: 20px;
	color: #888;
}

.detail {
	padding: 30px 0;
}

.detail .left_box {
	float: left;
	width: 420px;
	height: 520px;
}

.detail .right_box {
	display: inline-block;
	margin-left: 21px;
	position: relative;
	height: 400px;
}

.detail .title {
	margin-bottom: 25px;
}

.detail .title p:nth-child(1) {
	font-size: 20px;
	width: 566px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.detail .title p:nth-child(2) {
	color: rgb(108, 169, 110);
	padding: 5px;
	font-size: 14px;
	width: 566px;
}

.detail .price {
	padding: 20px 5px;
	background-color: #eee;
	font-size: 14px;
	color: rgb(97, 96, 96);
	margin-bottom: 30px;
}

.detail .price strong {
	color: #C40000;
	padding: 0 20px;
	font-size: 20px;
}

.detail .place {
	color: rgb(162, 162, 162);
	font-size: 14px;
	margin-bottom: 30px;
}

.detail .place span {
	margin-right: 40px;
}

.detail .number {
	color: rgb(162, 162, 162);
	font-size: 14px;
	margin-bottom: 30px;
}


.mui-amount-btn {
	display: inline-block;
	vertical-align: middle;
	width: 15px;
	height: 30px;
	margin-left: -5px;
}

.ui-amount-unit {
	vertical-align: middle;
	margin-left: 5px;
}

.detail .number .mui-amount-btn span {
	width: 14px;
	height: 13px;
	overflow: hidden;
	border: 1px solid #a7a6ab;
	display: block;
	font-size: 10px;
	color: #888;
	border: 1px solid #ccc;
	cursor: pointer;
	position: relative;
	border-radius: 1px;
}

.detail .number .mui-amount-btn .icon-top:after {
	content: '';
	display: inline-block;
	width: 0;
	border: 5px solid;
	top: -1px;
	left: 2px;
	position: absolute;
	border-color: transparent transparent #888 transparent;
}

.detail .number .mui-amount-btn .icon-top {
	border-bottom-color: white;
}

.detail .number .mui-amount-btn .icon-bottom:after {
	content: '';
	display: inline-block;
	width: 0;
	border: 5px solid;
	top: 4px;
	left: 2px;
	position: absolute;
	border-color: #888 transparent transparent transparent;
}

.detail .number input {
	outline: none;
	display: inline-block;
	width: 42px;
	height: 28px;
	text-align: center;
	border: 1px solid #ccc;
}

.detail .number p {
	margin-left: 68px;
	margin-top: 5px;
}

.detail .cart {
	position: absolute;
	left: 0;
	bottom: 0;
}

.detail .cart a {
	display: inline-block;
	width: 131px;
	height: 33px;
	line-height: 35px;
	font-size: 16px;
	letter-spacing: 2px;
	text-align: center;
	border: 1px solid rgb(108, 169, 110);
}

.detail .cart .goCar {
	color: rgb(108, 169, 110);
	background-color: rgb(243, 249, 243);
}

.detail .cart .diss {
	border-color: #ccc;
	color: #888;
	background-color: #f0f0f0;
}

.detail .cart .goOrder {
	background-color: rgb(108, 169, 110);
	color: #fff;
}
</style>
