module.exports = {
  APP_NAME: 'koa-restful-starter', // 应用名称
  DATABASE_ADDRESS: 'mongodb://localhost:27017/test', // 数据库地址
  PORT: 4000, // 应用部署的端口号
  API_PATH_REG_EXP: new RegExp('^/api/'), // API 路径正则匹配
  PASSWORD_SALT: 'the_salt', // 密码加盐
  STATIC_FILE_CACHE_MAX_AGE: 7 * 24 * 60 * 60 * 1000, // 静态文件缓存时长
  TOKEN_AUTH_SECRET: 'the_secret', // TOKNE 密钥
};
