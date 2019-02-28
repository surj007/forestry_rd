const constant = require('../util/constant');

class CommonDto {
  constructor() {}

  dbRespond(err, results, msg = 'db ok') {
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
        message: msg,
        data: results
      };
    }
  }

  okRespond(results, msg = 'ok') {
    return {
      code: constant.CODE_SUCCESS,
      message: msg,
      data: results
    };
  }

  errorRespond(code, message, data) {
    return {
      code,
      message,
      data
    };
  }

  isNullRespond(param) {
    return {
      code: constant.CODE_NULLERR,
      message: `${param}不能为空`,
      data: null
    };
  }

  duplicateKeyRespond(key) {
    return {
      code: constant.CODE_DUPLICATE,
      message: `${key}重复，请重新输入`,
      data: null
    }; 
  }

  serverErrRespond(err) {
    return {
      code: constant.CODE_SERVERERR,
      message: err.message,
      data: err.stack
    };
  }
}

module.exports = CommonDto;
