<template>
<div class="breadcrumb">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item ><router-link to="/">首页</router-link></el-breadcrumb-item>
        <el-breadcrumb-item @click.native="goTo">{{pageName }}</el-breadcrumb-item>
        <el-breadcrumb-item  v-if="name">{{ name }}</el-breadcrumb-item>
    </el-breadcrumb>
</div>
</template>

<script>
export default {
    props:['breadname'],
    data(){
        return {
            pageName:this.$route.name,
            breadnameCopy:'',
            path:this.$route.path
        }
    },
    computed:{
        name(){
            this.breadnameCopy = this.breadname
            return this.breadnameCopy
        }
        
    },
    methods:{
        goTo(){
            this.$emit('clearName','')
            this.$router.push(this.path)
        }
    }
}
</script>

<style>
.breadcrumb{
  padding: 10px;
  /* border-bottom: 1px solid #f0f0f0; */
  background-color: #f5f5f5;

}
.el-breadcrumb__item:last-child .el-breadcrumb__item__inner, .el-breadcrumb__item:last-child .el-breadcrumb__item__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__item__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__item__inner:hover{
    color:#6CA96E;
}
.el-breadcrumb__item__inner, .el-breadcrumb__item__inner a{
    color:#aaa;
}
.el-breadcrumb{
    width:1180px;
    margin: 0 auto;
}
</style>
