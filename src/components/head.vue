<template>
        <el-col :span="24" class="header_box">
            <div class="content">
			<div class="header cl">
				<div class="container">
					<ul class="fr">
						<li v-if="userName==''"><router-link to="/login" >登录</router-link></li>
						<li v-if="userName==''"><router-link to="/register">注册</router-link></li>
                        <li v-if="userName!='' && getName!=''" ><router-link to="/stepTwo">完善资料</router-link></li>
                        <li v-if="userName!=''" >欢迎<router-link to="/user" style="font-size:14px;color:#6CA96E;">{{userName}}</router-link>登录哈福生鲜馆</li>
                        <li  v-if="userName!=''" @click="logout"><a>退出</a></li>
						<li v-if="userName!='' && getName==''"><router-link to="/editOrder" >我的配送计划</router-link></li>
                        <li v-if="userName!='' && getName==''" ><router-link to="/user"  >个人中心</router-link></li>
						<li  v-if="getName==''"><router-link to="/shopCar">购物车<span class="shopNum" v-if="shopNum>0">({{shopNum}})</span></router-link></li>
						<li><a href="#">客服电话：400-8851659</a></li>
                        <li v-if="userName!='' && formMove" ><router-link to="/addStore"  >申请开店</router-link></li>
                        <li v-if="userName!='' && !formMove && getName == ''" ><a :href="goMange" target="_blank" >{{textMove==true?'我的店铺':'后台管理'}}</a></li>
					</ul>
				</div>
			</div>
			<div class="search">
				<div class="container cl">
					<div class="logo fl">
						<router-link to="/index"><img :src='Logo' /></router-link>
					</div>
					<div class="search_box fr"> 
						<span class="arrow" @click="searchPro"></span>
						<input type="text" id="search" name="sarch" v-model="search" placeholder="商品搜索"/>
						
					</div>
				</div>
		</div>
        <!--导航栏-->
        <div id="nav">
            <div class="nav_banner">
                <ul >
                    <li :class="listShow?'hoverCate':''">
                        <!-- @click="collapse  v-show="cateShow"(list_banner)" -->
                        <router-link to="/list">全部商品分类 <span class="el-icon-arrow-down"></span></router-link>
                        <div class="list_banner" :class="listShow==true?'mostShow':''">
                            <div class="list_left">
                                <dl>
                                    <dd v-for="(item,index) in classList" :key="index" v-if="index < 9">
                                        <router-link :to="{path:'/list',query:{'classId':item.classId}}">
                                        <span>
                                            <img :src="item.classPic[0].path" class="one"/>
                                            <img :src="item.classPic[1].path" class="two"/>
                                        </span>{{item.classTitle}}</router-link>
                                        <div class="moreList" >
                                            <list-tem :lists = 'item.childClass?item.childClass:null'></list-tem>
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </li>
                    <!-- <li><a href="">蔬菜</a></li><span class="down_one"></span>
                    <li><a href="">肉类</a></li>
                    <li><a href="">速冻食品</a></li>
                    <li><a href="">更多</a></li><span class="down_two"></span> -->
                </ul>
                
            </div>
            
        </div>
        </div>
        </el-col>    
</template>

<script>
 import listTem from './cate_list'
 import Logo from '@/assets/logo.png'
 import {cateList,getSummary,checkStore} from '../service'
 import { getStore,removeStore,setStore } from '@/config/storage'
