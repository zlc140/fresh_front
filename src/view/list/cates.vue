<template>
   <div class="content">
      <div class="productlist_all cl ">
        <div class="all_left">所有分类:</div>
        <div class="all_right">
          <ul>
             <li><a @click="searchList('all')">全部</a></li>
            <li v-for="(item,index) in cates" :key="index">
              <a @click="searchList(item.classId,item.classTitle)">{{item.classTitle}}</a>
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
      ]
    }
  },
  async mounted() {
   // this.cates = await cateList()
   let lists = this.$store.state.classList
   if( lists.length > 0 ){
      this.cates = lists
   }else{
      this.cates = await cateList()
   }
   console.log(this.cates)
    let childCates=[]
    this.cates.forEach(function(item) {
      childCates.push({
        classId:item.classId,
        classTitle:item.classTitle
      })
      if(item.childClass){
          childCates= childCates.concat(item.childClass)
      }
    }, this);
    this.cates = childCates
    
  },
  methods: {
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
  border-bottom: 1px solid #eee;
  background-color: #fafafa;
}

.all_left {
  width: 80px;
  padding-left: 10px;
  float: left;
  font-size: 18px;
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
