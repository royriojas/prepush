module.exports = function () {
  var exec = require( 'child_process' ).exec;
  var Promise = require( 'es6-promise' ).Promise;
  var trim = require( 'lodash.trim' );

  return new Promise( function ( resolve, reject ) {
    exec( 'git rev-parse --show-toplevel', function ( err, stdout ) {
      if ( err ) {
        reject( err );
        return;
      }
      console.log('here');
      resolve( trim( stdout ) );
    } );
  } );
};
