'use strict';

var news_parser = require('./news_parser');
var news_list = news_parser.parse();

function parse_side_news() {
  var side_news = [];

  for (var news_key in news_list) {
    side_news.push({ id: news_key, name: news_list[news_key].name});
  }

  return side_news;
}

var side_news = parse_side_news();
var news_keys = Object.keys(news_list);

console.log(news_keys);
module.exports = {

  get_news_list: function() {
    return news_list;
  },

  get_side_news: function() {
    return side_news;
  },

  get_news: function(id) {
    return news_list[id];
  },

  get_prev_next_news: function(id) {
    var idx = news_keys.indexOf(id);
    var prev;
    var next;

    if (idx > 0) {
      prev = news_list[news_keys[idx - 1]];
      prev.id = news_keys[idx - 1];
    }

    if (idx < news_keys.length - 1) {
      next = news_list[news_keys[idx + 1]];
      next.id = news_keys[idx + 1];
    }

    return {
      prev,
      next,
    }
  }
}
