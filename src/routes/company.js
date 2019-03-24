const express = require('express');

const CommonDto = require('../dto/commonDto.class');
const CompanyService = require('../service/companyService.class');
const { isParamNull } = require('../util');

const router = express.Router();
const commonDto = new CommonDto();
const companyService = new CompanyService();

router.get('/getCompanyList', async (req, res, next) => {
  let nullParam = isParamNull(req, 'query', ['companyType', 'name', 'status', 'store']);

  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, results } = await companyService.getCompanyList(req.query.companyType, req.query.name, req.query.status, req.query.store);
    res.json(commonDto.dbRespond(err, results));
  }
});

router.get('/getCompanyById', async (req, res, next) => {
  let nullParam = isParamNull(req, 'query', ['id']);

  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, results } = await companyService.getCompanyById(req.query.id);
    res.json(commonDto.dbRespond(err, results[0]));
  }
});

router.get('/getCertAmountById', async (req, res, next) => {
  let nullParam = isParamNull(req, 'query', ['id']);

  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, results } = await companyService.getCertAmountById(req.query.id);
    res.json(commonDto.dbRespond(err, results));
  }
});

router.get('/getEmployeeByCompnayId', async (req, res, next) => {
  let nullParam = isParamNull(req, 'query', ['id']);

  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, results } = await companyService.getEmployeeByCompnayId(req.query.id);
    res.json(commonDto.dbRespond(err, results));
  }
});

router.put('/approveCompany', async (req, res, next) => {
  let nullParam = isParamNull(req, 'body', ['id', 'status', 'refuse_reason']);

  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, results } = await companyService.approveCompany(req.body.id, req.body.status, req.body.refuse_reason, req.body.remark, req.session.userInfo.uid);
    res.json(commonDto.dbRespond(err, results));
  }
});

module.exports = router;
