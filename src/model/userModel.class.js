const Model = require('./index.class');

const model = new Model();

class UserModel {
  constructor() {}

  async addUser(username, cryptoPassword, phone) {
    return await model.insert('user', 'username, password, phone', '(?, ?, ?)', [username, cryptoPassword, phone]);
  }

  async findAllUserAndRole() {
    return await db.query('select user.id as uid, user.username, user.phone, role.id, role.name, role.nameZh from user left join user_role on user.id = user_role.uid left join role on user_role.rid = role.id;');
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