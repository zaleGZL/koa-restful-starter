const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const config = require('./config');
const router = require('./routers');

// mongodb 数据库连接
const db = mongoose.connection;
db.on('error', () => {
  console.log(`${config.APP_NAME} mongodb connection error:`);
});
db.once('open', () => {
  console.log(`${config.APP_NAME} mongodb connection success:`);
});
mongoose.connect(
  config.DATABASE_ADDRESS,
  { useNewUrlParser: true }
);

// 创建 Koa 框架实例
const app = new Koa();

// 配置应用的信息
app.data = {};

// 静态文件
app.use(
  serve(path.resolve(__dirname, '/public'), {
    maxage: config.STATIC_FILE_CACHE_MAX_AGE,
  })
);

// 返回JSON结构的数据
app.use(
  json({
    pretty: false,
  })
);

// 解析请求主体
app.use(bodyParser());

// 路由
app.use(router.routes()).use(router.allowedMethods());

// 处理未找到的路径
app.use(async ctx => {
  ctx.status = 404;
  ctx.body = '404';
});

// 内部错误处理
app.on('error', (error, ctx) => {
  console.log('server error', error, ctx);
});

app.listen(config.PORT, () => {
  console.log(`${config.APP_NAME} listening on port ${config.PORT}`);
});
