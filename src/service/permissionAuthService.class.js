const PermissionAuthModel = require('../model/permissionAuthModel.class');

const permissionAuthModel = new PermissionAuthModel();

class PermissionAuthService {
  constructor() {}

  async permissionAuth(roles, module) {
    let hasPermissionRoleIds = await permissionAuthModel.getRolesByModule(module);

    // for(let i of roles) {
    //   if() {

    //   }
    // }
  }
}

module.exports = PermissionAuthService;
