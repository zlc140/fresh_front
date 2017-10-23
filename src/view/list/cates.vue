<template>
   <div class="content">
      <div class="productlist_all cl " v-if="cates && cates.length>0">
        <div class="all_left">相关分类:</div>
        <div class="all_right">
          <ul>
            <li v-for="(item,index) in cates" :key="index">
              <a @click="searchList(item.classId,item.classTitle)" :class="defaultId == item.classId?'def':''">{{item.classTitle}}</a>
            </li>
           
          </ul>
        </div>
      </div>
       <!-- <div class="productlist_all cl bdN">
        <div class="all_left">认证:</div>
        <div class="all_right">
          <ul>
            <li v-for="(item,index) in keyword" :key="index">
              <a>{{item.name}}</a>
            </li>
          </ul>
        </div>
     </div> -->
    </div>
</template>

<script>
import {  cateList } from '@/service'
export default {
  data() {
    return {
      cates: [],
      goods: [],
      keyword:[
        {name:'不限',value:'all'},
        {name:'有机',value:'wuji'},
        {name:'绿色',value:'lvse'}
      ],
      defaultId:''
    }
  },
   watch: {
        '$route'(to, from) {
            const toPath = to.query
            const fromPath = from.query
            if(from.query.classId){
                 this.getlist()
            }
        },
    },
  mounted() {
    this.getlist()
  },
  methods: {
    async getlist(){
         let id = this.$route.query.classId?this.$route.query.classId:''
         this.defaultId = id
        let lists = this.$store.state.classList
        if( lists.length > 0 ){
            this.cates = lists
        }else{
            this.cates = await cateList()
        }
          let childCates=[]
          this.cates.forEach(function(item) {
            if( item.classId == id && item.childClass){
                childCates = childCates.concat(item.childClass)
            }else{
              if( item.childClass && item.childClass.length>0)
              item.childClass.forEach(v => {
                if(v.classId == id){
                  childCates = childCates.concat(item.childClass)
                }
              })
              item.childClass
            }
              
            }, this);
            this.cates = childCates
             console.log('cate3s',this.cates)
          
    },
    searchList(val ,name){
      this.$emit('getName',name)
      this.$router.push({
        path:'/list',
        query:{
          classId:val
        }
      })
    }
  }
}
</script>

<style>
/*所有分类*/

.productlist_all {
  width: 100%;
  padding: 10px 0;
  border-bottom: 0px solid #eee;
  background-color: #fafafa;
}

.all_left {
  width: 80px;
  padding-left: 10px;
  float: left;
  font-size: 16px;
  line-height:36px;
}

.all_right {
  width: 1110px;
  margin-left: 90px;
  overflow: hidden;
  zoom: 1;
}

.all_right ul li {
  display: inline-block;
  padding: 0px 10px 0 45px;
  margin: 12px 0;
  height: 12px;
  line-height: 12px;
  border-right: 1px solid #ededed;
  width:75px;
  text-align: left;
  float:left;
}
.all_right ul li:nth-child(8n),.all_right ul li:last-child{
  border-right: none;
}
.all_right ul li a {
  display: inline-block;
  margin-top: -2px;
  font-size: 16px;
  line-height: 16px;
  color: #707070;
  display: inline-block;
  width:70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.all_right ul li .def{
  color:#6ca96e;
}
.all_right ul li a:hover{
  color: #6CA96E;
}
.all_right ul li img {
  margin-left: 20px;
}
.bdN{
  border: none;
}
</style>
