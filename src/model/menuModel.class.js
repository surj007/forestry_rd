const Model = require('./index.class');

const model = new Model();

class MenuModel {
  constructor() {}

  async getMenu(conditions, data) {
    return await db.query(`select permission.module from permission_role left join permission on permission_role.pid = permission.id where ${conditions}`, data);
  }
}

module.exports = MenuModel;