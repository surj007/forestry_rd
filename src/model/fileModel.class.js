const Model = require('./index.class');

const model = new Model();

class FileModel {
  constructor() {}

  async getFileInfo(fileName) {
    return await model.selectWithConditions('file', '*', 'name like ?', [`%${fileName}%`]);
  }

  async delFile(id) {
    return await model.del('file', 'id = ?', [id]);
  }

  async addFile(name, url, size, type) {
    return await model.insert('file', 'name, url, size, type', '(?, ?, ?, ?)', [name, url, size, type]);
  }

  async editFile(id, name, url, size, type) {
    return await model.update('file', 'name = ?, url = ?, size = ?, type = ?', 'id = ?', [name, url, size, type, id]);
  }
}

module.exports = FileModel;