var path = require( 'path' );

module.exports = {
  dirname: __dirname,
  _pathToFile: function () {
    var findGitDir = require( 'git-toplevel' );
    var p = findGitDir();

    return p.then( function ( gitDir ) {
      return {
        hookFile: path.resolve( gitDir, './.git/hooks/pre-push' ),
        gitDir: gitDir
      };
    } );
  },
  install: function ( cfg ) {

    var fs = require( 'fs' );

    var read = require( 'read-file' ).readFileSync;
    var write = require( 'write' ).sync;

    var process = require( './process' );

    cfg = cfg || { };

    cfg.workingDirectory = path.resolve( process.cwd() );

    var prepushSource = read( path.resolve( this.dirname, '../hook/pre-push.js' ) );

    prepushSource = prepushSource.replace( /require\(\s*'process'\s*\);/g, 'process;' )
      .replace( /require\(\s*'console'\s*\);/g, 'console;' )
      .replace( /require\(\s*'\.\/Promise'\s*\);/g, 'global.Promise;' );


    return this._pathToFile().then( function ( args ) {
      var pathToFile = args.hookFile;
      cfg.gitDirectory = args.gitDir;

      prepushSource = prepushSource.replace( /require\(\s*'prepush-config'\s*\);/g, JSON.stringify( cfg, null, 2 ) + ';' );
      write( pathToFile, prepushSource );
      fs.chmodSync( pathToFile, '755' );
      return pathToFile;
    } );
  },
  remove: function () {
    return this._pathToFile().then( function ( args ) {
      var pathToFile = args.hookFile;
      var del = require( 'del' );
      del.sync( pathToFile, { force: true } );

      return pathToFile;
    } );
  }
};
