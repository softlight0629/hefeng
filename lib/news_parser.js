'use strict';
var fs = require('fs');
var path = require('path');
var news_root = path.join(__dirname, '../news');
var pinyin = require('pinyin');

function parse_news() {
  var news_list = {};
  var files = fs.readdirSync(news_root);

  files.forEach(function(file) {
    var news_key = pinyin(file.replace(/_/, ''), { style: pinyin.STYLE_TO3NE}).join('_');
    var news = news_list[news_key];

    if (!news) {
      news = news_list[news_key] = {};
    }

    var meta = JSON.parse(fs.readFileSync(path.join(news_root, file, "meta.json"), "utf8"));
    var content = fs.readFileSync(path.join(news_root, file, "content.html"), "utf8");

    news.name = file;
    news.date = meta.date;
    news.pv = meta.pv;
    news.content = content;
  });

  return news_list;
}

module.exports = {
  parse: function() {
    return parse_news();
  },
}