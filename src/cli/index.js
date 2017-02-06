// modules
var displayFailure = require('./display-failure');
var displaySummary = require('./display-summary');
var optimise = require('../optimise');

// public
module.exports = {
  run: runCli
};

// implementation
function runCli(options) {
  return optimise(options)
    .then(displaySummary, onFail)
    .catch(onFail);
}

function onFail(err) {
  displayFailure(err);
}
