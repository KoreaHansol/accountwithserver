<template>
  <div class="container">
    <div class="display-month">
      <div class="move-month-button" @click="moveMonthClickEvent('decrease')">&lt;</div>
      <div>{{ selectYear }}년 {{ selectMonth }}월</div>
      <div class="move-month-button" @click="moveMonthClickEvent('increase')">&gt;</div>
    </div>
      <!-- 요일(고정된) -->
    <div class="day-of-week">
      <div class="day-area" v-for="(day, idx) in dayOfWeek" :key="idx">
        <div class="day-font">{{ day }}</div>
      </div>
    </div>
    <!-- 날자들 -->
    <div class="day-of-row">
      <div class="day-font" v-for="(day, idx) in displayMonthOfDay" :key="idx" @click="selectDay(day)">{{ day }}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import _ from 'lodash'

export default {
  name: 'calander',
  data() {
    return {
      selectYear: moment().year(), //현재 년도
      selectMonth: moment().month() + 1, //현재 달
      pickDay: '', //마우스로 픽업한 날짜
      dayOfWeek: ['월', '화', '수', '목', '금', '토', '일'], // 요일은 고정

      displayMonthOfDay: [],
    }
  },
  created() {
    this.pushToCalenderLogicInDisplayArray()
  },
  updated() {
  },
  methods: {
    moveMonthClickEvent(mode) { //현재 select 된 년도와 달을 조정하기 위한 메소드
      switch(mode) {
        case 'increase':
          if(this.selectMonth >= 12) {
            this.selectMonth = 1
            this.selectYear++
          } else {
            this.selectMonth++
          }
          break
        case 'decrease':
           if(this.selectMonth <= 1) {
            this.selectMonth = 12
            this.selectYear--
          } else {
            this.selectMonth--
          }
          break
      }
      this.pushToCalenderLogicInDisplayArray() //갱신을 위한 호출
    },
    pushToCalenderLogicInDisplayArray() { //보여줄 날짜들을 요일에 맞게 잡아준후 넣어주는 메소드
      this.displayMonthOfDay = []
      const parseCurrentYearAndMonth = moment(this.selectYear + '-' + this.selectMonth, "YYYY-MM-DD"); //포맷팅
      const startOfMonth = moment(parseCurrentYearAndMonth).startOf('month').day() //3월에선 월욜으로 시작하고 (1)
      const endDayOfMonth = moment(parseCurrentYearAndMonth).endOf("month").format('DD') //달에서 끝날 (끝날은 곧 총 날자의 수를 의미)
      let surPlusOfMonth = 0; //''를 push하면 현재 달의 날짜수와 틀어짐으로 계산해줄 변수가 필요
      
      for(let i = 1; i < endDayOfMonth + startOfMonth; i++) {
        if(i < startOfMonth) {
          this.displayMonthOfDay.push('')
          surPlusOfMonth++;
        } else {
          this.displayMonthOfDay.push(i - surPlusOfMonth)
        }

        if(i - surPlusOfMonth >= endDayOfMonth)
          break;
      }
    },
    selectDay(day) {
      this.pickDay = this.selectYear + '-' + this.selectMonth + '-' + day
      this.$emit('pickDay', this.pickDay)
    }
  }
}
</script>

<style scoped lang="scss">
// 루트
  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: white;
    overflow: hidden;
  }

  // 상단 - 요일
  .day-of-week {
    display: flex;
    flex-direction: row;
    background: antiquewhite;
    height: 14%;
  }
  .day-of-week .day-area {
    display: flex;
    width: 14.285714%;
    flex: 0 auto;
    height: 100%;
    border: solid 1px;
    justify-content: center;
  }
  .day-of-week .day-area .day-font {
    align-self: center;
  }

  // 상단 - 화살표쪽
  .display-month {
    display: flex;
    justify-content: space-between
  }
  .display-month .move-month-button:hover {
    cursor: pointer;
  }

  // 요일들
  .day-of-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 14%;
  }
  .day-of-row .day-font {
    display: flex;
    width: 14.285714%;
    flex: 0 auto;
    height: 100%;
    z-index: 9999;
    background: beige;
    border: solid 1px;
    justify-content: center;
  }
  .day-of-row .day-font:hover {
    cursor: pointer;
    background: white;
  }
</style>
