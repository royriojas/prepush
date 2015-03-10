[![NPM Version](http://img.shields.io/npm/v/prepush.svg?style=flat)](https://npmjs.org/package/prepush)
[![Build Status](http://img.shields.io/travis/royriojas/prepush.svg?style=flat)](https://travis-ci.org/royriojas/prepush)

# prepush
> Yet another prepush script that will run tasks defined in a config file or in a package.json file

## Motivation

### Where to get the tasks to run 

All the other modules similar to this one were specifying the prepush tasks in the `package.json` file. While this is ok
I needed to have it defined in a separated config file.

### What to do if the command to execute does not exists

We have the requirement that if a developer didn't have the given command, not to fail, but warn the user and let him
proceed without the command.

## Install

```bash
# install it as a dev-dependency. This will also install es6-promise and inquirer
npm i --save-dev prepush

# install the hook, passing the path to the config. If none is provided it will try to use the `package.json`
./node_modules/prepush/bin/prepush.js install -c ./path/to/your/config
```

Using a custom prepush.json 

```javascript
{
  "prepush" : [ "npm test" ]
}
```
or in your package.json file
```javascript
{
  "prepush" : [ "grunt prepush" ]
}
```

## Usage

```
Usage: prepush [install|remove] -c [path/to/config/file]

Options:
  -h, --help                 Show this help
  -c, --config path::String  path to a config JSON file with a prepush field in it. This file
                             is only required in case of install
  -v, --version              Outputs the version number
```

## Example

```bash
# install the hook and use the package.json prepush field 
prepush install 

# install the hook using a custom prepush.json file
prepush install -c ./path/to/prepush.json

# remove the hook
prepush remove
```