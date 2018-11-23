const { validate } = require('../middlewares/parameter-validator');

/**
 * 验证 获取测试数据 请求的参数
 */
const validateGetDemoDataParams = validate.queryParams({
  name: 'string',
});

/**
 * 获取测试数据
 */
const getDemoData = async (ctx, next) => {
  const { name } = ctx.request.query;

  ctx.rest({
    name,
  });
};

module.exports = {
  validateGetDemoDataParams,
  getDemoData,
};
