const loginModel =  require('../model/loginModel');
const util = require('../util/index');
const respond = require('../api/respond');

function getUserInfoAndAuth(res, username, password, callback) {
  loginModel.findUserInfo(res, username, (results) => {
    if(!results[0] || results[0].password != util.cryptoBySha256(username + password)) {
      respond.authFailRespond(res);
    }
    else {
      callback && callback(results[0]);
    }
  });
};

function getRoleByUserId(res, userId, callback) {
  loginModel.findRoleByUserId(res, userId, (results) => {
    callback && callback(results);
  });
}

module.exports = {
  getUserInfoAndAuth,
  getRoleByUserId
};
