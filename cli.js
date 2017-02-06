#!/usr/bin/env node

// node modules
var path = require('path');

// 3rd party modules
var chalk = require('chalk');
var program = require('commander');

// modules
var cli = require('./src/cli');
var version = require('./package.json').version;

// implementation
var patternsValue = [process.cwd()];

program
  .version(version)
  // .option('-X, --XXX', 'xXx')
  .arguments('[patterns...]')
  .action(function(patterns) {
    patternsValue = patterns;
  });

program.parse(process.argv);

cli.run({
  patterns: patternsValue
});
