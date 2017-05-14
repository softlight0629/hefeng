'use strict';

var router = require('koa-router')();
var news_db = require('../lib/news_db');
var products = require('../lib/products');
var pagination = require('../lib/pagination');
var products_db = require('../lib/products_db');
var recommends = require('../lib/recommends');
var video_db = require('../lib/video_db');
var messages_db = require('../lib/messages_db');

router.get('/', function *(next) {
  const news_list = news_db.slice(0, 9);

  yield this.render('index', {
    news_list,
    recommends,
  });
});


router.get('/:path', function *(next) {
  const news_list = news_db.slice(0, 9);

  yield this.render(this.params.path, {
    news_list, 
  });
});


router.get('/products', function *(next) {
  const news_list = news_db.slice(0, 9);
  const num = this.request.query.pageNum || 1;
  const pageNum = parseInt(num);
  const paginator = pagination(products_db, pageNum, 12);

  yield this.render('products', {
    news_list, 
    paginator,
  });
});


router.get('/news', function *(next) {
  const num = this.request.query.pageNum || 1;
  const pageNum = parseInt(num);
  const paginator = pagination(news_db, pageNum, 15);

  yield this.render('news', {
    paginator,
  });
});

router.get('/products/:cid', function* () {
  const news_list = news_db.slice(0, 9);
  const num = this.request.query.pageNum || 1;
  const pageNum = parseInt(num);

  const paginator = pagination(products[this.params.cid], pageNum, 12);

  yield this.render('products', {
    cid: this.params.cid,
    paginator,
    news_list,
  });
});


router.get('/products/:cid/:id', function* () {
  const product_list = products[this.params.cid];
  const news_list = news_db.slice(0, 9);

  let product;

  for (const pd of product_list) {
    if (pd.id == parseInt(this.params.id)) {
      product = pd; 
    }
  }

  yield this.render('product_show', {
    product, 
    news_list,
  });
});

router.get('/news/:id', function* () {
  const news_list = news_db.slice(0, 9);
  console.log('asdasd');
  const news = news_db[parseInt(this.params.id) - 1];
  console.log(news);

  yield this.render('news_show', {
    news_list, 
    news,
  });
});


router.get('/videos/:id', function* () {
  const news_list = news_db.slice(0, 9);
  const v = video_db[parseInt(this.params.id) - 1];

  yield this.render('video_show', {
    news_list, 
    v,
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
