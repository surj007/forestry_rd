const CommonModel = require('../model/commonModel.class');
const util = require('../util/index');
const constant = require('../util/constant');

const commonModel = new CommonModel();

class LoginService {
  constructor() {}

  async getUserInfoAndAuth(username, password) {
    let { err, results } = await commonModel.findUserInfoByUsername(username);
    
    if(err) {
      return { 
        err, 
        result: [] 
      }
    }
    else if(!results[0] || results[0].password != util.cryptoBySha256(results[0].salt + password)) {
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
    return await commonModel.findRoleByUserId(userId);
  }
}

module.exports = LoginService;
