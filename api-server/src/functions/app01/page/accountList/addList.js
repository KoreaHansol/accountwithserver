const _ = require( 'lodash' )
const dbTran = require( '@/util/mysqldb' )

module.exports = async function( event, context ) {
  let date = event.body.date
  let content = event.body.content
  let income = event.body.income
  let outcome = event.body.outcome

  return await dbTran(async function( conn ) {
    let results = await conn.query( sql.insertSample, [
        date, content, income, outcome
    ])

    let sampleId = results.insertId

    return {
      code : 200,
      message : 'success',
      payload : {
        date, content, income, outcome
      }
    }
  })
}

const sql = {
  insertSample : `
  INSERT INTO \`account\`.ACCOUNT_LIST
  ( DATE, CONTENT, INCOME, OUTCOME ) VALUES
  ( ?, ?, ?, ? )`
}
