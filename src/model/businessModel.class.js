const Model = require('./index.class');

const model = new Model();

class BusinessModel {
  constructor () {}

  async getWoodCertList (status, companyName) {
    return await db.query(`select wood_cert.*, company_c.name from wood_cert left join company_c on wood_cert.cid = company_c.id where wood_cert.status like ? and wood_cert.cid in (select id from company_c where name like ?)`,
      [`%${status}%`, `%${companyName}%`]
    );
  }

  async getBoardCertList (status, companyName) {
    return await db.query(`select board_cert.*, company_c.name from board_cert left join company_c on board_cert.cid = company_c.id where board_cert.status like ? and board_cert.cid in (select id from company_c where name like ?)`,
      [`%${status}%`, `%${companyName}%`]
    );
  }

  async getPlantCertList (status, companyName) {
    return await db.query(`select plant_cert.*, company_c.name from plant_cert left join company_c on plant_cert.cid = company_c.id where plant_cert.status like ? and plant_cert.cid in (select id from company_c where name like ?)`,
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
