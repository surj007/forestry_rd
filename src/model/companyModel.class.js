const Model = require('./index.class');

const model = new Model();

class CompanyModel {
  constructor() {}

  async getCompanyList(companyType, name, status, store) {
    return await model.selectWithConditions('company_c', '*', 'companyType like ? and status like ? and store like ? and name like ?', [`%${companyType}%`, `%${status}%`, `%${store}%`, `%${name}%`]);
  }

  async getCompanyById(id) {
    return await model.selectWithConditions('company_c', '*', 'id = ?', [id]);
  }

  async getWoodCertAmountById(id) {
    return await model.selectWithConditions('wood_cert', 'coalesce(sum(amount), 0) as amount', 'cid = ? and status = ?', [id, 2]);
  }

  async getBoardCertAmountById(id) {
    return await model.selectWithConditions('board_cert', 'coalesce(sum(amount), 0) as amount', 'cid = ? and status = ?', [id, 2]);
  }

  async getEmployeeByCompnayId(cid) {
    return await db.query(
      `select user_c.id, user_c.username, user_c.name, user_c.socialSecurityPic, user_c.cardFrontPic, user_c.cardOppositePic from company_user_c
      left join user_c on company_user_c.uid = user_c.id where company_user_c.cid = ? and password = '-@_';`,
      [cid]
    );
  }

  async approveCompany(id, status, refuse_reason, remark, uid) {
    return await model.update('company_c', 'status = ?, refuse_reason = ?, approve_remark = ?, check_person = ?', 'id = ? and status = ?', [status, refuse_reason, remark, uid, id, 1]);
  }
}

module.exports = CompanyModel;
