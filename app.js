var app = require('koa')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-view')
  , onerror = require('koa-onerror');

var router = require('./routes/index');

// global middlewares
app.use(views(__dirname + '/views', {
  noCache: true,
}));
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));


app
  .use(router.routes())
  .use(router.allowedMethods())

app.on('error', function(err, ctx){
  logger.error('server error', err, ctx);
});

module.exports = app;
