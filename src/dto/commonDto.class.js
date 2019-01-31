const constant = require('../util/constant');

class CommonDto {
  constructor() {}

  dbRespond(err, results) {
    if(err) {
      return {
        code: constant.CODE_DBERR,
        message: 'db err',
        data: err
      };
    }
    else {
      return {
        code: constant.CODE_SUCCESS,
        message: 'db ok',
        data: results
      };
    }
  }

  isNullRespond(param) {
    return {
      code: constant.CODE_NULLERR,
      message: `${param}不能为空`,
      data: null
    }; 
  }

  serverErrRespond(err) {
    return {
      code: constant.CODE_SERVERERR,
      message: err.message,
      data: error.stack
    }; 
  }
}

module.exports = CommonDto;
