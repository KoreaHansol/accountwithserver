import axios from 'axios'

export default {
  addList( obj ) {
      console.log(obj)
    return axios.post( 'http://localhost:9191/page/accountList/addList',{
      date: obj.date, income: obj.income, outcome: obj.outcome, content: obj.content
    } ).then( res => res.data )
  }
}
