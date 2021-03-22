import axios from 'axios'

export default {
  updateList( obj ) {
      console.log(obj)
    return axios.post( 'http://localhost:9191/page/accountList/updateList',{
      date: obj.date, income: obj.income, outcome: obj.outcome, content: obj.content, seq: obj.seq
    } ).then( res => res.data ).then( res => {
      if( res.code !== 200 ) {
        throw res
      } else {
        return res
      }
    } )
  }
}
