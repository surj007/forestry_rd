const LoginModel = require('../model/loginModel.class');
const util = require('../util/index');
const Respond = require('../api/respond.class');

const loginModel = new LoginModel();
const respond = new Respond();

class LoginService {
  constructor() {}

  async getUserInfoAndAuth(res, username, password) {
    let results = await loginModel.findUserInfo(res, username);
    
    if(!results[0] || results[0].password != util.cryptoBySha256(username + password)) {
      respond.authFailRespond(res);

      return null;
    }

    return results[0];
  }
  
  async getRoleByUserId(res, userId) {
    let results = await loginModel.findRoleByUserId(res, userId);

    return results;
  }
}

module.exports = LoginService;
