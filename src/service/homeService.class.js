const moment = require('moment');

const HomeModel = require('../model/homeModel.class');

const homeModel = new HomeModel();

class HomeService {
  constructor() {}

  async getDashboardData() {
    let companyCount = homeModel.getCompanyCount(['1970-01-01 00:00:00', '9999-01-01 00:00:00']);
    let companyCountYesterday = homeModel.getCompanyCount(['1970-01-01 00:00:00', moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), moment().subtract(1, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss')]);

    let resultsArray = await Promise.all([companyCount, companyCountYesterday]);
    
    for(let i of resultsArray) {
      if(i.err) {
        return { err: i.err, results: [] }
      }
    }

    return {
      err: null,
      results: {
        companyCount: resultsArray[0].results[0]['count(*)'],
        companyRise: (resultsArray[0].results[0]['count(*)'] - resultsArray[1].results[0]['count(*)']) / resultsArray[1].results[0]['count(*)'] * 100
      }
    }
  }
}

module.exports = HomeService;