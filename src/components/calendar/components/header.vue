<template>
  <div class="full-calendar-header">
    <div class="header-left">
      <slot name="header-left">
        
      </slot>
      <a @click.stop="goNow" class="goNow">回到今日</a>
    </div>
    <div class="header-center">
      <span class="prev-month" @click.stop="goPrev">{{leftArrow}}</span>
      <span class="title">{{title}}</span>
      <span class="next-month" @click.stop="goNext">{{rightArrow}}</span>
    </div>
    <div class="header-right">
      <slot name="header-right">
      </slot>
    </div>
  </div>
</template>
<script type="text/babel">
  import langSets from '../dataMap/langSets'
  import {dateFunc} from './dateFunc'
  import moment from 'moment';

  export default {
    props : {
      currentMonth : {},
      titleFormat  : {},
      firstDay     : {},
      monthNames   : {},
      locale       : {}
    },
    data () {
      return {
        leftArrow  : '<',
        rightArrow : '>'
      }
    },
    mounted(){
      // console.log(this.currentMonth)
    },
    computed: {

      title () {
         
        if (!this.currentMonth) return;
        //console.log(this.locale)
        if(this.locale == 'zh'){
          let mon = this.currentMonth.locale(this.locale).format('M')
           let yea = this.currentMonth.locale(this.locale).format('YYYY')
          let currentMon = yea+'年'+mon+"月";
          //console.log(currentMon)
          return currentMon
          
          
          
        }else {
        return this.currentMonth.locale(this.locale).format('MMMM YYYY')
        }
      }
    },
    methods : {
      goPrev () {
        var newMonth = moment(this.currentMonth).subtract(1, 'months').startOf('month');
        this.$emit('change', newMonth);
      },
      goNext () {
        var newMonth = moment(this.currentMonth).add(1, 'months').startOf('month');
        this.$emit('change', newMonth);
      },
      goNow(){
        var newMonth = moment().locale(this.locale).startOf('month');
        this.$emit('change', newMonth);
      }
    }
  }
</script>
<style lang="scss">
$baseColor:#6CA96E;
.full-calendar-header{
  color:$baseColor;
  display: flex;
  align-items: center;
  background-color: #F8F8F8;
  height: 58px;
  border: 1px solid #e0e0e0;
  .header-left,.header-right{
    flex:1;
  }
  .header-center{
    letter-spacing: 2px;
    flex:3;
    text-align:center;
    font-size: 22px;
    .title{
      margin: 0 10px;
    }
    .prev-month,.next-month{
      cursor: pointer;
    }
  }
  .goNow{
    padding: 0 30px;
    cursor: pointer;
    font-size: 14px;
     color:$baseColor;
    &:hover{
      color:#333;
    }
  }
}
</style>
