const crypto = require('crypto');

function cryptoBySha256(data) {
  return crypto.createHash('sha256').update(data).digest('base64').toString()
};

module.exports = {
  cryptoBySha256
};