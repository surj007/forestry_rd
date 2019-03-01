const Model = require('./index.class');

const model = new Model();

class HomeModel {
  constructor() {}

  async getCompanyCount(data) {
    return await model.getCountWithConditions('company_c', 'create_time between ? and ?', data);
  }
}

module.exports = HomeModel;