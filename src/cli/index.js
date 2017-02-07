// modules
const displayFailure = require('./display-failure');
const displaySummary = require('./display-summary');
const optimise = require('../optimise');

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
