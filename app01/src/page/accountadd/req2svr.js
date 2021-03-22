import axios from 'axios'

export default {
  addList({ date, income, outcome, content }) {
    return axios.post('http://localhost:9191/page/accountList/addList', {
      date, income, outcome, content
    }).then(res => res.data).then( res => {
      if( res.code !== 200 ) {
        throw res
      } else {
        return res
      }
    } )
  }
}
