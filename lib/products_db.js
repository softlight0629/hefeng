'use strict';

const products = require('./products');

function to() {
  let arr = [];
  for (let key in products) {
    arr = arr.concat(products[key]);
  }

  return arr;
}

module.exports = to();

