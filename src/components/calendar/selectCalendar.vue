<template>
  <div class="comp-full-calendar">
    <!-- header pick month -->
    <fc-header :current-month="currentMonth"
      :first-day="firstDay"
      :locale="locale"
      @change="emitChangeMonth">

      <div slot="header-left">
        <slot name="fc-header-left">
        </slot>
      </div>

      <div slot="header-right">
        <slot name="fc-header-right">
        </slot>
      </div>
    </fc-header>
    <!--日期多选表格 -->
    <div class="full-calendar-body">
      <div class="weeks" style="line-height: 75px;">
        <strong class="week" v-for="dayIndex in 7" :key="dayIndex"> {{ (dayIndex - 1) | localeWeekDay(firstDay, locale) }}</strong>
      </div>
      <div class="dates" ref="dates">
        <div class="dates-bg">
          <div class="week-row" v-for="(week,index) in currentDates" :key="index" >
            <div class="day-cell" v-for="(day,id) in week" :key="id"
                 :class="{'today' : day.isToday, 
              'not-cur-month' : !day.isCurMonth}" 
               @click.stop="dayClick(day, id,index)"
               >
              <p class="day-number" :class="day.select?'select':''" >{{ day.monthDay }}</p>
            </div>
          </div>
        </div>

        <!-- 日期当天存在事件的模板 -->
        <div class="dates-events" v-if="checkMore==='false'?true:false">
          <div class="events-week" v-for="(week,index) in currentDates" :key="index">
            <div class="events-day" v-for="day in week" :key="day.index"
                 :class="{'today' : day.isToday,
              'not-cur-month' : !day.isCurMonth}" @click.stop="dayClick(day.date, $event)">
              <p class="day-number">{{day.monthDay}}</p>
              <div class="event-box" v-if="day.events.length > 0" @click.stop="selectThisDay(day, $event)" >
                <p class="more-link">
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 输出模板，并对事件进行跟踪 -->
        <div class="more-events" v-show="showMore" v-if="checkMore==='false'?true:false"
             :style="{left: morePos.left + 'px', top: morePos.top + 'px'}">
          <div class="more-header" @click.stop="showMore = false" ref="moreHead">
            <span class="title">{{ moreTitle(selectDay.date) }}</span>
            <!--<span class="close" @click.stop="showMore = false">x</span>-->
          </div>
          <div class="more-body">
            <div   v-for="(event,index) in selectDay.events" :key="index"
                  v-show="event.isShow">
              <!-- <li class="body-item" v-for="(item,id) in event.products" :key="id"
                  @click="eventClick(item, $event)">
                {{item.goodsTitle}} 
              </li> -->
              <pro-tem :proList="event.goodsVoList" @editList="editList(event.products)"></pro-tem>
            </div>
          </div>
        </div>

        <slot name="body-card">

        </slot>

      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import langSets from './dataMap/langSets'
  import {dateFunc} from './components/dateFunc'
  import moment from 'moment';
  import EventCard from './components/eventCard.vue';
  import proTem from './components/pro.vue'

  import tool from '@/config/tool'
  export default {
    props : {
      checkMore : {
        type :String,
        default:'false'
      },
      events : { // events will be displayed on calendar
        type : Array,
        default : []
      },
      locale : {
        type : String,
        default : 'zh'
      },
      firstDay : {
        type : Number | String,
        validator (val) {
          let res = parseInt(val);
          return res >= 0 && res <= 6
        },
        default : 0
      }
    },
    data () {
      return {
        langSets:langSets,
        currentMonth : moment().startOf('month'),
        isLismit : true,
        showMore : false,
        morePos : {
          top: 0,
          left : 0
        },
        selectDay : {},
        allSelect:[],
        currentDates:null
      }
    },
    components : {
      'event-card': EventCard,
      'fc-header' : require('./components/header'),
      'pro-tem'   : proTem
    },
    mounted () {
      this.currentDates = this.getCalendar()
      this.emitChangeMonth(this.currentMonth);
    },
    
    computed: {
      // currentDates () {
      //   console.log('text')
      //   return this.getCalendar()
      // }
    },
    methods : {
      editList(val){
        // console.log(val)
      },
      emitChangeMonth (firstDayOfMonth) {
        this.showMore = false
        this.currentMonth = firstDayOfMonth;
        //console.log(this.currentMonth)
         this.currentDates = this.getCalendar()
        let start = dateFunc.getMonthViewStartDate(firstDayOfMonth, this.firstDay);
        let end = dateFunc.getMonthViewEndDate(firstDayOfMonth, this.firstDay);

        this.$emit('changeMonth', start, end, firstDayOfMonth)
      },
      moreTitle (date) {
        if (!date) return '';
        return moment(date).format('D');
      },
      getCalendar () {
          
        // calculate 2d-array of each month
        let monthViewStartDate = dateFunc.getMonthViewStartDate(this.currentMonth, this.firstDay);
        let calendar = [];

        for(let perWeek = 0 ; perWeek < 6 ; perWeek++) {

          let week = [];
          for(let perDay = 0 ; perDay < 7 ; perDay++) {
             
               if(this.allSelect.indexOf(moment(monthViewStartDate).valueOf()) > -1){
                 week.push({
                    monthDay : monthViewStartDate.date(),
                    isToday : monthViewStartDate.isSame(moment(), 'day'),
                    isCurMonth : monthViewStartDate.isSame(this.currentMonth, 'month'),
                    weekDay : perDay,
                    date : moment(monthViewStartDate),
                    events : this.slotEvents(monthViewStartDate),
                    select : true
                  });
               }else{
                 week.push({
                    monthDay : monthViewStartDate.date(),
                    isToday : monthViewStartDate.isSame(moment(), 'day'),
                    isCurMonth : monthViewStartDate.isSame(this.currentMonth, 'month'),
                    weekDay : perDay,
                    date : moment(monthViewStartDate),
                    events : this.slotEvents(monthViewStartDate),
                    select : false
                  });
               }
            
            monthViewStartDate.add(1, 'day');
          }
          calendar.push(week);
        }
        //console.log(calendar)
        return calendar
      },
      slotEvents (date) {
        // find all events start from this date
        //console.log('test',this.events)
        let cellIndexArr = [];
        let thisDayEvents = this.events.filter(day => {
          if(!isNaN(day.deliverTime)){//将lang格式转化为格式YYYY-MM-DD
            day.deliverTime = tool.formatDate.format((day.deliverTime),'yyyy-MM-dd')
          }
          if((day.deliverTime+'').indexOf('-')>-1){
              let st = moment(day.deliverTime)
              let ed = moment(day.end ? day.end : day.deliverTime);
              return date.isBetween(st, ed, null, '[]');
          }
          // else{//传入的时间格式为毫秒
          //     let st = parseInt(day.deliverTime)
          //     let ed = parseInt(day.end ? day.end : day.deliverTime);
          //     let mid = parseInt(date.valueOf())
          //     // console.log(st,mid)
          //     if(st == mid){  return true  }else{ return false }
          // }
          // return date.isBetween(st, ed, null, '[]');
        });
        //console.log(thisDayEvents)
        // sort by duration
        thisDayEvents.sort((a,b)=>{
          if(!a.cellIndex) return 1;
          if (!b.cellIndex) return -1;
          return a.cellIndex - b.cellIndex
        });
        //console.log(thisDayEvents)
        // mark cellIndex and place holder
        
        for (let i = 0;i < thisDayEvents.length;i++) {
          thisDayEvents[i].cellIndex = thisDayEvents[i].cellIndex || (i + 1);
          thisDayEvents[i].isShow = true;
         //console.log(thisDayEvents[i].cellIndex,i+1)
          if (thisDayEvents[i].cellIndex == i+1 || i>2) continue;
          
          thisDayEvents.splice(i,0,{
            title : 'holder',
            cellIndex : i+1,
            start : date.format(),
            end : date.format(),
            isShow : false
          })
        }
        console.log(thisDayEvents)
        return thisDayEvents
      },
      selectThisDay (day, jsEvent) {
        // console.log(this.events)
        this.selectDay = day;
        this.showMore = true;
       
        this.morePos = this.computePos(jsEvent.target,this.selectDay.weekDay);
        // this.morePos.top += 75;
        let events = day.events.filter(item =>{
          return item.isShow == true
        });
        this.$emit('moreClick', day.date, events, jsEvent)
      },
      computePos (target,wed) {
        
        // console.log('test',wed)
        let eventRect = target.getBoundingClientRect();
        let pageRect = this.$refs.dates.getBoundingClientRect();
       
        // console.log(wed,eventRect,pageRect)
        if(wed == 6){
           this.$refs.moreHead.style.left = eventRect.width+'px';
           return {
              left : eventRect.left - pageRect.left - eventRect.width ,
              top  : eventRect.top + eventRect.height - pageRect.top
            }
        }else{
          this.$refs.moreHead.style.left = '0px';
           return {
              left : eventRect.left - pageRect.left,
              top  : eventRect.top + eventRect.height - pageRect.top
            }
        }
       
      },
      dayClick(day, index,parendIndex) {
        let toDay = moment().valueOf()
        if(this.checkMore != 'false' && toDay < day.date.valueOf()){
              day.select = !day.select
             if(day.select == true){
                 this.allSelect.push(day.date.valueOf())
             }else{
                 if(this.allSelect.indexOf(day.date.valueOf())>-1){
                  //  console.log(this.allSelect.indexOf(day.date.valueOf()))
                    this.allSelect.splice(this.allSelect.indexOf(day.date.valueOf()),1)
                 }
             }
             this.$emit('dayClick', this.allSelect)
        }
       this.showMore = false
       
      },
      eventClick(event, jsEvent) {
        if (!event.isShow) return;

        jsEvent.stopPropagation();
        //let pos = this.computePos(jsEvent.target);
        this.$emit('eventClick', event, jsEvent);
      }
    },
    filters: {
      localeWeekDay (weekday, firstDay, locale) {
 
        firstDay = parseInt(firstDay);
        const localMoment = moment().locale(locale);
        if(locale == 'zh'){
          return langSets.zh.weekNames[(weekday + firstDay) % 7]
        }else {
          return localMoment.localeData().weekdaysShort()[(weekday + firstDay) % 7];
        }
        



      }
    }
  }
  
