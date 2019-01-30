const crypto = require('crypto');

exports.cryptoBySha256 = (data) => {
  return crypto.createHash('sha256').update(data).digest('base64').toString()
};