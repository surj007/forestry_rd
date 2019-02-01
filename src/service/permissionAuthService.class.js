const PermissionAuthModel = require('../model/permissionAuthModel.class');

const permissionAuthModel = new PermissionAuthModel();

class PermissionAuthService {
  constructor() {}

  async permissionAuth(roles, module) {
    let { err, results } = await permissionAuthModel.getRolesByModule(module);

    for(let i of roles) {
      for(let j of results) {
        if(i.id == j.rid) {
          return true;
        }
      }
    }

    return false;
  }
}

module.exports = PermissionAuthService;
