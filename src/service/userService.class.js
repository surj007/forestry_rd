const uuid = require('uuid');

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

  async findAllUserWithRole(user, pageNum, pageSize) {
    pageNum = parseInt(pageNum);
    pageSize = parseInt(pageSize);
    let formatResults = {};
    let offset = (pageNum - 1) * pageSize;

    let [ userInfo, countInfo ] = await Promise.all([userModel.findAllUserAndRole(user, pageSize, offset), userModel.getUserCount()]);

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
        if(i.id) {
          formatResults[i.uid].role.push({
            id: i.id,
            name: i.name,
            nameZh: i.nameZh
          });
        }
      }
      else {
        formatResults[i.uid] = {};
        formatResults[i.uid].username = i.username;
        formatResults[i.uid].phone = i.phone;
        formatResults[i.uid].id = i.uid;
        formatResults[i.uid].role = [];
        if(i.id) {
          formatResults[i.uid].role.push({
            id: i.id,
            name: i.name,
            nameZh: i.nameZh
          });
        }
      }
    }

    return {
      err: null,
      results: {
        pager: {
          total: countInfo.results[0]['count(*)'] - 1,
          pageNum,
          pageSize
        },
        result: Object.values(formatResults)
      }
    };
  }

  async addUser(username, password, phone) {
    let salt = uuid.v4();// v4随机生成，有可能重复
    return await userModel.addUser(username, util.cryptoBySha256(salt + password), phone, salt);
  }

  async editUser(id, username, password, phone) {
    let salt = null;
    let cryptoPassword = null;

    if(password != '-@_-@_-@_') {
      salt = uuid.v4();
      cryptoPassword = util.cryptoBySha256(salt + password);
    }

    return await userModel.editUser(id, username, cryptoPassword, phone, salt);
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

  async changePwd(userId, oldPwd, newPwd) {
    let { err, results } = await commonModel.findUserInfoByUserId(userId);

    if(err) {
      return { err, results }
    }

    if(results[0].password != util.cryptoBySha256(results[0].salt + oldPwd)) {
      return {
        err: null,
        results: false
      }
    }
    else {
      let result = await userModel.changePwd(userId, util.cryptoBySha256(results[0].salt + newPwd));

      return {
        err: result.err,
        results: true
      }
    }
  }

  async changeUserInfo(userId, phone) {
    return await userModel.changeUserInfo(userId, phone);
  }
}

module.exports = UserService;
