const express = require('express');

const CommonDto = require('../../dto/commonDto.class');
const PermissionDto = require('../../dto/permissionDto.class');
const PermissionService = require('../../service/permissionService.class');
const { isParamNull } = require('../../util/index');

const router = express.Router();
const commonDto = new CommonDto();
const permissionDto = new PermissionDto();
const permissionService = new PermissionService();

router.get('/getPermission', async function(req, res, next) {
  let { err, results } = await permissionService.getPermission();
  res.json(commonDto.dbRespond(err, results));
});

router.post('/addPermission', async function(req, res, next) {
  let nullParam = isParamNull(req, 'body', ['module']);
  
  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, results } = await permissionService.findPermissionByModule(req.body.module);

    if(err) {
      res.json(commonDto.dbRespond(err, []));
    }
    else if(results.length != 0) {
      res.json(permissionDto.permissionDuplicate());
    }
    else {
      let { err } = await permissionService.addPermission(req.body.module);
      res.json(commonDto.dbRespond(err, [], 'add permission success'));
    }
  }
});

module.exports = router;