const CODE_SUCCESS = 0;
const CODE_DBERR = 1;
const CODE_NULLERR = 2;
const CODE_AUTHFAIL = 3;

function resOk(msg, data) {
  return {
    code: CODE_SUCCESS,
    message: msg,
    data
  }
};

function resDbErr(err) {
  return {
    code: CODE_DBERR,
    message: 'db err',
    data: err
  }
};

function resNullErr(msg) {
  return {
    code: CODE_NULLERR,
    message: msg,
    data: null
  }
};

function resAuthErr() {
  return {
    code: CODE_AUTHFAIL,
    message: '用户名或密码错误',
    data: null
  }
};

module.exports = {
  resOk,
  resDbErr,
  resNullErr,
  resAuthErr
}