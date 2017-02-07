// 3rd party modules
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const untildify = require('untildify');

// public
module.exports = resolvePatterns;

// implementation
function resolvePatterns(patterns) {
  const paths = patterns
    .map(untildify)
    .reduce(collectPaths, []);
  const files = paths.filter(isFile);
  const directories = paths.filter(isDirectory);
  const filesInDirectories = directories
    .map(getPatternFromDirectory)
    .reduce(collectPaths, []);
  const allFiles = dedupe(files.concat(filesInDirectories));
  const allImages = allFiles.filter(isImage);
  return Promise.resolve(allImages);
}

const getPatternFromDirectory = directory => path.join(directory, '**/*.+(gif|jpeg|jpg|png)');
const isDirectory = location => fs.statSync(location).isDirectory();
const isFile = location => fs.statSync(location).isFile();
const isImage = location => location.search(/\.(gif|jpeg|jpg|png)$/i) !== -1;
const collectPaths = (array, pattern) => array.concat(
  glob.sync(pattern, {
    absolute: true
  })
);
const dedupe = array => Object.keys(
  array.reduce((index, file) => {
    index[file] = 1;
    return index;
  }, {})
);
