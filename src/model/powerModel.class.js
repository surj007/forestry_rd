const Model = require('./index.class');

const model = new Model();

class PowerModel {
  constructor() {}

  async addUser(username, cryptoPassword, phone) {
    return await model.insert('user', 'username, password, phone', '?, ?, ?', [username, cryptoPassword, phone]);
  }

  async findAllUser() {
    return await model.selectWithNoConditions('user', 'id, username, phone');
  }

  async delUser(id) {
    return await model.del('user', 'id = ?', [id]);
  }

  async editUser(id, username, password, phone) {
    return await model.update('user', 'username = ?, password = ?, phone = ?', 'id = ?', [username, password, phone, id]);
  }
}

module.exports = PowerModel;