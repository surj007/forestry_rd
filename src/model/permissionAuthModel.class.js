class PermissionAuthModel {
  constructor() {}

  async getRolesByModule(module) {
    let query = 'select rid from permission as a left join permission_role as b on a.id = b.pid where a.module = ?';
    let data = [module];
  
    return await db.query(query, data);
  }
}

module.exports = PermissionAuthModel;