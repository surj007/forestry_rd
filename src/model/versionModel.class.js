const Model = require('./index.class');

const model = new Model();

class VersionModel {
  constructor() {}

  async addVersion(type, title, description, version_id, version_name, force_update, url) {
    return await model.insert('version', 'type, title, description, version_id, version_name, force_update, url', '(?, ?, ?, ?, ?, ?, ?)', [type, title, description, version_id, version_name, force_update, url]);
  }
}

module.exports = VersionModel;