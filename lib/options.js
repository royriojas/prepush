'use strict';
var optionator = require( 'optionator' );
module.exports = optionator( {
  prepend: 'Usage: prepush [install|remove] -c [path/to/config/file]',
  concatRepeatedArrays: true,
  mergeRepeatedObjects: true,
  options: [
    {
      heading: 'Options'
    },
    {
      option: 'help',
      alias: 'h',
      type: 'Boolean',
      description: 'Show this help'
    },
    {
      option: 'config',
      alias: 'c',
      type: 'path::String',
      description: 'path to a config JSON file with a prepush field in it. This file is only required in case of install'
    },
    {
      option: 'version',
      alias: 'v',
      type: 'Boolean',
      description: 'Outputs the version number'
    }
  ]
} );
