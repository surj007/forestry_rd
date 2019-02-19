const Model = require('./index.class');

const model = new Model();

class UserModel {
  constructor() {}

  async getUserCount() {
    return await model.getCount('user');
  }

  async addUser(username, cryptoPassword, phone) {
    return await model.insert('user', 'username, password, phone', '(?, ?, ?)', [username, cryptoPassword, phone]);
  }

  async findAllUserAndRole(limit, offset) {
    return await db.query('select u.id as uid, u.username, u.phone, role.id, role.name, role.nameZh from (select * from user limit ? offset ?) as u left join user_role on u.id = user_role.uid left join role on user_role.rid = role.id', [limit, offset]);
  }

  async delUser(id) {
    return await model.del('user', 'id = ?', [id]);
  }

  async editUser(id, username, password, phone) {
    return await model.update('user', 'username = ?, password = ?, phone = ?', 'id = ?', [username, password, phone, id]);
  }

  async delRole4User(uid) {
    return await model.del('user_role', 'uid = ?', [uid]);
  }

  async addRole4User(format, data) {
    return await model.insert('user_role', 'uid, rid', format, data);
  }
}

module.exports = UserModel;
