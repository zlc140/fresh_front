<template>
  <div>
      <ul>
            <li class="" v-for="(son ,index) in child.aboutPro" :key="index" >
                <a href="javascript:" title="">
                    <img  class="img2" :src="son.img[0].path" alt="">
                    <p class="price">￥39.8</p>
                </a>
            </li>
        </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  
</style>
