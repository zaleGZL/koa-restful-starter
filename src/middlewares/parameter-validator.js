const Parameter = require('parameter');
const mongoose = require('mongoose');

/**
 * @param {Object} rule 验证规则
 * @param {*} value 输入的值
 */
const checkObjectId = (rule, value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return 'Not a valid bson ObjectID';
    }
    return null;
};

Parameter.addRule('objectId', checkObjectId);

/**
 * 数据验证 (详情查看 https://github.com/node-modules/parameter)
 * @param {Object} ctx
 * @param {Function} next
 * @param {Object} parameter Parameter 的实例
 * @param {Object} rule 验证规则
 * @param {Object} params 带验证的参数对象
 */
const validateParams = async (ctx, next, parameter, rule, params = {}) => {
    const error = parameter.validate(rule, params);
    if (error) {
        ctx.status = 400;
        ctx.body = {
            error,
            status: 'fail',
            message: '参数错误',
        };
    } else {
        await next();
    }
};

/**
 * 验证URL查询参数
 * @param {Object} rule 验证规则
 * @param {Object} options Parameter 实例的构造参数
 */
const validateUrlParams = (rule = {}, options = {}) => {
    const parameter = new Parameter(options);
    return async (ctx, next) => {
        await validateParams(ctx, next, parameter, rule, ctx.params);
    };
};

/**
 * 验证查询参数
 * @param {Object} rule 验证规则
 * @param {Object} options Parameter 实例的构造参数
 */
const validateQueryParams = (rule = {}, options = {}) => {
    const parameter = new Parameter(options);
    return async (ctx, next) => {
        await validateParams(ctx, next, parameter, rule, ctx.request.query);
    };
};

/**
 * 验证 body 参数
 * @param {Object} rule 验证规则
 * @param {Object} options Parameter 实例的构造参数
 */
const validateBodyParams = (rule = {}, options = {}) => {
    const parameter = new Parameter(options);
    return async (ctx, next) => {
        await validateParams(ctx, next, parameter, rule, ctx.request.body);
    };
};


module.exports = {
    validate: {
        urlParams: validateUrlParams,
        queryParams: validateQueryParams,
        bodyParams: validateBodyParams,
    },
};
