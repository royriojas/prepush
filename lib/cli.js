'use strict';

module.exports = {
  dirname: __dirname,
  install: function ( args ) {
    var sFormat = require( 'stringformat' );
    var path = require( 'path' );
    var process = require( './process' );
    var options = require( './options' );
    var chalk = require( 'chalk' );

    var readJSON = require( 'read-json-sync' );

    var opts = options.parse( args );

    if ( opts.help ) {
      console.log( options.generateHelp() );
      return;
    }

    if ( opts.version ) {
      console.log( chalk.bold( readJSON( path.resolve( this.dirname, '../package.json' ) ).version ) );
      return;
    }

    var command = opts._.join( '' );
    if ( !command ) {
      console.error( chalk.red( 'Missing command, please indicate "install" or "remove"\n\n' ) );
      console.log( options.generateHelp() );
      return;
    }

    var hook = require( './hook' );

    if ( command === 'install' ) {
      if ( !opts.config ) {
        console.log( chalk.gray( 'config not provided, trying to use the package.json at current working directory' ) );
        opts.config = './package.json';
      }

      var configFile = path.resolve( process.cwd(), opts.config );
      var fs = require( 'fs' );
      var cfg;
      if ( fs.existsSync( configFile ) ) {
        cfg = readJSON( configFile );
      } else {
        console.error( chalk.red( 'Could not find config file' ), opts.config );
        return;
      }

      if ( !cfg.prepush ) {
        console.error( chalk.red( '>> "prepush" field missing, Make sure your config file contains this field' ), cfg );
        return;
      }
      try {
        hook.install( cfg ).then( function ( pathToFile ) {
          console.log( chalk.yellow( '>> Prepush file copied to:' ), pathToFile );
        } );
      } catch (ex) {
          console.error( ex.stack );
          throw new Error( sFormat( 'Error installing prepush hook, Error: {0}', ex.message ) );
      }
    }
    if ( command === 'remove' ) {

      try {
        hook.remove().then( function ( pathToFile ) {
          console.log( chalk.yellow( '>> prepush file removed:' ), pathToFile );
        } );
      } catch (ex) {
          console.error( ex.stack );
          throw new Error( sFormat( 'Error installing prepush hook, Error: {0}', ex.message ) );
      }
    }
  }
};
