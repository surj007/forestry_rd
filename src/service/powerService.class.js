const CommonModel = require('../model/commonModel.class');
const PowerModel = require('../model/powerModel.class');
const util = require('../util/index');

const powerModel = new PowerModel();
const commonModel = new CommonModel();

class PowerService {
  constructor() {}

  async findUser(username) {
    return await commonModel.findUserInfo(username);
  }

  async delUser(id) {
    return await powerModel.delUser(id);
  }

  async findAllUserAndRole() {
    let userResult = await powerModel.findAllUser();

    if(userResult.err) {
      return userResult;
    }

    for(let i of userResult.results) {
      let roleResult = await commonModel.findRoleByUserId(i.id);

      if(roleResult.err) {
        return roleResult;
      }

      i.role = roleResult.results;
    }

    return userResult;
  }

  async addUser(username, password) {
    return await powerModel.addUser(username, util.cryptoBySha256(username + password));
  }

  async editUser(id, username, password, phone) {
    return await powerModel.editUser(id, username, util.cryptoBySha256(username + password), phone);
  }
}

module.exports = PowerService;