'use strict';

var product_parser = require('./product_parser');
var categorys = product_parser.parse();

function parse_side_categorys() {
  var side_categorys = [];

  for (var category_key in categorys) {
    side_categorys.push({ id: category_key, name: categorys[category_key].name});
  }

  return side_categorys;
};

function get_all_products() {
  const products = [];

  for (var category_key in categorys) {
    for (var id in  categorys[category_key].products) {
      products.push({
        id,
        name: categorys[category_key].products[id].name,
        simplename: categorys[category_key].products[id].simplename,
        pic: categorys[category_key].products[id].pic,
        category: categorys[category_key].products[id].category,
      });
    }
  }

  return products;
}

var side_categorys = parse_side_categorys();
var all_products = get_all_products();

var product_keys = all_products.map(function(product) {
  return product.id;
});
module.exports = {

  get_categorys: function() {
    return categorys;
  },

  get_category: function(cid) {
    return categorys[cid];
  },

  get_side_categorys: function() {
    return side_categorys;
  },

  get_category_products: function(category_key) {
    const products = [];

    for (var id in  categorys[category_key].products) {
      products.push({
        id,
        name: categorys[category_key].products[id].name,
        pic: categorys[category_key].products[id].pic,
        simplename: categorys[category_key].products[id].simplename,
        category: categorys[category_key].products[id].category,
      });
    }
    return products;
  },

  get_all_products: function() {
    return all_products;
  },

  get_prev_next_products: function(id) {
    var idx = product_keys.indexOf(id);
    var prev;
    var next;

    if (idx > 0) {
      prev = all_products[idx - 1];
    }

    if (idx < product_keys.length - 1) {
      next = all_products[idx + 1];
    }

    return {
      prev,
      next,
    }
  }
};

