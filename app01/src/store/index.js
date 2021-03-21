
import Vuex from 'vuex'
import Vue from 'vue'
import _ from 'lodash'
import 'vue-datetime/dist/vue-datetime.css'
import moment from 'moment'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        accList: []
    },
    getters: {
        getaccList: state => {
            let sortAcc = _.sortBy(state.accList, acc => {
                return moment(acc.date);
            });
            return sortAcc
        },
    },
    mutations: {
        setAccoutListFromServer(state, data) { //서버에서 가져온 리스트
            state.accList = data
        },
    }
})
export default store