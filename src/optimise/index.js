// public
module.exports = optimise;

// implementation
function optimise(options) {
  console.log(options);
  return Promise.resolve({
    options: options,
    startTime: new Date()
  });
}
