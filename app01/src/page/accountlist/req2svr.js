import axios from 'axios'

export default {
  getAllAccountList() {
    return axios.get( 'http://localhost:9191/page/accountList/getList' )
    .then( res => res.data )
    .then( res => {
      if( res.code !== 200 ) {
        throw res
      } else {
        return res
      }
    } )
  },
  deleteList( seq ) {
    return axios.post( 'http://localhost:9191/page/accountList/deleteList',{
      seq: seq
    } ).then( res => res.data )
  }
}
