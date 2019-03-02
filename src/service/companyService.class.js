const moment = require('moment');

const CompanyModel = require('../model/companyModel.class');

const companyModel = new CompanyModel();

class CompanyService {
  constructor() {}

  async getCompanyList(companyType, name, status, store) {
    let { err, results } = await companyModel.getCompanyList(companyType, name, status, store);
    
    results.forEach((item) => {
      item.create_time = moment(item.create_time).format('YYYY-MM-DD HH:mm:ss');
    });

    return { err, results };
  }

  async getCompanyById(id) {
    return await companyModel.getCompanyById(id);
  }
}

module.exports = CompanyService;