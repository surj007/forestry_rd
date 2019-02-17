const express = require('express');

const CommonDto = require('../../dto/commonDto.class');
const BasicService = require('../../service/basicService.class');

const router = express.Router();
const commonDto = new CommonDto();
const basicService = new BasicService();

router.get('/getBasicInfo', async (req, res, next) => {
  let { err, results } = await basicService.getBasicInfo();
  res.json(commonDto.dbRespond(err, results));
});

router.get('/getFileInfo', async (req, res, next) => {
  let { err, results } = await basicService.getFileInfo();
  res.json(commonDto.dbRespond(err, results));
});

module.exports = router;