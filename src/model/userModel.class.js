const Model = require('./index.class');

const model = new Model();

class UserModel {
  constructor() {}

  async getUserCount() {
    return await model.getCount('user');
  }

  async addUser(username, cryptoPassword, phone, salt) {
    return await model.insert('user', 'username, password, phone, salt', '(?, ?, ?, ?)', [username, cryptoPassword, phone, salt]);
  }

  async findAllUserAndRole(user, limit, offset) {
    return await db.query('select u.id as uid, u.username, u.phone, role.id, role.name, role.nameZh from (select * from user where username like ? and username != ? limit ? offset ?) as u left join user_role on u.id = user_role.uid left join role on user_role.rid = role.id', ['%' + user + '%', 'srj', limit, offset]);
  }

  async delUser(id) {
    return await model.del('user', 'id = ?', [id]);
  }

  async editUser(id, username, cryptoPassword, phone, salt) {
    let format = 'username = ?, password = ?, phone = ?, salt = ?';
    let data = [username, cryptoPassword, phone, salt, id];

    if(!cryptoPassword) {
      format = 'username = ?, phone = ?';
      data = [username, phone, id];
    }

    return await model.update('user', format, 'id = ?', data);
  }

  async delRole4User(uid) {
    return await model.del('user_role', 'uid = ?', [uid]);
  }

  async addRole4User(format, data) {
    return await model.insert('user_role', 'uid, rid', format, data);
  }

  async changePwd(userId, cryptoPassword) {
    return await model.update('user', 'password = ?', 'id = ?', [cryptoPassword, userId]);
  }

  async changeUserInfo(userId, phone) {
    return await model.update('user', 'phone = ?', 'id = ?', [phone, userId]);
  }
}

module.exports = UserModel;
