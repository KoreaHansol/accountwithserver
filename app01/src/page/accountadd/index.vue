<template>
  <div class="container">
    <div class='cal-area'><Calender @pickDay="setDayFromChild"/></div>

    <div class="area">
        <div class="font">날짜</div>
        <div class="input-area"><input class="inputbox" :class="{ error: errorValidDate && !insertDate }" placeholder="날짜를 선택하세요" v-model="insertDate" readonly/></div>
    </div>
    <div class="area">
        <div class="font">내용</div>
        <div class="input-area"><input class="inputbox" :class="{ error: errorValidContent && !content }" maxlength="8"  placeholder="내용을 입력하세요" v-model="content"/></div>
    </div>
    <div class="area">
        <div class="font">수입</div>
        <div class="input-area"><input class="inputbox" :class="{ error: errorIncome && !insertIncome }" type="number" placeholder="숫자를 입력하세요" v-model="insertIncome" @input="maxLengthCheck($event)"/></div>
    </div>
    <div class="area">
        <div class="font">지출</div>
        <div class="input-area"><input class="inputbox" :class="{ error: errorValidOutcome && !insertOutcome }" type="number" placeholder="숫자를 입력하세요" v-model="insertOutcome" @input="maxLengthCheck($event)"/></div>
    </div>
    
    <div class="button-container">
        <div class="button-area" @click="addintoAccList">
            <div class="button-font">등록</div>
        </div>
        <div class="button-area" @click="pushCancleButton">
            <div class="button-font">취소</div>
        </div>
         <!-- <div class="button-area" @click="pushOpenPopupButton">
            <div class="button-font">OpenPopup</div>
        </div>
         <div class="button-area" @click="pushClosePopupButton">
            <div class="button-font">ClosePopup</div>
        </div> -->
    </div>
  </div>
</template>

<script>
import Calender from '@/components/calander'
import req2svr from './req2svr'
import popupAnnchor from '../../plugins/popupmanager'
export default {
  name: 'accountadd',
  components: {
    Calender,
    popupAnnchor
  },
  data() {
    return {
      insertDate: '',
      insertIncome: null,
      insertOutcome: null,
      content: '',

      errorValidDate: false,
      errorIncome: false,
      errorValidOutcome: false,
      errorValidContent: false,
      

      instance: null
    }
  },  
  computed: {
    
  },
  methods: {
    setDayFromChild(day) {
        this.insertDate = day
    },
    validationForm() {
        let validationError = []

        if(!this.insertDate) {
            this.errorValidDate = true;
            validationError.push('날짜를 선택하세요')
        }
        if(!this.insertIncome) {
            this.errorIncome = true;
            validationError.push('수입을 입력하세요')
        }
        if(!this.insertOutcome) {
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
    maxLengthCheck(evt) { //input type이 number일경우 maxLength가 먹히지 않으므로 메소드로 처리
        if (evt.target.value.length > 10){
            this.insertIncome = evt.target.value.slice(0, 10);
        }    
    },
    addintoAccList() {
        if(this.validationForm().length) {
            return
        }
        const insertOjb = {
            date: this.insertDate,
            income: this.insertIncome,
            outcome: this.insertOutcome,
            content: this.content
        }

        req2svr.addList(insertOjb).then(()=> {
            this.$router.push({ name: 'accountlist', params: { date: this.insertDate }})
        })
    },
    pushCancleButton() {
        this.$router.push({ name: 'accountlist' })
    },
    pushOpenPopupButton() {
        this.$popupManager.open( Calender )
        // this.instance = this.$PopupManager.open(Calender, {}, 'backIgnore')
        // console.log('popupManager ', this.$popupManager)
        // console.log('popup is open? ', this.$popupManager.isOpened(Calender))
        // console.log('intance is ', this.instance)
    },
    pushClosePopupButton() {
        const instance = this.$popupManager.close(this.instance, {})
        console.log('popup is open? ', this.$popupManager.isOpened(Calender))
        console.log('close instance ', instance)
    },
  }
}
</script>

<style scoped lang="scss">
    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        .cal-area {
            height: 40%;
        }
        .area {
            display: flex;
            flex-direction: row;
            height: 10%;
            background: blueviolet;
            border: 1px solid;
        }
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
        .button-area {
            display: flex;
            height: 20%;
            width: 10%;
            border: 1px solid;
            background: darkolivegreen;
            align-items: center;
            justify-content: center;
        }
        .button-area:hover {
            cursor: pointer;
            background: tomato;
        }
    }
    .button-font {
        color: white;
    }
    .error {
        border: 3px solid red;
    }
</style>
