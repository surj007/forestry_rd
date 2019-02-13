const constant = require('../util/constant');

class PermissionDto {
  constructor() {}

  permissionDuplicate() {
    return {
      code: constant.CODE_PERMISSIONDUPLICATE,
      message: `模块名重复`,
      data: null
    }; 
  }
}

module.exports = PermissionDto;