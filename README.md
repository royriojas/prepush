[![NPM Version](http://img.shields.io/npm/v/esbeautifier.svg?style=flat)](https://npmjs.org/package/esbeautifier)
[![Build Status](http://img.shields.io/travis/royriojas/esbeautifier.svg?style=flat)](https://travis-ci.org/royriojas/esbeautifier)

# esbeautifier
Simple wrapper around esformatter to beautify javascript files overriding the content of the files

## Motivation

`esformatter` only format the output to the stdout. This **tool will overwrite your files**. **Use it under your own risk**. 

## Install

```bash
npm i -g esbeautifier
```

## Usage

```
Usage: esbeautifier [options] glob [glob1] [glob2]..[globN]

Options:
  -h, --help                 Show this help
  -c, --config path::String  path to your esformatter config, if not provided will try to use the
                             `.esformatter` file in your current working directory, if none found will use the
                             one provided with the package
  -v, --version              Outputs the version number
```

## Example

```bash
# this will overwrite your files! this is usually what you want thought
esbeautifier src/**/*.js specs/**/*.js

```