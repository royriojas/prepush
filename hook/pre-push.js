#!/usr/bin/env node

var fs = require( 'fs' );
var nodeProcess = require( 'process' );
var nConsole = require( 'console' );
var opts = require( 'prepush-config' );
nodeProcess.chdir( opts.workingDirectory );
var path = require( 'path' );
var env = nodeProcess.env || { };

var readJSON = function ( filePath, options ) {
  return JSON.parse( String( fs.readFileSync( filePath, options ) ).replace( /^\ufeff/g, '' ) );
};

var config = readJSON( opts.configFile );
var prepushSection = config.prepush;
var configPrepush = prepushSection || { };
var coloredOuput = configPrepush.coloredOuput;

// if the coloredOutput was not specified
if ( typeof coloredOuput === 'undefined' ) {
  // try to use the value of the env variable
  coloredOuput = env.__CLIX_COLORED_OUTPUT__ === 'true';
}

var green = function () {
  var args = [ ].slice.call( arguments );
  if ( !coloredOuput ) {
    return args;
  }
  args.unshift( '\x1B[33m' );
  args.push( '\x1B[22m\x1B[39m' );
  return args;
};

var gray = function () {
  var args = [ ].slice.call( arguments );
  if ( !coloredOuput ) {
    return args;
  }
  args.unshift( '\x1B[90m' );
  args.push( '\x1B[22m\x1B[39m' );
  return args;
};

var red = function () {
  var args = [ ].slice.call( arguments );
  if ( !coloredOuput ) {
    return args;
  }
  args.unshift( '\x1B[31m' );
  args.push( '\x1B[22m\x1B[39m' );
  return args;
};

var white = function () {
  var args = [ ].slice.call( arguments );
  if ( !coloredOuput ) {
    return args;
  }
  args.unshift( '\x1B[37m' );
  args.push( '\x1B[22m\x1B[39m' );
  return args;
};

var yellow = function () {
  var args = [ ].slice.call( arguments );
  if ( !coloredOuput ) {
    return args;
  }
  args.unshift( '\x1B[33m' );
  args.push( '\x1B[22m\x1B[39m' );
  return args;
};

var yellowString = function () {
  return yellow.apply( null, arguments ).join( '' );
};

var grayString = function () {
  return gray.apply( null, arguments ).join( '' );
};

var redString = function () {
  return red.apply( null, arguments ).join( '' );
};

var whiteString = function () {
  return white.apply( null, arguments ).join( '' );
};

var Promise = ( function () {
  var _Promise = require( './Promise' );

  // if native promise found, just use it instead attempt to require the `es6-promise` module
  if ( _Promise ) {
    return _Promise;
  }

  try {
    _Promise = require( 'prepush/lib/promise' );
  } catch (ex) {
    try {
      _Promise = require( path.resolve( opts.workingDirectory, './node_modules/prepush/lib/promise' ) );
    } catch (_ex) {
      try {
        _Promise = require( 'es6-promise' ).Promise;
      } catch (err) {
        log.error( '>> could not execute the prepush missing `Promise` module. try running `npm i -D es6-promise`' );
      }
    }
  }
  return _Promise;
}());


// taken from: https://github.com/noyobo/confirm-simple/blob/master/lib/index.js
//
var ttyConfirm = function ( question, callback ) {
  var domain = require( 'domain' );
  var d = domain.create();

  return new Promise( function ( resolve, reject ) {

    d.on( 'error', function ( err ) {
      if ( err.code === 'ENXIO' ) {
        // when using a graphical interface like github
        // there is no way we can create a tty stream
        // hence we assume that the user wanted to say yes
        // at least that will operate on the code
        console.error( 'could not open TTY... assuming the user wanted to say yes' );
        callback && callback( 'yes' );
        resolve();
      }
    } );

    d.run( function () {
      var readline = require( 'readline' );

      var tty = fs.createReadStream( '/dev/tty', 'utf8' );

      var r = readline.createInterface( {
        input: tty,
        output: nodeProcess.stdout,
        terminal: false
      } );

      r.question( question + '\n\n' +
          whiteString( '>> continue? ' ) +
          grayString( '(' ) +
          grayString( 'yes' ) +
          grayString( '|' ) +
          whiteString( 'NO' ) +
          grayString( ') : ' ), function ( answer ) {

          var yes = answer.trim() === 'yes';

          callback && callback( null, yes );

          if ( yes ) {
            resolve( answer );
          } else {
            reject();
          }
          tty.close();
        } );
    } );

  } );
};

