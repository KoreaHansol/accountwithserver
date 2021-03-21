<template>
  <div class="container">
    <div class='cal-area'><Calender @pickDay="setDayFromChild"/></div>

    <div class="area">
        <div class="font">날짜</div>
        <div class="input-area"><input class="inputbox" :class="{ error: errorValidDate && !updateDate }" placeholder="날짜를 선택하세요" v-model="updateDate" readonly/></div>
    </div>
    <div class="area">
        <div class="font">내용</div>
        <div class="input-area"><input class="inputbox" :class="{ error: errorValidContent && !content }" placeholder="내용을 입력하세요" v-model="content"/></div>
    </div>
    <div class="area">
        <div class="font">수입</div>
        <div class="input-area"><input class="inputbox" :class="{ error: errorIncome && !updateIncome }" type="number" placeholder="숫자를 입력하세요" v-model="updateIncome"/></div>
    </div>
    <div class="area">
        <div class="font">지출</div>
        <div class="input-area"><input class="inputbox" :class="{ error: errorValidOutcome && !updateOutcome }" type="number" placeholder="숫자를 입력하세요" v-model="updateOutcome"/></div>
    </div>
    
    <div class="button-container">
        <div class="button-area" @click="addintoAccList">
            <div class="button-font">등록</div>
        </div>
        <div class="button-area" @click="pushCancleButton">
            <div class="button-font">취소</div>
        </div>
    </div>
  </div>
</template>

<script>
import Calender from '@/components/calander'
import _ from 'lodash'
export default {
  name: 'accountupdate',
  components: {
    Calender
  },
  computed: {
    getfilterdList () {
        return this.$store.getters.getaccList
    },
    searchAndGetAccListToSeq() {
        const searchAcc = _.filter( this.getfilterdList, (acc) => {
            return  acc.seq === this.$route.params.seq
        })

        return searchAcc
    }
  },
  data() {
    return {
      updateDate: '',
      updateIncome: 0,
      updateOutcome: 0,
      content: '',

      errorValidDate: false,
      errorIncome: false,
      errorValidOutcome: false,
      errorValidContent: false,

    }
  },
  created() {
      this.updateDate = this.searchAndGetAccListToSeq[0].date
      this.updateIncome = this.searchAndGetAccListToSeq[0].income
      this.updateOutcome = this.searchAndGetAccListToSeq[0].outcome
      this.content = this.searchAndGetAccListToSeq[0].content
  },
  methods: {
    setDayFromChild(day) {
        this.updateDate = day
    },
    validationForm() {
        let validationError = []

        if(!this.updateDate) {
            this.errorValidDate = true;
            validationError.push('날짜를 선택하세요')
        }
        if(!this.updateIncome) {
            this.errorIncome = true;
            validationError.push('수입을 입력하세요')
        }
        if(!this.updateOutcome) {
            this.errorValidOutcome = true;
            validationError.push('지출을 입력하세요')
        }
        if(!this.content) {
            this.errorValidContent = true;
            validationError.push('내용을 입력하세요')
        }

        if(validationError.length){
            alert('필수 데이터를 입력하세요')
        }
        return validationError
    },
    addintoAccList() {
        if(this.validationForm().length) {
            return
        }
            
        const updateOjb = {
            date: this.updateDate,
            income: this.updateIncome,
            outcome: this.updateOutcome,
            content: this.content,
            seq: this.$route.params.seq
        }
        this.$store.commit('updateIntoAccList', updateOjb)
        this.$router.push({ name: 'accountlist', params: {date: this.updateDate}})
    },
    pushCancleButton() {
        this.$router.push({ name: 'accountlist' })
    }
  }
}
</script>

<style scoped>
    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .container .cal-area {
        height: 40%;
    }
    .container .area {
        display: flex;
        flex-direction: row;
        height: 10%;
        background: blueviolet;
        border: 1px solid;
    }
    .font {
        text-align: center;
        width: 10%;
        align-self: center;
    }
    .input-area {
        display: flex;
        flex-direction: column;
        align-self: center;
        justify-content: center;
        width: 80%;
        height: 100%;
    }
    .inputbox {
        font-size: 100%;
        text-align: center;
        height: 50%;
        width: 100%;
    }


    .button-container {
        display: flex;
        flex-direction: row-reverse;
        height: 40%;
    }
    .button-container .button-area {
        display: flex;
        height: 20%;
        width: 10%;
        border: 1px solid;
        background: darkolivegreen;
        align-items: center;
        justify-content: center;
    }
    .button-container .button-area:hover {
        cursor: pointer;
        background: tomato;
    }
    .button-font {
        color: white;
    }
    .error {
        border: 3px solid red;
    }
</style>
