#!/usr/bin/env node

var nodeProcess = require( 'process' );

var Promise = ( function () {
  var _Promise;

  try {
    _Promise = require( 'prepush/lib/promise' );
  } catch (ex) {
      try {
          _Promise = require( 'es6-promise' ).Promise;
      } catch (err) {
              console.error( '>> could not execute the prepush missing `Promise` module. try running `npm i -D es6-promise`' );
      }
  }
  return _Promise;
}());

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
