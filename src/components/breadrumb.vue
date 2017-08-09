<template>
<div class="breadcrumb">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item >{{pageName }}</el-breadcrumb-item>
        <el-breadcrumb-item  v-if="breadname">{{ breadname }}</el-breadcrumb-item>
    </el-breadcrumb>
</div>
</template>

<script>
export default {
    props:['breadname'],
    data(){
        return {
            pageName:this.$route.name
        }
    },
    mounted(){
    }
}
</script>

<style>
.breadcrumb{
  padding: 10px 0;
  /* border-bottom: 1px solid #f0f0f0; */
  background-color: #f5f5f5;
}
.el-breadcrumb{
    width:1200px;
    margin: 0 auto;
}
</style>
