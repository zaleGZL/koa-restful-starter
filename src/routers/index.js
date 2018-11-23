const Router = require('koa-router');
const config = require('../config');
const { restify, tokenException } = require('../middlewares/restify');
const appApiRouter = require('./app');

const router = new Router();

// 返回 Restful API 风格的响应
router.use(restify(config.API_PATH_REG_EXP));

// token 异常/错误 处理
// router.use(tokenException());

// 引入所有 API 路由
router.use(appApiRouter.routes()).use(appApiRouter.allowedMethods());

module.exports = router;
