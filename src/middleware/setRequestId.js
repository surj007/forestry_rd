const uuid = require('uuid');

exports.setRequestId = async function(req, res, next) {
  res.header('request-id', uuid.v1());// v1基于时间戳生成，不会重复
  next();
};