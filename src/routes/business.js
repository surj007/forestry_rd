const express = require('express');

const CommonDto = require('../dto/commonDto.class');
const BusinessService = require('../service/businessService.class');
const { isParamNull } = require('../util');

const router = express.Router();
const commonDto = new CommonDto();
const businessService = new BusinessService();

router.get('/getCertList', async (req, res, next) => {
  let nullParam = isParamNull(req, 'query', ['certType', 'status', 'companyName']);

  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, results } = await businessService.getCertList(req.query.certType, req.query.status, req.query.companyName);
    res.json(commonDto.dbRespond(err, results));
  }
});

router.put('/invokeCert', async (req, res, next) => {
  let nullParam = isParamNull(req, 'body', ['id', 'table', 'status']);

  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, results } = await businessService.invokeCert(req.body.id, req.body.table, req.body.status);
    res.json(commonDto.dbRespond(err, results));
  }
});

module.exports = router;
