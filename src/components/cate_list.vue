<template>
  <div class="content cl">
         <dl  v-for="(child,index) in classList" :key="index">
            <dd v-for="(cate,id) in child" :key="id" >
                <a   :title="cate.classTitle">{{cate.classTitle}}</a>
            </dd>
        </dl> 
  </div>
</template>

<script>
export default {
    data(){
        return{
            classList:[]
        }
    },
    props:{
        lists:{
            type:Array,
            default:[]
        }
    },
    mounted(){
        let getClass = this.lists
        let arrTemp=[];
        let index = 0;
        let sectionCount = 10;
        for(let i=0;i<getClass.length;i++){
                index = parseInt(i / sectionCount);  
                if (arrTemp.length <= index) {  
                    arrTemp.push([]);  
                }  
                arrTemp[index].push(getClass[i]);  
        }
        this.classList = arrTemp
                    
            
    }
}
</script>

<style lang="scss"  scoped>
 
   dl{
        background-color: #F8F8F8;
        height:470px;
        padding:0 15px 0;
        line-height: 46px;
        float: left;
        width:71px;
        dd{
            text-align: left;
            font-size: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        a{
            color: #888;
            &:hover{
                color:  #7EB680;
            }
        }
   }
</style>
