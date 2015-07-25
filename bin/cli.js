#!/usr/bin/env node

var main = require( '../src/main' );
var programOptions = require( '../src/options' );

var cliLauncher = require( 'clix' );

//cliLauncher.onError = function () {
//  // handle the error here
//};

cliLauncher.launch( programOptions, function ( program ) {
  main.run( program );
} );
