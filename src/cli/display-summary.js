// 3rd party modules
var chalk = require('chalk');

// modules
var getTimeBetween = require('../lib/get-time-between');

// public
module.exports = displaySummary;

// implementation
function displaySummary(config) {
  console.info([
    'Finished',
    chalk.grey(getTimeBetween(config.startTime, new Date()))
  ].join(' '));
}
