const CommonModel = require('../model/commonModel.class');
const UserModel = require('../model/userModel.class');
const util = require('../util/index');

const userModel = new UserModel();
const commonModel = new CommonModel();

class UserService {
  constructor() {}

  async findUserByUserName(username) {
    return await commonModel.findUserInfoByUsername(username);
  }

  async delUser(id) {
    return await userModel.delUser(id);
  }

  async findAllUserWithRole(pageNum, pageSize) {
    pageNum = parseInt(pageNum);
    pageSize = parseInt(pageSize);
    let formatResults = {};
    let offset = (pageNum - 1) * pageSize;

    let [ userInfo, countInfo ] = await Promise.all([userModel.findAllUserAndRole(pageSize, offset), userModel.getUserCount()]);

    if(userInfo.err) {
      return {
        err: userInfo.err,
        results: []
      };
    }
    else if(countInfo.err) {
      return {
        err: countInfo.err,
        results: []
      };
    }
    
    for(let i of userInfo.results) {
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
      err: null,
      results: {
        pager: {
          total: countInfo.results[0]['count(*)'],
          pageNum,
          pageSize
        },
        result: Object.values(formatResults)
      }
    };
  }

  async addUser(username, password) {
    return await userModel.addUser(username, util.cryptoBySha256(username + password));
  }

  async editUser(id, username, password, phone) {
    return await userModel.editUser(id, username, util.cryptoBySha256(username + password), phone);
  }

  async delRole4User(uid) {
    return await userModel.delRole4User(uid);
  }

  async addRole4User(uid, rid) {
    let format = '';
    let data = [];

    for(let i in rid) {
      if(i != 0) {
        format += ', ';
      }
      format += '(?, ?)';
      data.push(uid);
      data.push(rid[i]);
    }
    return await userModel.addRole4User(format, data);
  }
}

module.exports = UserService;
