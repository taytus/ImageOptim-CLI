#!/usr/bin/env node

require('babel-register');

// node modules
const path = require('path');

// 3rd party modules
const chalk = require('chalk');
const program = require('commander');

// modules
const cli = require('./src/cli');
const version = require('./package.json').version;

// implementation
let patternsValue = [process.cwd()];

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
