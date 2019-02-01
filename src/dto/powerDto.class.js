const constant = require('../util/constant');

class PowerDto {
  constructor() {}

  usernameDuplicate() {
    return {
      code: constant.CODE_NAMEDUPLICATE,
      message: `用户名重复，请重新输入`,
      data: null
    }; 
  }
}

module.exports = PowerDto;