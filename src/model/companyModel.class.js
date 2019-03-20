const Model = require('./index.class');

const model = new Model();

class CompanyModel {
  constructor() {}

  async getCompanyList(companyType, name, status, store) {
    return await model.selectWithConditions('company_c', '*', 'companyType like ? and status like ? and store like ? and name like ?', [`%${companyType}%`, `%${status}%`, `%${store}%`, `%${name}%`]);
  }

  async getCompanyById(id) {
    return await model.selectWithConditions('company_c', '*', 'id = ?', [id]);
  }

  async getWoodCertAmountById(id) {
    return await model.selectWithConditions('wood_cert', 'coalesce(sum(amount), 0) as amount', 'cid = ? and status = ?', [id, 2]);
  }

  async getBoardCertAmountById(id) {
    return await model.selectWithConditions('board_cert', 'coalesce(sum(amount), 0) as amount', 'cid = ? and status = ?', [id, 2]);
  }
}

module.exports = CompanyModel;
