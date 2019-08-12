const axios = require('axios');

function getBasicInfo (cookie) {
  return axios.get('http://127.0.0.1/system/basic/getBasicInfo?basicName=%E4%BC%81%E4%B8%9A%E7%B1%BB%E5%9E%8B', {
    headers: {
      cookie
    }
  });
}

module.exports = {
  getBasicInfo
}