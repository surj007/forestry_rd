const express = require('express');

const CommonDto = require('../../dto/commonDto.class');
const RoleDto = require('../../dto/roleDto.class');
const RoleService = require('../../service/roleService.class');
const { isParamNull } = require('../../util/index');

const router = express.Router();
const commonDto = new CommonDto();
const roleDto = new RoleDto();
const roleService = new RoleService();

router.get('/getRoles', async function(req, res, next) {
  let { err, results } = await roleService.getRoles();
  res.json(commonDto.dbRespond(err, results));
});

router.get('/getPermissionByRole', async function(req, res, next) {
  let nullParam = isParamNull(req, 'body', ['id']);
  
  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, results } = await roleService.getPermissionByRole(req.body.id);
    res.json(commonDto.dbRespond(err, results, 'getPermissionByRole success'));
  }
});

router.post('/addRole', async function(req, res, next) {
  let nullParam = isParamNull(req, 'body', ['name', 'nameZh']);
  
  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let result = await roleService.findRoleByName(req.body.name);
    let result1 = await roleService.findRoleByNameZh(req.body.nameZh);

    if(result.err || result1.err) {
      res.json(commonDto.dbRespond(err, []));
    }
    else if(result.results.length != 0 || result1.results.length != 0) {
      res.json(roleDto.roleDuplicateRespond());
    }
    else {
      let { err } = await roleService.addRole(req.body.name, req.body.nameZh);
      res.json(commonDto.dbRespond(err, [], 'add role success'));
    }
  }
});

router.delete('/delRole', async function(req, res, next) {
  let nullParam = isParamNull(req, 'body', ['id']);
  
  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err } = await roleService.delRole(req.body.id);

    if(!err) {
      let result = await roleService.delPermission4Role(req.body.id);
      let result1 = await roleService.delUser4Role(req.body.id);
      res.json(commonDto.dbRespond(result.err ? result.err : result1.err, [], 'del role success'));
    }
    else {
      res.json(commonDto.dbRespond(err, []));
    }
  }
});

router.post('/editRole', async function(req, res, next) {
  let nullParam = isParamNull(req, 'body', ['id', 'name', 'nameZh']);
  
  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err } = await roleService.editRole(req.body.id, req.body.name, req.body.nameZh);
    res.json(commonDto.dbRespond(err, [], 'edit role success'));
  }
});

router.post('/editPermission4Role', async function(req, res, next) {
  let nullParam = isParamNull(req, 'body', ['rid', 'pid']);
  
  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err } = await roleService.delPermission4Role(req.body.rid);

    if(!err) {
      let result = await roleService.addPermission4Role(req.body.rid, req.body.pid);
      res.json(commonDto.dbRespond(result.err, [], 'editPermission4Role success'));
    }
    else {
      res.json(commonDto.dbRespond(err, []));
    }
  }
});

module.exports = router;
