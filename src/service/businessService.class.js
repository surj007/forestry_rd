const moment = require('moment');

const BusinessModel = require('../model/businessModel.class');

const businessModel = new BusinessModel();

class BusinessService {
  constructor() {}

  async getCertList(certType, statusString, companyName) {
    let status = statusString === '' ? '' : parseInt(statusString);
    let results = [];
    let err = {};

    if (certType === '') {
      let woodCertListPromsie = businessModel.getWoodCertList(status, companyName);
      let boardCertListPromsie = businessModel.getBoardCertList(status, companyName);

      let resultsArray = await Promise.all([woodCertListPromsie, boardCertListPromsie]);

      for (let i of resultsArray) {
        if (i.err) {
          return { err: i.err, results: [] }
        }
      }

      resultsArray[0].results.forEach((item) => {
        item.cert_type = '原木类开证';
        item.number = `W${moment(item.create_time).format('YYYYMMDDHHmmss')}${item.id}`;
        item.create_time = moment(item.create_time).format('YYYY-MM-DD HH:mm:ss');
        results.push(item);
      });

      resultsArray[1].results.forEach((item) => {
        item.cert_type = '板材类开证';
        item.number = `B${moment(item.create_time).format('YYYYMMDDHHmmss')}${item.id}`;
        item.create_time = moment(item.create_time).format('YYYY-MM-DD HH:mm:ss');
        results.push(item);
      });

      return {
        err: null,
        results
      }
    }
    else if (certType === '板材类开证') {
      let boardCertList = await businessModel.getBoardCertList(status, companyName);
      err = boardCertList.err;

      boardCertList.results.forEach((item) => {
        item.cert_type = '板材类开证';
        item.number = `B${moment(item.create_time).format('YYYYMMDDHHmmss')}${item.id}`;
        item.create_time = moment(item.create_time).format('YYYY-MM-DD HH:mm:ss');
        results.push(item);
      });
    }
    else {
      let woodCertList = await businessModel.getWoodCertList(status, companyName);
      err = woodCertList.err;

      woodCertList.results.forEach((item) => {
        item.cert_type = '原木类开证';
        item.number = `B${moment(item.create_time).format('YYYYMMDDHHmmss')}${item.id}`;
        item.create_time = moment(item.create_time).format('YYYY-MM-DD HH:mm:ss');
        results.push(item);
      });
    }

    return { err, results };
  }

  async invokeCert(id, table, status) {
    return await businessModel.invokeCert(id, table, status);
  }
}

module.exports = BusinessService;
