const Model = require('./index.class');

const model = new Model();

class CompanyModel {
  constructor() {}

  async getCompanyList(companyType, name, status, store) {
    return await model.selectWithConditions('company_c', '*', 'companyType = ? and status = ? and store like ? and name like ?', [companyType, status, `%${store}%`, `%${name}%`]);
  }

  async getCompanyById(id) {
    return await model.selectWithConditions('company_c', '*', 'id = ?', [id]);
  }
}

module.exports = CompanyModel;