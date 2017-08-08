<template>
  <div class="container" id="floor">
      <div v-for="(item, index) in floorList" :key="index">
        <div  v-if="item.style == 'one'"  class="one_template">
            <div class="reduce">
                <img :src="item.titlePic" :alt="item.title">
            </div>
            <div class="div_3">
                <ul class="div_3_list cl">
                    <li v-for="(child,id) in item.content" :key="id" :class="child.big == 'true' ?'big':''">
                        <a :href="child.path">
                            <img :src="child.url" alt="child.title">
                        </a>
                    </li>
                </ul>
		    </div>
        </div>
        <div class="two_template"  v-else >
            <div class="reduce">
                <img :src="item.titlePic" :alt="item.title">
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
                <li v-for="(child,id) in item.content" :key="id" class="list">
					<a href="javascript:;">
						<img :src="child.url" class="img1" alt="child.title">
					</a>
					<div class="detail">
						<ul class="cl">
							<li class="" v-for="(son ,index) in child.aboutPro" :key="index" >
								<a href="javascript:" title="">
									<img  class="img2" :src="son.img[0].path" alt="">
									<p class="price">￥39.8</p>
								</a>
							</li>
						</ul>
						<div class="more_box"><a class="more">查看更多</a></div>	
					</div>
				</li>
                </ul>
            </div>
        </div>
      </div>
       
  </div>
</template>

<script>
import titlePic from '@/assets/images/titlePic.jpg'
import adv from '@/assets/images/adv2.jpg'
import adv2 from '@/assets/images/adv.jpg'
import advBig from '@/assets/images/advbig.jpg'
import classPic from '@/assets/images/class1.jpg'

import pro from '@/assets/images/pro.jpg'
import pro2 from '@/assets/images/pro2.jpg'
import pro3 from '@/assets/images/pro3.jpg'


export default {
 data(){
     return {
         url:adv,
         adv:adv,
         titlePic:titlePic,
         adv2:adv2,
         classPic:classPic,
         advBig:advBig,
         pro:pro,
         pro2:pro2,
         pro3:pro3,

         floorList:[
             {
                 style:'one',
                 title:'活动满减',
                 titlePic:titlePic,
                 content:[
                     { path:'/login', url:adv, title:'某个分类' ,big:'false'},
                     { path:'/login', url:adv2, title:'某个分类' ,big:'false'},
                     { path:'/login', url:adv, title:'某个分类' ,big:'false'},
                     { path:'/login', url:advBig, title:'某个分类',big:'true'}
                 ]
             },
              {
                 style:'two',
                 title:'分类活动',
                 titlePic:titlePic,
                 content:[
                     { path:'/login', url:classPic, title:'某个分类', aboutPro:[
                            {title:'水果',price:'23.32',id:'2',img:[{path:pro}]},
                            {title:'蔬菜',price:'23.32',id:'1',img:[{path:pro2}]},
                            {title:'水产',price:'23.32',id:'3',img:[{path:pro3}]}
                     ] },
                     { path:'/login', url:classPic, title:'某个分类', aboutPro:[
                            {title:'水果',price:'23.32',id:'2',img:[{path:pro}]},
                            {title:'蔬菜',price:'23.32',id:'1',img:[{path:pro2}]},
                            {title:'水产',price:'23.32',id:'3',img:[{path:pro3}]}
                     ] },
                     { path:'/login', url:classPic, title:'某个分类', aboutPro:[
                            {title:'水果',price:'23.32',id:'2',img:[{path:pro}]},
                            {title:'蔬菜',price:'23.32',id:'1',img:[{path:pro2}]},
                            {title:'水产',price:'23.32',id:'3',img:[{path:pro3}]}
                     ] },
                     { path:'/login', url:classPic, title:'某个分类', aboutPro:[
                            {title:'水果',price:'23.32',id:'2',img:[{path:pro}]},
                            {title:'蔬菜',price:'23.32',id:'1',img:[{path:pro2}]},
                            {title:'水产',id:'3',img:[{path:pro3}]}
                     ] }
                 ]
             },
             {
                 style:'one',
                 title:'活动满减',
                 titlePic:titlePic,
                 content:[
                     { path:'/login', url:adv, title:'某个分类' ,big:'false'},
                     { path:'/login', url:adv2, title:'某个分类' ,big:'false'},
                     { path:'/login', url:adv, title:'某个分类' ,big:'false'},
                     { path:'/login', url:advBig, title:'某个分类',big:'true'}
                 ]
             },
         ]
     }
 }
}
</script>

