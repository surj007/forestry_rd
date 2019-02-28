const VersionModel = require('../model/versionModel.class');

const versionModel = new VersionModel();

class VersionService {
  constructor() {}

  async addVersion(type, title, description, version_id, version_name, force_update, url) {
    return await versionModel.addVersion(type, title, description, version_id, version_name, force_update, url);
  }
}

module.exports = VersionService;