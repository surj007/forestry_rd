const constant = require('../util/constant');

class AuthDto {
  constructor() {}

  authFailRespond() {
    return {
      code: constant.CODE_AUTHFAIL,
      message: '用户名或密码错误',
      data: null
    };
  }

  authSuccessRespond(data) {
    return {
      code: constant.CODE_SUCCESS,
      message: '登陆成功',
      data
    };
  }

  authLogoutRespond() {
    return {
      code: constant.CODE_SUCCESS,
      message: '登出成功',
      data: null
    };
  }

  authInvalidRespond() {
    return {
      code: constant.CODE_AUTHINVALID,
      message: '请重新登陆',
      data: null
    };
  }

  authForbiddenRespond() {
    return {
      code: constant.CODE_FORBIDDEN,
      message: '当前用户无权限访问此资源，请联系管理员',
      data: null
    };
  }
}

module.exports = AuthDto;
