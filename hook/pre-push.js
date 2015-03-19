#!/usr/bin/env node

var nodeProcess = require( 'process' );
var nConsole = require( 'console' );
var opts = require( 'prepush-config' );
nodeProcess.chdir( opts.workingDirectory );
var path = require( 'path' );

var log = {
  ok: function () {
    var args = [].slice.call( arguments );
    args.unshift( '\x1B[33m\x1B[1m' );
    args.push( '\x1B[22m\x1B[39m' );

    nConsole.log.apply( nConsole, args );
  },
  log: function () {
    var args = [].slice.call( arguments );
    args.unshift( '\x1B[90m\x1B[1m' );
    args.push( '\x1B[22m\x1B[39m' );

    nConsole.log.apply( nConsole, args );
  },
  error: function () {
    var args = [].slice.call( arguments );
    args.unshift( '\x1B[31m\x1B[1m' );
    args.push( '\x1B[22m\x1B[39m' );

    nConsole.error.apply( nConsole, args );
  }
};

var Promise = ( function () {
  var _Promise;

  try {
    _Promise = require( 'prepush/lib/promise' );
  } catch (ex) {
    try {
      _Promise = require( path.resolve( opts.workingDirectory, './node_modules/prepush/lib/promise' ) );
    } catch (ex) {
      try {
        _Promise = require( 'es6-promise' ).Promise;
      } catch (err) {
        log.error( '>> could not execute the prepush missing `Promise` module. try running `npm i -D es6-promise`' );
      }
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

var doExec = function ( cmd, cb ) {
  var _exec = require( 'child_process' ).exec;
  return new Promise( function ( resolve, reject ) {
    _exec( cmd, function ( err, stdout, stderr ) {
      if ( !err ) {
        resolve( stdout );
      } else {
        reject( stderr );
      }
      cb && cb( err, stdout, stderr );
    } );
  } );
};

var runPrepushTasks = function ( tasksToRun ) {
  return tasksToRun.reduce( function ( seq, current ) {
    return seq.then( function () {
      return exec( current );
    } );
  }, Promise.resolve() );
};


var fs = require( 'fs' );
var readJSON = function ( filePath, options ) {
  return JSON.parse( String( fs.readFileSync( filePath, options ) ).replace( /^\ufeff/g, '' ) );
};

var getDirtyState = function () {
  //var dirtyState = [];
  var commands = [
    'git diff HEAD --name-only',
    'git ls-files --other --directory --exclude-standard'
  ];

  var p = commands.reduce( function ( seq, cmd ) {
    return seq.then( function ( prev ) {
      return doExec( cmd ).then ( function ( res ) {
        if ( res ) {
          var files = res.split( '\n' );
          if ( files.length > 0 ) {
            prev = prev.concat( files );
          }
        }
        return prev;
      } );
    } );
  }, Promise.resolve( [] ) );
  return p.then( function ( dirtyState ) {
    return dirtyState.filter( function ( entry ) {
      return entry !== '';
    } );
  } );
};

var doWithStashIf = function ( condition ) {
  if ( condition ) {
    return doExec( 'git stash --include-untracked' );
  }
  return Promise.resolve();
};

var checkNoRebaseBranch = function () {
  var getBranch = doExec( 'git branch | grep \'*\' | sed \'s/* //\'' );

  return getBranch.then( function ( branch ) {
    return branch !== '(no branch)';
  } );
};

var restoreStash = function ( condition, dirtyState ) {
  if ( condition ) {
    log.log( '>> restoring state...', JSON.stringify( dirtyState, null, 2 ) );
    return doExec( 'git stash pop' ).then( function () {
      log.log( '>> state restored!' );
      return true;
    } ).catch( function ( err ) {
      log.error( '>> error trying to restore the stash', err );
    } );
  }
  return Promise.resolve( true );
};

var main = function ( /*args*/ ) {
  //log.log( args );

  log.log( '>> prepush hook start' );

  var config = readJSON( opts.configFile );

  var tasks = config.prepush || [];

  if ( tasks.length === 0 ) {
    log.ok( '>> no prepush tasks specified on file', opts.configFile );
    return;
  }

  checkNoRebaseBranch().then( function ( noRebaseBranch ) {
    if ( noRebaseBranch ) {
      getDirtyState().then( function ( dirtyState ) {
        var isDirty = dirtyState.length > 0;
        if ( isDirty ) {
          log.log( '>> files in dirty state', JSON.stringify( dirtyState, null, 2 ) );
        }
        doWithStashIf( isDirty ).then( function () {
          var p = runPrepushTasks( tasks );

          p.then( function () {
            return restoreStash( isDirty, dirtyState );
          } );

          p.catch( function ( err ) {
            restoreStash( isDirty, dirtyState ).then( function () {
              if ( err ) {
                log.error( '>> prepush check failed. Stopping push' );
                nodeProcess.exit( err );
              }
            } );
          } );
        } );
      } );
      return;
    }

    log.ok( '>> skip prepush when not in a branch' );
  } );
};

nodeProcess.stdin.once( 'readable', function () {
  var data = nodeProcess.stdin.read();
  if ( !data ) {
    log.log( '>> no changes to verify' );
    return;
  }
  main( data.toString().split( ' ' ).concat( nodeProcess.argv ) );
} );
