const CommonModel = require('../model/commonModel.class');
const PowerModel = require('../model/powerModel.class');
const util = require('../util/index');

const powerModel = new PowerModel();
const commonModel = new CommonModel();

class UserService {
  constructor() {}

  async findUserByUserName(username) {
    return await commonModel.findUserInfoByUsername(username);
  }

  async delUser(id) {
    return await powerModel.delUser(id);
  }

  async findAllUserWithRole() {
    let formatResults = {};
    let { err, results } = await powerModel.findAllUserAndRole();
    
    for(let i of results) {
      if(formatResults[i.uid]) {
        formatResults[i.uid].role.push({
          id: i.id,
          name: i.name,
          nameZh: i.nameZh
        });
      }
      else {
        formatResults[i.uid] = {};
        formatResults[i.uid].username = i.username;
        formatResults[i.uid].phone = i.phone;
        formatResults[i.uid].id = i.uid;
        formatResults[i.uid].role = [];
        formatResults[i.uid].role.push({
          id: i.id,
          name: i.name,
          nameZh: i.nameZh
        });
      }
    }

    return {
      err, 
      results: Object.values(formatResults)
    };
  }

  async addUser(username, password) {
    return await powerModel.addUser(username, util.cryptoBySha256(username + password));
  }

  async editUser(id, username, password, phone) {
    return await powerModel.editUser(id, username, util.cryptoBySha256(username + password), phone);
  }
}

module.exports = UserService;