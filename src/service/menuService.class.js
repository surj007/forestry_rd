const MenuModel = require('../model/menuModel.class');

const menuModel = new MenuModel();

class MenuService {
  constructor() {}

  async getMenu(roles) {
    let conditions = '';
    let data = [];

    for(let i in roles) {
      if(i != 0) {
        conditions += ' or ';
      }
      conditions += 'permission_role.rid = ?'
      data.push(roles[i].id);
    }
    
    let { err, results } = await menuModel.getMenu(conditions, data);

    let result = new Set();
    for(let i in results) {
      result.add(results[i].module);
    }
    result = Array.from(result)

    return { err, result };
  }
}

module.exports = MenuService;