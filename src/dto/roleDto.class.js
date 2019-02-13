const constant = require('../util/constant');

class RoleDto {
  constructor() {}

  roleDuplicate() {
    return {
      code: constant.CODE_ROLEDUPLICATE,
      message: `角色名重复`,
      data: null
    }; 
  }
}

module.exports = RoleDto;