// Example using third party modules
const lodash = require("lodash");

const combineArrayWitthASymbol = (items, symbol = "-") => {
  return lodash.join(items, symbol);
};

const add = (a, b) => {
  return a + b;
};

const substract = (a, b) => {
  return a - b;
};

const demoAsync = async () => {
  return Promise.resolve("Ok");
};

module.exports = {
  add,
  substract,
  demoAsync,
  combineArrayWitthASymbol,
};
