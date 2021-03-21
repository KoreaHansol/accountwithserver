const _ = require( 'lodash' )
const dbTran = require( '@/util/mysqldb' )

module.exports = async function( event, context ) {
  let seq = event.body.seq

  return await dbTran(async function( conn ) {
    let results = await conn.query( sql.deleteSample, [
        seq
    ])

    let sampleId = results.insertId

    return {
      code : 200,
      message : 'success',
      payload : {
        seq
      }
    }
  })
}

const sql = {
  deleteSample : `
    DELETE FROM \`account\`.ACCOUNT_LIST
    WHERE seq=?
  `
}
