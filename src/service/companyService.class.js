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

  async getCertAmountById(id) {
    let woodCertAmountPromise = companyModel.getWoodCertAmountById(id);
    let boardCertAmountPromise = companyModel.getBoardCertAmountById(id);

    let resultsArray = await Promise.all([woodCertAmountPromise, boardCertAmountPromise]);

    for(let i of resultsArray) {
      if(i.err) {
        return { err: i.err, results: [] }
      }
    }

    return {
      err: null,
      results: {
        woodCertAmount: resultsArray[0].results[0],
        boardCertAmount: resultsArray[1].results[0]
      }
    }
  }
}

module.exports = CompanyService;
