const Model = require('./index.class');
const Respond = require('../api/respond.class');

const model = new Model();
const respond = new Respond();

class LoginModel {
  constructor() {}

  async findUserInfo(res, username) {
    let { err, results } = await model.selectWithConditions('user', '*', 'username = ?', [username]);

    if(err) {
      respond.dbRespond(err, [], res);
    }

    return results;
  }
  
  async findRoleByUserId(res, userId) {
    let query = 'select b.id, name, nameZh from user_role as a left join role as b on a.rid = b.id where a.uid = ?';
    let data = [userId];
  
    let { err, results, fields } = await db.query(query, data);
    
    if(err) {
      respond.dbRespond(err, [], res);
    }

    return results;
  }
}

module.exports = LoginModel;