const express = require('express');

const CommonDto = require('../../dto/commonDto.class');
const VersionService = require('../../service/versionService.class');
const { isParamNull } = require('../../util/index');

const router = express.Router();
const commonDto = new CommonDto();
const versionService = new VersionService();


router.put('/addVersion', async (req, res, next) => {
  let nullParam = isParamNull(req, 'body', ['type', 'title', 'description', 'version_id', 'version_name', 'force_update']);
  
  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, results } = await versionService.addVersion(req.body.type, req.body.title, req.body.description, req.body.version_id, req.body.version_name, req.body.force_update, req.body.url);
    res.json(commonDto.dbRespond(err, results));
  }
});

module.exports = router;