const _ = require( 'lodash' )
const accountList = require( './accountList' )

module.exports.handler = async function( event, context ) {
  let comp = event.path.comp
  comp = comp ? comp.toLowerCase() : comp

  if(comp === 'accountlist') {
    return await accountList.handler( event, context )
  }
  else {
    throw new Error( 'Invalid Component' )
  }
}
