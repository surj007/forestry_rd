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

  async getPlantCertList (status, companyName) {
    return await db.query(`select * from plant_cert
                          where status like ? and cid in
                          (select id from company_c where name like ?)`,
      [`%${status}%`, `%${companyName}%`]
    );
  }

  async invokeCert (id, table, status, uid) {
    return await model.update(table, 'status = ?, check_person = ?', 'id = ?', [status, uid, id]);
  }

  async invokePlantCert (id, status, uid) {
    return await model.update('plant_cert', 'status = ?, check_person = ?', 'id = ?', [status, uid, id]);
  }
}

module.exports = BusinessModel;
