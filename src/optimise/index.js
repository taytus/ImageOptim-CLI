// 3rd party modules
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const untildify = require('untildify');

// modules
const resolvePatterns = require('./resolve-patterns');

// public
module.exports = optimise;

// implementation
function optimise(options) {
  const startTime = new Date();

  resolvePatterns(options.patterns)
    .then(allImages =>
      console.log({
        allImages
      })
    );

  return Promise.resolve({
    options,
    startTime
  });
}
