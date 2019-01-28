const model = require('.');
const respond = require('../api/respond');

function findUserInfo(res, username, callback) {
  model.selectWithConditions('user', '*', 'username = ?', [username], (err, results) => {
    if(err) {
      respond.dbErrRespond(err, res);
    }
    else {
      callback && callback(results);
    }
  });
};

function findRoleByUserId(res, userId, callback) {
  let query = 'select b.id, name, nameZh from user_role as a left join role as b on a.rid = b.id where a.uid = ?';
  let data = [userId];

  db.query(query, data, (err, results, fields) => {
    if(err) {
      respond.dbErrRespond(err, res);
    }
    else {
      callback && callback(results);
    }
  });
};

module.exports = {
  findUserInfo,
  findRoleByUserId
};