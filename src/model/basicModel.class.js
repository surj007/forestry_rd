const Model = require('./index.class');

const model = new Model();

class BasicModel {
  constructor() {}

  async getBasicInfo(basicName) {
    return await model.selectWithConditions('basic', '*', 'name like ?', [`%${basicName}%`]);
  }

  async delBasic(id) {
    return await model.del('basic', 'id = ?', [id]);
  }

  async addBasic(basicName, basicValue) {
    return await model.insert('basic', 'name, info', '(?, ?)', [basicName, basicValue]);
  }

  async editBasic(id, basicName, basicValue) {
    return await model.update('basic', 'name = ?, info = ?', 'id = ?', [basicName, basicValue, id]);
  }
}

module.exports = BasicModel;