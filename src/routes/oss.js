const express = require('express');

const CommonDto = require('../dto/commonDto.class');
const OssService = require('../service/ossService.class');
const { isParamNull } = require('../util/index');

const router = express.Router();
const commonDto = new CommonDto();
const ossService = new OssService();

router.get('/getSign', (req, res, next) => {
  let nullParam = isParamNull(req, 'query', ['path']);
  
  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    res.json(commonDto.okRespond(ossService.getSign(req.query.path)));
  }
});

router.get('/getSignatureUrl', (req, res, next) => {
  let nullParam = isParamNull(req, 'query', ['path', 'fileName']);
  
  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    res.json(commonDto.okRespond(ossService.getSignatureUrl(req.query.path, req.query.fileName)));
  }
});

module.exports = router;