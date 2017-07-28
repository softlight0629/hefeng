'use strict';
var recommend_parser = require('./recommend_parser');
var recommend_list = recommend_parser.parse();

module.exports = recommend_list;