const Model = require('./index.class');

const model = new Model();

class CommonModel {
  constructor() {}

  async findUserInfoByUsername(username) {
    return await model.selectWithConditions('user', '*', 'username = ?', [username]);
  }

  async findRoleByUserId(userId) {
    let query = 'select b.id, name, nameZh from user_role as a left join role as b on a.rid = b.id where a.uid = ?';
    let data = [userId];
  
    return await db.query(query, data);
  }
}

module.exports = CommonModel;