<style lang="scss" scoped>
  #floor{
      background-color: white;
       .reduce{
            img{
                width:100%;
            }
        }
    .one_template{
        .div_3{
            ul{
                width:100%;
                li{
                    width:390px;
                    float: left;
                    margin-left: 15px;
                    img{
                        width:100%;
                    }
                    &:first-child{
                        margin-left: 0;
                    }
                }
                .big{
                    width:100%;
                    margin: 15px 0 0; 
                }
            }
        }
    }
   
   
  }
  .div_2{
		margin-bottom: 20px;
	  .list{
        overflow: hidden;
        float: left;
        width:590px;
        height: 280px;
        position: relative;
        margin-top: 20px;
       }
       .detail{
		opacity: 0;
		width: 550px;
		height: 240px;
		background-color: #fff;
		position: absolute;
		top: 50%;
		left: 50%;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
		text-align: center;
		box-shadow: 0px 0px 10px 7px rgba(0, 0, 0, 0.1);
		-webkit-transition: all .5s;
		-o-transition: all .5s;
		-moz-transition: all .5s;
        transition: all .5s;
        li{
            float: left;
            position: relative;
        }
	 }
  }
	 .div_2 li:nth-child(2n){
         margin-left: 20px;
     }
	
	.div_2 .detail li{
        margin-left: 40px;
         margin-top: 15px; 
         width: 125px;
         height:145px;
         overflow: hidden;
         a{
             display: inline-block;
             width:100%;
             height: 125px;
             padding-bottom: 20px;
             overflow: hidden;
             position: relative;
             img{
                 max-height: 120px;
                 max-width: 100%;
                 position: absolute;
                 left: 50%;
                 top: 50%;
                 -webkit-transform: translate(-50%,-50%);
                 -ms-transform: translate(-50%,-50%);
                 -moz-transform: translate(-50%,-50%);
                  transform: translate(-50%,-50%);


             }
             p{
                position: absolute;
                left: 0;
                bottom: 0;
                text-align: center;
                width: 100%;
             }

         }
    }
        
	.div_2 .detail li:last-child{margin-right: 0;  }
 
	a{
		text-decoration: none;
	}
	.div_2 .detail .price{
		color: rgb(88,88,88);
	}
    .div_2 .detail .more_box{
        border-top: 1px dashed #333;
        margin-top: 20px;
    }
	.div_2 .detail .more{
		border: 1px solid #333;
		padding: 5px 30px;
		display: inline-block;
		position: absolute;
		bottom: 10px;
        right: 15px;
        cursor: pointer;
	}
	.div_2 .detail .more:hover{
        background-color: #6CA96E;
        color: #fff;
        border-color: #6CA96E;
        }
        .div_2 li:hover .img1{
                filter: url(blur.svg#blur); /* FireFox, Chrome, Opera */
                -webkit-filter: blur(5px); /* Chrome, Opera */
                -moz-filter: blur(5px);
                -ms-filter: blur(5px);    
                filter: blur(5px);
                filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=5, MakeShadow=false); /* IE6~IE9 */
        }
       
	.div_2 li:hover .detail{
		opacity: 1;
	}
	.div_2 li:hover .img{
		opacity: .5;
	}
	.div_2 .detail li:hover .img2{
			animation: myfirst 1s;
			-moz-animation: myfirst 1s;	/* Firefox */
			-webkit-animation: myfirst 1s;	/* Safari 和 Chrome */
			-o-animation: myfirst 1s;
	}
	@keyframes myfirst
	{
		0% {opacity: 1;}
		50% {opacity: .5;}
		100%{opacity: 1}
	}
	@-moz-keyframes myfirst
	{
		0% {opacity: 1;}
		50% {opacity: .5;}
		100%{opacity: 1}
	}	
	@-webkit-keyframes myfirst
	{
		0% {opacity: 1;}
		50% {opacity: .5;}
		100%{opacity: 1}
	}	
	@-o-keyframes myfirst
	{
		0% {opacity: 1;}
		50% {opacity: .5;}
		100%{opacity: 1}
    }
    // 楼层中间小广告的样式，暂时没有，对应上方注释的部分
    .div_2 .full_blown_price{
		opacity: 0;
		width: 270px;
		height: 150px;
		background-color: #fff;
		position: absolute;
		top:50%;
		left: 50%;
		margin: -75px -135px;
		text-align: center;
		border-radius: 4px;
		box-shadow: 10px 10px 3px rgba(0,0,0,.3); 
		-webkit-transition: all .5s;
		-o-transition: all .5s;
		-moz-transition: all .5s;
		transition: all .5s;
	}
	.div_2 li:hover .full_blown_price{
		opacity: 1;
	}
	.div_2 .full_blown_price h1{margin-top: 38px;color: rgb(108,169,110);}
	.div_2 .full_blown_price .line{width: 223px;height:0;border-top: 1px solid rgb(170,209,171);margin: 10px auto;}
	.div_2 .full_blown_price p{color: rgb(146,202,148);}
	
</style>
