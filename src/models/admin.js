const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types } = Schema;

const AdminSchema = new Schema({
    account: Types.String, // 账号
    password: Types.String, // 密码(加密处理过的)
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
