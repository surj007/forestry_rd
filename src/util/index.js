const crypto = require('crypto');

exports.cryptoBySha256 = (data) => {
  return crypto.createHash('sha256').update(data).digest('base64').toString()
};

exports.isParamNull = (req, type, fields) => {
  for(let i of fields) {
    if(req[type][i] == undefined) {
      return i;
    }
  }

  return false;
}