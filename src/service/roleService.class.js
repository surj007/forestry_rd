const RoleModel = require('../model/roleModel.class');

const roleModel = new RoleModel();

class RoleService {
  constructor() {}

  async getRolesWithPermission (roleNameZh) {
    let formatResults = {};
    let { err, results } = await roleModel.getRolesWithPermission(roleNameZh);

    for (let i of results) {
      if (formatResults[i.rid]) {
        if (i.id) {
          formatResults[i.rid].permission.push({
            id: i.id,
            module: i.module
          });
        }
      }
      else {
        formatResults[i.rid] = {};
        formatResults[i.rid].id = i.rid;
        formatResults[i.rid].name = i.name;
        formatResults[i.rid].nameZh = i.nameZh;
        formatResults[i.rid].permission = [];
        if (i.id) {
          formatResults[i.rid].permission.push({
            id: i.id,
            module: i.module
          });
        }
      }
    }

    return {
      err,
      results: Object.values(formatResults)
    }
  }

  async getPermissionByRole(rid) {
    return await roleModel.getPermissionByRole(rid);
  }

  async findRoleByName(name) {
    return await roleModel.findRoleByName(name);
  }

  async findRoleByNameZh(nameZh) {
    return await roleModel.findRoleByNameZh(nameZh);
  }

  async addRole(name, nameZh) {
    return await roleModel.addRole(name, nameZh);
  }

  async delRole(id) {
    return await roleModel.delRole(id);
  }

  async editRole(id, name, nameZh) {
    return await roleModel.editRole(id, name, nameZh);
  }

  async delPermission4Role(rid) {
    return await roleModel.delPermission4Role(rid);
  }

  async delUser4Role(rid) {
    return await roleModel.delUser4Role(rid);
  }

  async addPermission4Role(rid, pid) {
    let format = '';
    let data = [];

    for(let i in pid) {
      if(i != 0) {
        format += ', ';
      }
      format += '(?, ?)';
      data.push(rid);
      data.push(pid[i]);
    }
    return await roleModel.addPermission4Role(format, data);
  }
}

module.exports = RoleService;