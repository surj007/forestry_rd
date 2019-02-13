const Model = require('./index.class');

const model = new Model();

class PermissionModel {
  constructor() {}

  async getPermission() {
    return await model.selectWithNoConditions('permission', '*');
  }

  async findPermissionByModule(module) {
    return await model.selectWithConditions('permission', '*', 'module = ?', [module]);
  }

  async addPermission(module) {
    return await model.insert('permission', 'module', '(?)', [module]);
  }
}

module.exports = PermissionModel;