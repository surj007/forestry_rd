const LoginModel = require('../model/loginModel.class');
const util = require('../util/index');
const Respond = require('../api/respond.class');

const loginModel = new LoginModel();
const respond = new Respond();

class LoginService {
  constructor() {}

  getUserInfoAndAuth(res, username, password, callback) {
    loginModel.findUserInfo(res, username, (results) => {
      if(!results[0] || results[0].password != util.cryptoBySha256(username + password)) {
        respond.authFailRespond(res);
      }
      else {
        callback && callback(results[0]);
      }
    });
  }
  
  getRoleByUserId(res, userId, callback) {
    loginModel.findRoleByUserId(res, userId, (results) => {
      callback && callback(results);
    });
  }
}

module.exports = LoginService;
