#!/usr/bin/env node
var console = require( '../lib/console' );
var process = require( '../lib/process' );

try {
  require( '../lib/cli' ).install( process.argv );
} catch (ex) {
    console.error( ex.message );
    /*eslint-disable*/
    process.exit( 1 );
    /*eslint-enable*/
}
