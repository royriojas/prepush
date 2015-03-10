#!/usr/bin/env node

var Promise = require( 'prepush/lib/promise' );
var nodeProcess = require( 'process' );

var exec = function ( cmd ) {

  var spawn = require( 'child_process' ).spawn;
  var args = cmd.split( ' ' );
  var command = args.shift();

  return new Promise( function ( resolve, reject ) {

    var cp = spawn( command, args, {
      stdio: 'inherit'
    } );

    cp.on( 'exit', function ( exitCode ) {
      if ( exitCode !== 0 ) {
        reject( exitCode );
      } else {
        resolve();
      }
    } );
  } );
};

var main = function () {
  var opts = require( 'prepush-config' );

  nodeProcess.chdir( opts.workingDirectory );

  console.log( '>>> prepush hook start' );

  var tasks = opts.prepush || [];

  var p = tasks.reduce( function ( seq, current ) {
    return seq.then( function () {
      return exec( current );
    } );
  }, Promise.resolve() );

  p.then( function () {
    console.log( '>>> prepush hook finished. Everything is Ok' );
  } );

  p.catch( function ( err ) {
    if ( err ) {
      console.error( '>> prepush check failed. Stopping push' );
      nodeProcess.exit( err );
    }
  } );
};

main();