</script>
<style lang="scss" scoped>
@import '../../assets/chang.scss';
  .comp-full-calendar{
    // font-family: "elvetica neue", tahoma, "hiragino sans gb";
    padding:20px 0 0;
    background: #fff;
    max-width: 1200px;
    margin:0 auto;
    ul,p{
      margin:0;
      padding:0;
    }
  }

  .full-calendar-body{
    margin-top: -1px;
  .weeks{
    display: flex;
    border-top:1px solid #e0e0e0;
    border-bottom:1px solid #e0e0e0;
    border-left:1px solid #e0e0e0;
    font-size: 18px;
    color: #888;
  .week{
    flex:1;
    text-align: center;
    border-right:1px solid #e0e0e0;
  font-weight: normal;
  }
  }
  .dates {
    position:relative;
  .week-row{
  // width: 100%;
  // position:absolute;
    border-left:1px solid #e0e0e0;
    display: flex;
  .day-cell{
    flex:1;
    height: 90px;
    border-right:1px solid #e0e0e0;
    border-bottom:1px solid #e0e0e0;
    font-size: 18px;
    color:#333;
  .day-number{
    text-align: center;
    line-height: 90px;
  }
  &.today{
     background-color:#EEF5EE;
   }
  &.not-cur-month{
  .day-number{
    color:rgba(0,0,0,.24);
  }
  }
  }
  }
  .dates-events{
    position:absolute;
    top:0;
    left:0;
    z-index:1;
    width: 100%;
  .events-week{
    display: flex;


  .events-day{
    cursor: pointer;
    flex:1;
    height: 91px;
    overflow: hidden;
    text-overflow: ellipsis;
    position:relative;
  .day-number{
    text-align: right;
    padding:4px 5px 4px 4px;
    opacity: 0;
  }
  &.not-cur-month{
  .day-number{
    color:rgba(0,0,0,.24);
  }
  }
  .event-box{
    width:100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
  .event-item{

    cursor: pointer;
    font-size:12px;
    background-color:#C7E6FD;
    margin-bottom:2px;
    color: rgba(0,0,0,.87);
    padding:0 0 0 4px;
    height: 18px;
    line-height: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  &.is-start{
     margin-left: 4px;
   // border-top-left-radius:4px;
   // border-bottom-left-radius:4px;
   }
  &.is-end{
     margin-right: 4px;
   // border-top-right-radius:4px;
   // border-bottom-right-radius:4px;
   }
  &.is-opacity{
     opacity: 0;
   }
  }
  .more-link{
    
  }
  &:after{
     cursor: pointer;
      text-align: right;
      content:'';
      position:absolute;
      bottom: -26px;
      width:20px;
      right:0px;
      display:block;
      font-size: 14px;
      border:26px solid ;  
      border-color:transparent $baseColor transparent transparent; 
  }
  }
  }
  }
  }
  .more-events{
    position:absolute;
    width: 343px;
    z-index: 2;
    border:1px solid #eee;
    box-shadow: 0 2px 6px rgba(0,0,0,.15);
  .more-header{
    background-color:white;
    width:170px;
    height:90px;
    top: -91px;
    color:$baseColor;
    cursor: pointer;
    position: absolute;
    left: 0;
    text-align: center;
    line-height: 90px;
    font-size: 18px;
    border: 1px solid $baseColor;
    border-color:$baseColor $baseColor white $baseColor;
  .title{
    flex:1;
  }
  .close{
    margin-right: 2px;
    cursor: pointer;
    font-size: 16px;
  }
  }
  .more-body{
    padding-top: 10px;
    background-color: white;
    height: 146px;
    overflow: hidden;
    border: 1px solid $baseColor;
  .body-list{
    height: 144px;
    padding:5px;
    overflow: auto;
    background-color:#fff;
  .body-item{
    cursor: pointer;
    font-size:12px;
    background-color:#C7E6FD;
    margin-bottom:2px;
    color: rgba(0,0,0,.87);
    padding:0 0 0 4px;
    height: 18px;
    line-height: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  }
  }
  }
  }
  }
</style>