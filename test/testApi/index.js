const authApi = require('./authApi.js');
const basicApi = require('./basicApi.js');

module.exports = {
  ...authApi,
  ...basicApi
}