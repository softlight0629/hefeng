'use strict';
var fs = require('fs');
var path = require('path');
var product_root = path.join(__dirname, '../products');
var pinyin = require('pinyin');

function parse_product() {
  var categorys = {};
  var files = fs.readdirSync(product_root);

  files.forEach(function(file) {
    var category_key = pinyin(file.replace(/_/, ''), { style: pinyin.STYLE_TO3NE}).join('_')
    var category = categorys[category_key];

    if (!category) {
      category = categorys[category_key] = {};
      category.name = file;
      category.products = {};
    }
    
    var products = fs.readdirSync(path.join(product_root, file));

    products.forEach(function(product) {
      var product_key = pinyin(product.replace(/_/, ''), { style: pinyin.STYLE_TO3NE}).join('_');

      var product_json = JSON.parse(fs.readFileSync(path.join(product_root, file, product), "utf8"));
      var productsname = product.split(/_/);
      product_json.name = product;
      product_json.simplename = productsname[productsname.length - 1];
      product_json.category = category_key;

      category.products[product_key] = product_json;
    });
  });

  return categorys;
}

module.exports = {
  parse: function() {
    return parse_product();
  },
}