export default {
    data() {
        return {
            listShow:true,
            Logo:Logo,
            search:'',
            cateShow:false,
            collapsed:false,
            classList:[],
            getName:'',
            formMove:false,
            textMove:false,
            goMange:''

        }
    },
     watch:{
        '$route' (to,from) {
            const toPath = to.path
            const fromPath = from.path
            if(to.path != from.path){
                this.search = ''
                this.cateShow = false
                // 验证
                if(getStore('getName') != null){
                    this.checkLogin()
                }
               
            }
             console.log('toPath',to.path)
            //  分类导航
            if(to.path != '/index' && to.path != '/'){
                this.listShow = false
            }else{
                 this.listShow = true
            }
            // 搜索
             if(to.query.name){
                this.search = to.query.name
            }else{
                this.search = ''
            }
            // 验证
            if(from.path == '/login' && getStore('username')!=null &&  getStore('getName') == null){
                this.checkLogin()
                this.getCart()
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
        if(this.$route.path != '/index'){
            this.listShow=false
        }
         let src =  window.location.protocol+ '//'+window.location.host
         this.goMange = src+'/manage'
            this.checkOpen()
            this.getClass() 
            
            if( getStore('username') != null && getStore('getName') == null){
               this.getCart()
            }
            this.checkLogin()
    },
    methods:{
       getCart(){
            this.$store.commit('REMEMBER_NAME',getStore('username'))
                    this.$store.dispatch('getShopCar').then((res) => {
                    console.log(res)
            })
       },
       checkOpen(){
            let _this =this 
            // let OriginTitile = document.title,titleTime
             document.addEventListener('visibilitychange', function() {
                    if (document.hidden) {
                        // document.title = '你去那里了'
                        //  clearTimeout(titleTime);
                    } else {
                        // document.title = '(つェ⊂)咦!又好了!';
                        _this.checkLogin()
                        //   titleTime = setTimeout(function() {
                        //     document.title = OriginTitile;
                        // },1000);
                    }
                });
        },
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
                    name:this.search.trim()
                }
            })
        },
        logout(){
            let _this = this
            this.$confirm('您确定要退出当前账号吗？').then(() => {
                 _this.$store.dispatch('logout').then(() =>{
                     _this.formMove=false
                     _this.textMove=false
                     _this.$router.push('/login')
                 })
            }).catch(() => {

            })
             
        },
        checkLogin(){
            getSummary().then((res) => {
                console.log('ceck,',res)
               if(res.data.state == 200 && res.data.messages=="未完善资料。"){
                //    this.$message(' 请完善资料！')
                   setStore('getName',JSON.stringify(res.data.content))
                   this.getName = getStore('getName')
                    this.$store.commit('REMEMBER_NAME',res.data.content)
                //    this.$router.push('/stepTwo')
               } else if(res.data.state == 200 && res.data.content.username){
                   this.getName = ''
                    this.getCart()
                   if(getStore('username') != null && res.data.content.username != getStore('username')){
                        this.$store.commit('REMEMBER_NAME',res.data.content.username)
                        this.getStore()
                        console.log('hello',this.$route.path)
                        if(this.$route.path.indexOf('detail')<0){
                            this.$message('账号已切换')
                            this.$router.push('/')
                        }
                   }else{
                       console.log('hello',this.$route.path)
                        this.$store.commit('REMEMBER_NAME',res.data.content.username)
                        this.getStore()
                   }
               }else if(res.data.state == 400 && getStore('username') != null){
                    this.$store.dispatch('logout').then(() =>{
                     this.$router.push('/login')
                    })
               }else{

               }
            }).catch(() => {

            })
        },
         // 验证店铺存在与否
        getStore(){
             
            let _this = this
            checkStore().then(res => {
                 
                console.log('store',res)
                if(res.data. state == 200){
                if( res.data.messages == '暂无数据！'){
                    _this.formMove = true
                    
                }else if(res.data.messages == '我是管理员！'){
                    console.log('管理员不能开店！')
                    _this.formMove = false
                    _this.textMove = false
                }else if(res.data.messages == '店铺未通过审核！'){
                    _this.formMove = true
                    console.log('店铺审核中')
                }else{
                     _this.formMove = false
                      _this.textMove = true
                    console.log('您的店铺已完成')
                }
                }
            })
        },

         
    }
     
}
</script>

<style lang="scss" scoped>
@import '../assets/chang.scss';
 .mostShow{
     display: block !important;
 }
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
        height:65px;
        img{
            width:120px;
            margin-top: 15px;
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
            font-size: 14px;
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
    height: 60px;
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
            &:hover{
                .list_banner{
                    display: block;
                }
            }
            }
            &>li{
                >a{
                    display:block;
                    width:190px;
                    text-align:center;
                //    padding-left:10px;
                    span{
                        font-size:14px;
                    }
                }
                
            }
            .hoverCate{
                // >a{
                //     display:block;
                //     width:190px;
                //     text-align:center;
                    
                // }
            }
        }
    }
    .list_banner{
        display: none;
        position: absolute;
        width:190px;
        top: 58px;
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
                    img{
                        margin:4px;
                        width:40px;
                        height:40px;
                    }
                    .one{
                        display:block;
                    }
                    .two{
                        display: none;
                    }
                }
                a{
                    display: inline-block;
                    width:100%;
                    height:100%;
                    color: white;
                    font-size: 14px;
                }
                .moreList{
                    // width:1010px;
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
                    .one{
                        display: none;
                    }
                    .two{
                        display: block;
                    }
                }
            }
        }
        
    }
}
 
</style>
