const _ = require( 'lodash' )
const getList = require( './getList' )
const addList = require('./addList')
const updateList = require('./updateList')

module.exports.handler = async function( event, context ) {
  let method = event.path.method
  method = method ? method.toLowerCase() : method
  

  if( method === 'getlist') {
    return await getList( event, context )
  } else if( method === 'addlist') {
    return await addList( event, context )
  } else if( method === 'updatelist') {
    return await updateList( event, context )
  } else {
    throw new Error( 'Invalid Method' )
  }
}