var path = require( 'path' );

module.exports = {
  dirname: __dirname,
  _pathToFile: function () {
    var findGitDir = require( './git-dir' );
    var p = findGitDir();

    return p.then( function ( gitDir ) {
      return path.resolve( gitDir, './.git/hooks/pre-push' );
    } );
  },
  install: function ( cfg ) {

    var fs = require( 'fs' );

    var read = require( 'read-file' ).readFileSync;
    var write = require( 'write' ).sync;

    var process = require( './process' );

    cfg = cfg || {};

    cfg.workingDirectory = path.resolve( process.cwd() );

    var prepushSource = read( path.resolve( this.dirname, '../hook/pre-push.js' ) );

    prepushSource = prepushSource.replace( /require\(\s*'process'\s*\);/g, 'process;' )
      .replace( /require\(\s*'console'\s*\);/g, 'console;' )
      .replace( /require\(\s*'prepush-config'\s*\);/g, JSON.stringify( cfg, null, 2 ) + ';' );

    return this._pathToFile().then( function ( pathToFile ) {
      write( pathToFile, prepushSource );
      fs.chmodSync( pathToFile, '755' );
      return pathToFile;
    } );
  },
  remove: function () {
    return this._pathToFile().then( function ( pathToFile ) {
      var del = require( 'del' );
      del.sync( pathToFile, {
        force: true
      } );

      return pathToFile;
    } );
  }
};
