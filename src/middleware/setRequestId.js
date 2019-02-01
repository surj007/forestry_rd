const uuid = require('uuid');

exports.setRequestId = async function(req, res, next) {
  res.header('request-id', uuid.v1());
  next();
};