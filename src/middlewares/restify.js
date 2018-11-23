/**
 * 返回Restful API 的响应，自带异常处理
 * @param {RegExp} prefixReg 匹配 API URL 的正则表达式
 */
const restify = prefixReg => {
  prefixReg = prefixReg || new RegExp('^/api/');
  return async (ctx, next) => {
    if (prefixReg.test(ctx.request.path)) {
      /**
       * 返回 RestFul API 规范的数据
       *
       * @param {Object} data 响应的数据
       * @param {Object} options 额外数据
       * @param {Number} options.statusCode 响应的 HTTP 状态码
       * @param {String} options.status 响应内容的 status
       */
      ctx.rest = (data = {}, options = {}) => {
        ctx.status = options.statusCode || 200;
        ctx.body = {
          status: options.status || 'success',
          ...data,
        };
      };

      try {
        await next();
      } catch (error) {
        console.error(error);

        ctx.status = 500;
        ctx.body = {
          status: 'error',
          message: '服务端出错',
          error: error.message,
        };
      }
    } else {
      await next();
    }
  };
};

/**
 * token 异常/错误 处理
 */
const tokenException = () => {
  return async (ctx, next) => {
    return next().catch(err => {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = {
          status: 'error',
          message: err.originalError ? err.originalError.message : err.message,
        };
      } else {
        throw err;
      }
    });
  };
};

module.exports = {
  restify,
  tokenException,
};
