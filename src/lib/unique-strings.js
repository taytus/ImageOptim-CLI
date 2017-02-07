const uniqueStrings = strings => Object.keys(
  strings.reduce((index, file) => ({
    ...index,
    [file]: 1
  }), {})
);

module.exports = uniqueStrings;
