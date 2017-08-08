<template>
  <div>
      <ul>
          <li v-for="(item,index) in lists" :key="index">
                {{item.title}}
                <input type="text" v-model="item.num" />
                <el-button @click="changNum(item)">点击</el-button>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    props:{
        lists:{
            type:Array,
            default:[]
        }
    },
    methods:{
        changNum(val){
            val.num++
            this.$emit('changN',this.lists)
        }
    }
}
</script>

<style>
  
</style>
