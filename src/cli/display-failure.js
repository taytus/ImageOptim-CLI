// 3rd party modules
var chalk = require('chalk');

// public
module.exports = displayFailure;

// implementation
function displayFailure(err) {
  console.error(
    chalk.red('! Please raise an issue at %s\n\n%s'),
    chalk.underline('https://github.com/JamieMason/ImageOptim-CLI/issues'),
    String(err.stack).replace(/^/gm, '    ')
  );
  process.exit(1); // eslint-disable-line unicorn/no-process-exit
}