var log = {
  ok: function () {
    var args = green.apply( null, arguments ).join( '' );
    nConsole.log.call( nConsole, args );
  },
  log: function () {
    var args = gray.apply( null, arguments ).join( '' );
    nConsole.log.call( nConsole, args );
  },
  error: function () {
    var args = red.apply( null, arguments ).join( '' );
    nConsole.error.call( nConsole, args );
  }
};

var exec = function ( cmd ) {
  var spawn = require( 'child_process' ).spawn;
  var args = cmd.split( ' ' );
  var command = args.shift();

  return new Promise( function ( resolve, reject ) {

    var cp = spawn( command, args, { stdio: 'inherit' } );

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
    _exec( cmd, { maxBuffer: Infinity }, function ( err, stdout, stderr ) {
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

var getDirtyState = function () {

  var commands = [
    'git diff HEAD --name-only',
    'git ls-files --other --exclude-standard'
  ];

  var p = commands.reduce( function ( seq, cmd ) {
    return seq.then( function ( prev ) {
      return doExec( cmd ).then( function ( res ) {
        if ( res ) {
          var files = res.split( '\n' );
          if ( files.length > 0 ) {
            prev = prev.concat( files );
          }
        }
        return prev;
      } );
    } );
  }, Promise.resolve( [ ] ) );

  return p.then( function ( dirtyState ) {
    return dirtyState.filter( function ( entry ) {
      return entry !== '';
    } );
  } );
};

var lastStashCMD = 'git rev-parse -q --verify refs/stash';

var getLastStash = function () {
  return new Promise( function ( resolve ) {
    doExec( lastStashCMD ).then( resolve, function () {
      // in case of no stash this command will exit with a code different than 0
      // We just want to make sure we can continue with the flow
      // since this failure case can be treated as just an empty response
      resolve( '' );
    } );
  } );
};

var doWithStashIf = function ( condition ) {
  if ( condition ) {
    log.log( '>> Saving the current dirty state' );
    //return doExec( 'touch __prepush_file___deleteme_if_found.xyz' ).then( function () {
    return doExec( 'git stash -u' ).then( getLastStash );
  //} );
  }
  return Promise.resolve();
};

var checkNoRebaseBranch = function () {
  var getBranch = doExec( 'git branch | grep \'*\' | sed \'s/* //\'' );

  return getBranch.then( function ( branch ) {
    return branch !== '(no branch)';
  } );
};

var restoreStash = function ( condition, dirtyState, stashId ) {
  if ( condition && stashId ) {
    log.log( '>> restoring state... \n    - ', dirtyState.join( '\n    - ' ) );
    return doExec( 'git stash pop' ).then( function () {
      log.log( '>> state restored!' );
    } ).catch( function ( err ) {
      log.error( '>> error trying to restore the stash', err );
    } );
  }
  return Promise.resolve( true );
};

var confirmToProceed = function ( isDirty, onDirtyState, dirtyState ) {
  if ( isDirty && onDirtyState === 'ask' ) {
    return ttyConfirm(
      redString( '\n>> The index is not clean, the following files are not commited:\n\n' ) +
        yellowString( '    - ' + dirtyState.join( '\n    - ' ) ) +
        whiteString( '\n\n>> A stash entry will be created and applied after the check is completed' )
    );
  }
  return Promise.resolve();
};

var main = function ( /*args*/ ) {
  //log.log( args );

  log.log( '>> prepush hook start' );

  var tasks = [ ];
  var onDirtyState;

  if ( Array.isArray( prepushSection ) ) {
    tasks = prepushSection;
    onDirtyState = 'ask';
  } else {
    if ( prepushSection !== null && typeof prepushSection !== 'undefined' ) {
      tasks = prepushSection.tasks;
      onDirtyState = prepushSection.onDirtyState || 'ask';
    }
  }

  if ( tasks.length === 0 ) {
    log.ok( '>> Prepush check skipped. No tasks specified on file', opts.configFile );
    log.log( '\n>> add a section to your .json file like this one:\n------------------------------------\n{\n  "prepush": {\n    "tasks": [\n      "npm run prepush"\n    ],\n    "onDirtyState": "ask" // fail or stash\n  }\n}\n------------------------------------\n>> or this simplified one\n------------------------------------\n{\n  "prepush": ["npm run prepush" ]\n}\n------------------------------------\n* The prepush task should be provided by you. It can be any script\n\nCheck https://github.com/royriojas/prepush#install.' );
    return;
  }

  checkNoRebaseBranch().then( function ( noRebaseBranch ) {
    if ( noRebaseBranch ) {
      getDirtyState().then( function ( dirtyState ) {
        var isDirty = dirtyState.length > 0;
        if ( isDirty ) {
          log.log( '>> files in dirty state \n    - ', dirtyState.join( '\n    - ' ) );
          if ( onDirtyState === 'fail' ) {
            log.error( '>> Prepush check failed. <<\n\n Refusing do the check on a dirty tree. Please stash or commit your changes\n' );
            nodeProcess.exit( 1 );
          }
        }

        confirmToProceed( isDirty, onDirtyState, dirtyState ).then( function () {
          doWithStashIf( isDirty ).then( function ( stashId ) {
            var p = runPrepushTasks( tasks );

            p.then( function () {
              return restoreStash( isDirty, dirtyState, stashId ).then( function () {
                log.ok( '>> Prepush check complete!' );
              } );
            } );

            p.catch( function ( exitCode ) {
              restoreStash( isDirty, dirtyState, stashId ).then( function () {
                if ( exitCode ) {
                  log.error( '>> Prepush check failed. Stopping push' );
                  nodeProcess.exit( exitCode );
                }
              } );
            } );
          } );
        } ).catch( function () {
          log.error( '>> Prepush check Canceled. Stopping push' );
          nodeProcess.exit( 1 );
        } );
      } );
      return;
    }

    log.ok( '>> skip prepush when not in a branch' );
  } );
};

nodeProcess.chdir( opts.gitDirectory );
// git prepush send the ref/sha1 of the local and remote thru stdin
// When there is nothing to push an empty line is received. In that
// case we don't need to to anything
var stdin = nodeProcess.stdin;

stdin.setEncoding( 'utf8' );
stdin.resume();
var applyToBranchFn = function ( branch ) {
  var applyToBranch = prepushSection.applyToBranch;
  if ( !applyToBranch ) {
    return true; // apply to all branches no distinction
  }
  if ( !Array.isArray( applyToBranch ) ) {
    applyToBranch = [ applyToBranch ];
  }
  return applyToBranch.filter( function ( branchName ) {
      branchName = (branchName || '').trim();
      return branchName === branch;
    } ).length > 0;
};

var ignoreBranchFn = function ( branch ) {
  var ignoreBranch = prepushSection.ignoreBranch;
  if ( !ignoreBranch ) {
    return false; // do not ignore the branch if no specified in the precommit section
  }

  if ( !Array.isArray( ignoreBranch ) ) {
    ignoreBranch = [ ignoreBranch ];
  }

  return ignoreBranch.filter( function ( branchName ) {
      branchName = (branchName || '').trim();
      return branchName === branch;
    } ).length > 0;
};

stdin.on( 'data', function reader( data ) {
  if ( !data || data.toString().trim() === '' ) {
    log.log( '>> nothing to verify' );
    return;
  }
  // check if can be applied to the given branch
  doExec( 'git name-rev --name-only HEAD', function ( err, stdout /*, stderr*/ ) {
    if ( err ) {
      console.error( 'prepush error', err.message );
      nodeProcess.exit( 1 );
    }
    stdout = (stdout || '').trim();

    if ( !stdout ) {
      console.error( 'could not determine the name of the branch. Stopping' );
      nodeProcess.exit( 1 );
    }

    if ( ignoreBranchFn( stdout ) ) {
      console.log( 'ignore prepush on branch ', stdout );
      return;
    }

    if ( applyToBranchFn( stdout ) ) {
      console.log( 'applying prepush on branch ', stdout );
      main();
    }
  } );

} );
