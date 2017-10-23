<template>
  <div>
    <div class="banner_box">
      <banner-tem :type="type"></banner-tem>
    </div>
    <div class="floor_box">
      <floor-tem></floor-tem>
    </div>
  </div>
</template>

<script>
import bannerTem from './children/banner'
import floorTem from './children/floor'
export default {
  data(){
    return {
        type:"fade"//slide,fade,kong
    }
  },
  components:{
    bannerTem,floorTem
  }
}
</script>

<style>
  .banner_box{
    width:100%;
    height: 470px;
    background-color: #f0f0f0;
  }
   
  .floor_box{
    width: 100%;
    background-color: white;
    height: auto;
    padding: 15px 0 30px;
  }
</style>
