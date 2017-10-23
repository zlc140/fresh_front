<template>
  <div>
      <ul>
            <li class="" v-for="(son ,index) in child.aboutPro" :key="index" >
                <router-link :to="{path:'detail',query:{id:`${item.goodsId}`}}">
                    <img  class="img2" :src="son.img[0].path" alt="">
                    <p class="price">{{item.price.GOODS_MARKET_PRICE | currency}}</p>
                </router-link>
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
