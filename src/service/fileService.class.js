const FileModel = require('../model/fileModel.class');

const fileModel = new FileModel();

class FileService {
  constructor() {}

  async getFileInfo(fileName) {
    let obj = {};
    let { err, results } = await fileModel.getFileInfo(fileName);

    for(let i in results) {
      obj[results[i].name] = {};
      obj[results[i].name].id = results[i].id;
      obj[results[i].name].name = results[i].name;
      obj[results[i].name].url = results[i].url;
      obj[results[i].name].size = results[i].size;
      obj[results[i].name].type = results[i].type;
    }

    return { err, results: obj };
  }

  async delFile(id) {
    return await fileModel.delFile(id);
  }

  async addFile(name, url, size, type) {
    let { err, results } = await fileModel.getFileInfo(name);
    if(err) {
      return { err, results: [] };
    }
    else if(results.length != 0) {
      return { err: null, results: null }
    }
    else {
      return await fileModel.addFile(name, url, size, type);
    }
  }

  async editFile(id, name, url, size, type) {
    return await fileModel.editFile(id, name, url, size, type);
  }
}

module.exports = FileService;