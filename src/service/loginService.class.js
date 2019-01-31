const LoginModel = require('../model/loginModel.class');
const util = require('../util/index');

const loginModel = new LoginModel();

class LoginService {
  constructor() {}

  async getUserInfoAndAuth(username, password) {
    let { err, results } = await loginModel.findUserInfo(username);
    
    if(err) {
      return { 
        err, 
        result: [] 
      }
    }
    else if(!results[0] || results[0].password != util.cryptoBySha256(username + password)) {
      return {
        err: null,
        result: null
      };
    }

    return {
      err: null,
      result: results[0]
    };
  }
  
  async getRoleByUserId(userId) {
    return await loginModel.findRoleByUserId(userId);
  }
}

module.exports = LoginService;
