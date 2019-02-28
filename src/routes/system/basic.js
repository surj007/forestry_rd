const express = require('express');

const CommonDto = require('../../dto/commonDto.class');
const BasicService = require('../../service/basicService.class');
const { isParamNull } = require('../../util/index');

const router = express.Router();
const commonDto = new CommonDto();
const basicService = new BasicService();

router.get('/getBasicInfo', async (req, res, next) => {
  let nullParam = isParamNull(req, 'query', ['basicName']);
  
  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, results } = await basicService.getBasicInfo(req.query.basicName);
    res.json(commonDto.dbRespond(err, results));
  }
});

router.delete('/delBasic', async (req, res, next) => {
  let nullParam = isParamNull(req, 'body', ['id']);
  
  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, results } = await basicService.delBasic(req.body.id);
    res.json(commonDto.dbRespond(err, results));
  }
});

router.put('/addBasic', async (req, res, next) => {
  let nullParam = isParamNull(req, 'body', ['basicName', 'basicValue']);
  
  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, results } = await basicService.addBasic(req.body.basicName, req.body.basicValue);
    if(err || results) {
      res.json(commonDto.dbRespond(err, results));
    }
    else {
      res.json(commonDto.duplicateKeyRespond('字典名'));
    }
  }
});

router.post('/editBasic', async (req, res, next) => {
  let nullParam = isParamNull(req, 'body', ['id', 'basicName', 'basicValue']);
  
  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, results } = await basicService.editBasic(req.body.id, req.body.basicName, req.body.basicValue);
    res.json(commonDto.dbRespond(err, results));
  }
});

module.exports = router;