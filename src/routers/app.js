const Router = require('koa-router');
const jwtKoa = require('koa-jwt');

const config = require('../config');
const demo = require('../controllers/demo');

const router = new Router({
  prefix: '/api', // 路由前缀
});

// 路由访问权限
// Authorization: Bearer <token>
// router.use(
//   jwtKoa({ secret: config.TOKEN_AUTH_SECRET }).unless({
//     // 登录、注册接口不需要认证
//     path: [/^\/api\/login$/, /^\/api\/register$/],
//   })
// );

// demo
router.get('/demo', demo.validateGetDemoDataParams, demo.getDemoData);

module.exports = router;
