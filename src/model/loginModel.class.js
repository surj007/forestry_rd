const Model = require('./index.class');
const Respond = require('../api/respond.class');

const model = new Model();
const respond = new Respond();

class LoginModel {
  constructor() {}

  findUserInfo(res, username, callback) {
    model.selectWithConditions('user', '*', 'username = ?', [username], (err, results) => {
      if(err) {
        respond.dbRespond(err, [], res);
      }
      else {
        callback && callback(results);
      }
    });
  }
  
  findRoleByUserId(res, userId, callback) {
    let query = 'select b.id, name, nameZh from user_role as a left join role as b on a.rid = b.id where a.uid = ?';
    let data = [userId];
  
    db.query(query, data, (err, results, fields) => {
      if(err) {
        respond.dbRespond(err, [], res);
      }
      else {
        callback && callback(results);
      }
    });
  }
}

module.exports = LoginModel;