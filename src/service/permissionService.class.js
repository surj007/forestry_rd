const PermissionModel = require('../model/permissionModel.class');

const permissionModel = new PermissionModel();

class PermissionService {
  constructor() {}

  async getPermission() {
    return await permissionModel.getPermission();
  }

  async findPermissionByModule(module) {
    return await permissionModel.findPermissionByModule(module);
  }

  async addPermission(module) {
    return await permissionModel.addPermission(module);
  }
}

module.exports = PermissionService;