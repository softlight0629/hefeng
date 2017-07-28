'use strict';
var fs = require('fs');
var path = require('path');
var recommend_root = path.join(__dirname, '../recommends');
var products_db = require('./products_db');
var pinyin = require('pinyin');

function parse_recommend() {
  var recommend_list = [];
  var files = fs.readdirSync(recommend_root);

  files.forEach(function(file) {
    var category_key = pinyin(file.replace(/_/, ''), { style: pinyin.STYLE_TO3NE}).join('_');

    var category = products_db.get_category(category_key);

    var products = fs.readdirSync(path.join(recommend_root, file));

    products.forEach(function(product) {
      var product_key = pinyin(product.replace(/_/, ''), { style: pinyin.STYLE_TO3NE}).join('_');
     
      var product_json = Object.assign({}, category.products[product_key]);
      product_json.id = product_key;
      recommend_list.push(product_json);
    });
  });

  return recommend_list;
}

module.exports = {
  parse: function() {
    return parse_recommend();
  },
}