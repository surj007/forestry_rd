const BasicModel = require('../model/basicModel.class');

const basicModel = new BasicModel();

class BasicService {
  constructor() {}

  async getBasicInfo() {
    let obj = {};
    let { err, results } = await basicModel.getBasicInfo();

    for(let i in results) {
      obj[results[i].name] = results[i].info;
    }

    obj.companyType = obj.companyType.split(',');
    obj.source = obj.source.split(',');

    return { err, results: obj };
  }

  async getFileInfo() {
    let obj = {};
    let { err, results } = await basicModel.getFileInfo();

    for(let i in results) {
      obj[results[i].name] = results[i].url;
    }

    return { err, results: obj };
  }
}

module.exports = BasicService;