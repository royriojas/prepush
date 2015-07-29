'use strict';

module.exports = {
  run: function ( cli ) {
    var sFormat = require( 'stringformat' );
    var path = require( 'path' );
    var process = require( '../lib/process' );

    var opts = cli.opts;

    var command = opts._[0];
    if ( !command || !command.match(/\binstall\b|\bremove\b/)) {
      cli.error( 'Missing command, please indicate "install" or "remove"\n' );
      cli.showHelp();
      return;
    }

    var hook = require( '../lib/hook' );

    if ( command === 'install' ) {
      if ( !opts.config ) {
        cli.subtle('Config not provided, trying to use the package.json at current working directory' );
        opts.config = './package.json';
      }

      var configFile = path.resolve( process.cwd(), opts.config );
      var fs = require( 'fs' );
      var cfg = {};
      if ( fs.existsSync( configFile ) ) {
        cfg.configFile = configFile;
      } else {
        cli.error( 'Could not find config file', opts.config );
        return;
      }

      hook.install( cfg ).then( function ( pathToFile ) {
        cli.subtle( sFormat( '`prepush` file copied to: {0}', pathToFile ) );
        cli.ok('Done!' );
      }, function (ex) {
        cli.error( sFormat( 'Error installing `prepush` hook, Error: {0}', ex.message ) );
      } );
    }
    if ( command === 'remove' ) {
      hook.remove().then( function ( pathToFile ) {
        cli.ok( '`prepush` file removed:', pathToFile );
      }, function (ex) {
        cli.error( sFormat( 'Error installing `prepush` hook, Error: {0}', ex.message ) );
      } );
    }
  }
};
