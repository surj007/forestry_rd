const CommonModel = require('../model/commonModel.class');
const PowerModel = require('../model/powerModel.class');
const util = require('../util/index');

const powerModel = new PowerModel();
const commonModel = new CommonModel();

class PowerService {
  constructor() {}

  async findUserByUserName(username) {
    return await commonModel.findUserInfoByUsername(username);
  }

  async delUser(id) {
    return await powerModel.delUser(id);
  }

  async findAllUserWithRole() {
    let formatResultsObj = {};
    let formatResultsAry = [];
    let { err, results } = await powerModel.findAllUserAndRole();
    
    for(let i of results) {
      if(formatResultsObj[i.uid]) {
        formatResultsObj[i.uid].role.push({
          id: i.id,
          name: i.name,
          nameZh: i.nameZh
        });
      }
      else {
        formatResultsObj[i.uid] = {};
        formatResultsObj[i.uid].username = i.username;
        formatResultsObj[i.uid].phone = i.phone;
        formatResultsObj[i.uid].id = i.uid;
        formatResultsObj[i.uid].role = [];
        formatResultsObj[i.uid].role.push({
          id: i.id,
          name: i.name,
          nameZh: i.nameZh
        });
      }
    }

    for(let i in formatResultsObj) {
      formatResultsAry.push(formatResultsObj[i]);
    }

    return {
      err, 
      results: formatResultsAry
    };
  }

  async addUser(username, password) {
    return await powerModel.addUser(username, util.cryptoBySha256(username + password));
  }

  async editUser(id, username, password, phone) {
    return await powerModel.editUser(id, username, util.cryptoBySha256(username + password), phone);
  }
}

module.exports = PowerService;