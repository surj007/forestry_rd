const { commonRes } = require('../dto/commonResDto');
const constant = require('../util/constant');

class Respond {
  constructor() {}
  
  dbRespond(err, results, res) {
    if(err) {
      res.json(commonRes(constant.CODE_DBERR, 'db err', err));
    }
    else {
      res.json(dto.resOk(constant.CODE_SUCCESS, 'db ok', results));
    }
  }

  isNullRespond(req, res, fields, callback) {
    for(let i of fields) {
      if(req.body[i] == undefined) {
        res.json(commonRes(constant.CODE_NULLERR, `${i}不能为空`, null));
        return;
      }
    }
    callback && callback();
  }

  authFailRespond(res) {
    res.json(commonRes(constant.CODE_AUTHFAIL, '用户名或密码错误', null));
  }

  authSuccessRespond(res, data) {
    res.json(commonRes(constant.CODE_SUCCESS, '登陆成功', data));
  }

  authLogoutRespond(res) {
    res.json(commonRes(constant.CODE_SUCCESS, '登出成功', null));
  }

  authInvalidRespond(res) {
    res.json(commonRes(constant.CODE_AUTHINVALID, '请重新登陆', null));
  }

  authForbiddenRespond(res) {
    res.status(403).json(commonRes(constant.CODE_FORBIDDEN, '当前用户无权限访问', null));
  }
}

module.exports = Respond;