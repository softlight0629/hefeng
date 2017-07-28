'use strict';

var router = require('koa-router')();
var news_db = require('../lib/news_db');
var products = require('../lib/products');
var pagination = require('../lib/pagination');
var products_db = require('../lib/products_db');
var recommends = require('../lib/recommends');
var video_db = require('../lib/video_db');
var messages_db = require('../lib/messages_db');

var side_categorys = products_db.get_side_categorys();
var side_news = news_db.get_side_news();
var all_products = products_db.get_all_products();

function get_random_recommend() {
  var a = [];
  for (var  i = 0; i < recommends.length; i++) {
    a[i] = i;
  }

  a.sort(function() {
    return 0.5 - Math.random();
  });

  var recommends_list = [];
  for (var i = 0; i < 4; i++) {
    recommends_list[i] = recommends[a[i]];
  }

  return recommends_list;
}

router.get('/', function *(next) {
  const news_list = side_news.slice(0, 9);

  yield this.render('index', {
    news_list,
    recommends,
    side_categorys,
  });
});


router.get('/:path', function *(next) {
  const news_list = side_news.slice(0, 9);

  yield this.render(this.params.path, {
    news_list,
    side_categorys,
  });
});


router.get('/products', function *(next) {
  const news_list = side_news.slice(0, 9);
  const num = this.request.query.pageNum || 1;
  const pageNum = parseInt(num);
  const paginator = pagination(all_products, pageNum, 12);
  const recommends_list = get_random_recommend();

  yield this.render('products', {
    news_list, 
    paginator,
    side_categorys,
    recommends_list,
  });
});


router.get('/news', function *(next) {
  const num = this.request.query.pageNum || 1;
  const pageNum = parseInt(num);
  const paginator = pagination(side_news, pageNum, 15);
  const recommends_list = get_random_recommend();

  yield this.render('news', {
    paginator,
    side_categorys,
    recommends_list,
  });
});

router.get('/products/:cid', function* () {
  const news_list = side_news.slice(0, 9);
  const num = this.request.query.pageNum || 1;
  const pageNum = parseInt(num);
  const products = products_db.get_category_products(this.params.cid)
  const recommends_list = get_random_recommend();

  const paginator = pagination(products, pageNum, 12);

  yield this.render('products', {
    cid: this.params.cid,
    paginator,
    news_list,
    side_categorys,
    recommends_list,
  });
});


router.get('/products/:cid/:id', function* () {
  const news_list = side_news.slice(0, 9);
  const category = products_db.get_category(this.params.cid)
  const product = category.products[this.params.id];
  const prevnext = products_db.get_prev_next_products(this.params.id);

  yield this.render('product_show', {
    product, 
    news_list,
    side_categorys,
    prev: prevnext.prev,
    next: prevnext.next,
  });
});

router.get('/news/:id', function* () {
  const news_list = side_news.slice(0, 9);
  const news = news_db.get_news(this.params.id);
  const prevnext = news_db.get_prev_next_news(this.params.id);
  const recommends_list = get_random_recommend();

  yield this.render('news_show', {
    news_list, 
    news,
    side_categorys,
    prev: prevnext.prev,
    next: prevnext.next,
    recommends_list,
  });
});


router.get('/videos/:id', function* () {
  const news_list = side_news.slice(0, 9);
  const v = video_db[parseInt(this.params.id) - 1];

  yield this.render('video_show', {
    news_list, 
    v,
    side_categorys,
  });
});

router.post('/messages', function* () {
  messages_db.push(this.request.body);
  this.body = 'ok';
});

router.get('/messages', function* () {
  this.body = messages_db.list();
});

module.exports = router;
