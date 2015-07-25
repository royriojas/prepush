var path = require( 'path' );

module.exports = {
  pkgJSONPath: path.resolve( __dirname, '../package.json' ),
   configFile: {
     //defaultName: 'package.json',
     //pathToLocalConfig: path.resolve( __dirname, '../configs/prepush.json' ),
     description: 'Path to your `prepush` config, if not provided will try to use the `package.json` file in your current working directory, expecting an entry called `prepush`'
   },
  //useDefaultOptions: true,
  optionator: {
    prepend: 'Yet another `prepush` module that will run tasks defined in a config file or in a package.json file, stashing anything that is not supposed to be pushed before run the scripts to avoid false positives!\n\n========================================================\nUsage: prepush -c [path/to/config/file] [install|remove]\n========================================================',
    options: []
  }
};
