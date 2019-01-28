const dto = require('../dto/formatResDto');

function dbRespond(err, results, res) {
  if(err) {
    res.json(dto.resDbErr(err));
  }
  else {
    res.json(dto.resOk('db ok', results));
  }
};

function dbErrRespond(err, res) {
  res.json(dto.resDbErr(err));
};

function isNullRespond(req, res, fields, callback) {
  for(let i of fields) {
    if(req.body[i] == undefined) {
      res.json(dto.resNullErr(`${i}不能为空`));
      return;
    }
  }
  callback && callback();
};

function authFailRespond(res) {
  res.json(dto.resAuthErr());
};

module.exports = {
  dbRespond,
  dbErrRespond,
  isNullRespond,
  authFailRespond
};