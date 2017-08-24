<template>
        <el-col :span="24" class="header_box">
            <div class="content">
			<div class="header cl">
				<div class="container">
					<ul class="fr">
						<li v-if="userName==''"><router-link to="/login" >登录</router-link></li>
						<li v-if="userName==''"><router-link to="/register">注册</router-link></li>
                        <li v-if="userName!=''" >欢迎<router-link to="/user" >{{userName}}</router-link>登录哈福生鲜馆</li>
                        <li v-if="userName!=''" @click="logout"><a>退出</a></li>
						<li  v-if="userName!=''"><router-link to="/editOrder" >我的配送计划</router-link></li>
                        <li><router-link to="/user" >个人中心</router-link></li>
						<li><router-link to="/shopCar">购物车{{shopNum}}</router-link></li>
						<li><a href="#">客服电话：021-623453</a></li>
					</ul>
				</div>
			</div>
			<div class="search">
				<div class="container cl">
					<div class="logo fl">
						<router-link to="/index"><img src="../assets/logo.jpg" /></router-link>
					</div>
					<div class="search_box fr"> 
						<span class="arrow" @click="searchPro"></span>
						<input type="text" id="search" name="sarch" v-model="search" />
						
					</div>
				</div>
		</div>
        <!--导航栏-->
        <div id="nav">
            <div class="nav_banner">
                <ul >
                    <li>
                        <a @click="collapse">全部商品分类</a>
                        <div class="list_banner" v-show="cateShow">
                            <div class="list_left">
                                <dl>
                                    <dd v-for="(item,index) in classList" :key="index" v-if="index < 9">
                                        <span></span><router-link :to="{path:'/list',query:{'classId':item.classId}}">{{item.classTitle}}</router-link>
                                        <div class="moreList">
                                            <list-tem :lists = 'item.childClass?item.childClass:null'></list-tem>
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        </li>
                    <li><a href="">蔬菜</a></li><span class="down_one"></span>
                    <li><a href="">肉类</a></li>
                    <li><a href="">速冻食品</a></li>
                    <li><a href="">更多</a></li><span class="down_two"></span>
                </ul>
                
            </div>
            
        </div>
        </div>
        </el-col>    
</template>

<script>
 import listTem from './cate_list'
 import {cateList} from '../service'
 import { getStore,removeStore } from '@/config/storage'
export default {
    data() {
        return {
            search:'',
            cateShow:false,
            collapsed:false,
            classList:[],
        }
    },
     watch:{
        '$route' (to,from) {
            const toPath = to.path
            const fromPath = from.path
            if(to.path != from.path){
                this.search = ''
                this.cateShow = false
            }
        }
        
    },
    computed:{
        shopNum(){
            return this.$store.state.shopCar.length
        },
        userName(){
            return this.$store.state.username 
        }
         
    },
    components:{listTem},
     mounted(){
            this.getClass() 
             console.log(getStore('username'))
            if( getStore('username') != null){
               this.$store.commit('REMEMBER_NAME',getStore('username'))
              
            }

          
    },
    methods:{
        async getClass(){
            this.classList = await cateList()

            this.$store.commit('SAVE_CLASS',this.classList)
        },
        collapse() {
            this.cateShow = !this.cateShow
            this.$emit('changeCollapsed',this.cateShow)
        },
        searchPro(){
            this.$router.push({
                path:'/list',
                query:{
                    name:this.search
                }
            })
        },
        logout(){
            let _this = this
            this.$confirm('您确定要退出当前账号吗？').then(() => {
                 _this.$store.dispatch('logout').then(() =>{
                     _this.$router.push('/login')
                 })
            }).catch(() => {

            })
           
             
        }

         
    }
     
}
</script>

<style lang="scss" scoped>
@import '../assets/chang.scss';
.header_box{
    width:100%;
    height:186px;
    color:#333;
    background-color: white;
}
.header>.el-col{
    height: 70px;
    width:100%;
    background-color:#242f42;
    line-height: 70px;
}
.header_box .header{
        ul{
            margin-top: 15px;
            li{
                display: inline-block;
                *display: inline;
                _zoom:1;
                padding:0 10px;
                border-right: 1px solid #ccc;
                line-height: 12px;
                
            }
            :last-child{
                border: none;
                padding-right: 0;
            }
        }
    }
.search{
    width:100%;
//  height: 50px;
    padding: 15px 0 0;
    .logo{
        
        width:160px;
        img{
            width:100%;
            height: auto;
        }
    }
    .search_box{
        margin-top: 20px;
        border: 1px solid $baseColor;
        border-radius: 8px;
        height:25px;
        width:240px;
        padding: 4px 8px;
        input{
            font-size: 16px;
            border: none;
            outline: none;
            height: 25px;
            width:210px;
            background-color: transparent;
        }
        label{
            margin: 0;
        }
        .arrow{
            cursor: pointer;
            float: right;
            width:28px;
            height: 28px;
            display: inline-block;
        }
    }
}
#nav{
    margin-top: 14px;
    width: 100%;
    height: 56px;
    background-color:  $baseColor;
    position: relative;
    .nav_banner{
        width: 1200px;
        margin: 0 auto;
        height:100%;
        position: relative;
        &>ul{
            li{
                float: left;
                line-height: 56px;
                padding: 0 30px;
               a{
                    color: white;
                    font-size: 18px;
                    &:hover{
                        text-decoration: none;
                    }
                    }
            &:first-child{
                padding-left: 0;
            }
            }
        }
    }
    .list_banner{
        position: absolute;
        width:190px;
        top: 56px;
        left: 0;
        height: 470px;
        background-color: $cateColor;
        letter-spacing: 1px;
        z-index: 999;
        dl {
            dd{
                height: 48px;
                line-height: 48px;
                
                padding: 0 10px;
                span{
                    display: inline-block;
                    width:48px;
                    height: 48px;
                    float: left;
                }
                a{
                    color: white;
                    font-size: 14px;
                }
                .moreList{
                    width:1010px;
                    overflow: hidden;
                    height:470px;
                    position: absolute;
                    z-index: 999;
                    top: 0;
                    left:190px;
                    display: none;
                }
                
                &:hover{
                    background-color: white;
                    >a{
                        color: $cateColor;
                    }
                    >.moreList{
                        display: block;
                    }
                }
            }
        }
    }
}
</style>
