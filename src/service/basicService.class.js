const BasicModel = require('../model/basicModel.class');

const basicModel = new BasicModel();

class BasicService {
  constructor() {}

  async getBasicInfo(basicName) {
    let obj = {};
    let { err, results } = await basicModel.getBasicInfo(basicName);

    for(let i in results) {
      obj[results[i].name] = {};
      obj[results[i].name].id = results[i].id;
      obj[results[i].name].name = results[i].name;
      obj[results[i].name].info = results[i].info.split(',');
    }

    return { err, results: obj };
  }

  async delBasic(id) {
    return await basicModel.delBasic(id);
  }

  async addBasic(basicName, basicValue) {
    let { err, results } = await basicModel.getBasicInfo(basicName);
    if(err) {
      return { err, results: [] };
    }
    else if(results.length != 0) {
      return { err: null, results: null }
    }
    else {
      return await basicModel.addBasic(basicName, basicValue);
    }
  }

  async editBasic(id, basicName, basicValue) {
    return await basicModel.editBasic(id, basicName, basicValue);
  }
}

module.exports = BasicService;