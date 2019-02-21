const Model = require('./index.class');

const model = new Model();

class RoleModel {
  constructor() {}

  async getRoles() {
    return await model.selectWithConditions('role', '*', 'id != ?', [1]);
  }

  async getPermissionByRole(rid) {
    return await db.query('select permission.id, permission.module from permission_role left join permission on permission_role.pid = permission.id where permission_role.rid = ?', [rid]);
  }

  async findRoleByName(name) {
    return await model.selectWithConditions('role', '*', 'name = ?', [name]);
  }

  async findRoleByNameZh(nameZh) {
    return await model.selectWithConditions('role', '*', 'nameZh = ?', [nameZh]);
  }

  async addRole(name, nameZh) {
    return await model.insert('role', 'name, nameZh', '(?, ?)', [name, nameZh]);
  }

  async delRole(id) {
    return await model.del('role', 'id = ?', [id]);
  }

  async editRole(id, name, nameZh) {
    return await model.update('role', 'name = ?, nameZh = ?', 'id = ?', [name, nameZh, id]);
  }

  async delPermission4Role(rid) {
    return await model.del('permission_role', 'rid = ?', [rid]);
  }

  async addPermission4Role(format, data) {
    return await model.insert('permission_role', 'rid, pid', format, data);
  }

  async delUser4Role(rid) {
    return await model.del('user_role', 'rid = ?', [rid]);
  }
}

module.exports = RoleModel;