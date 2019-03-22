const Model = require('./index.class');

const model = new Model();

class BusinessModel {
  constructor () {}

  async getWoodCertList (status, companyName) {
    return await db.query(`select * from wood_cert
                          where status like ? and cid in
                          (select id from company_c where name like ?)`,
      [`%${status}%`, `%${companyName}%`]
    );
  }

  async getBoardCertList (status, companyName) {
    return await db.query(`select * from board_cert
                          where status like ? and cid in
                          (select id from company_c where name like ?)`,
      [`%${status}%`, `%${companyName}%`]
    );
  }

  async invokeCert (id, table, status) {
    return await model.update(table, 'status = ?', 'id = ?', [status, id]);
  }
}

module.exports = BusinessModel;
