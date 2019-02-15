const Model = require('./index.class');

const model = new Model();

class BasicModel {
  constructor() {}

  async getBasicInfo() {
    return await model.selectWithNoConditions('basic', 'name, info');
  }

  async getFileInfo() {
    return await model.selectWithNoConditions('file', 'name, url');
  }
}

module.exports = BasicModel;