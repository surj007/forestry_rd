const express = require('express');

const CommonDto = require('../../dto/commonDto.class');
const UserService = require('../../service/userService.class');
const { isParamNull } = require('../../util/index');
const constant = require('../../util/constant');

const router = express.Router();
const commonDto = new CommonDto();
const userService = new UserService();

router.get('/getUsersWithRole', async function(req, res, next) {
  let nullParam = isParamNull(req, 'query', ['user', 'pageNum', 'pageSize']);

  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, results } = await userService.findAllUserWithRole(req.query.user, req.query.pageNum, req.query.pageSize);
    res.json(commonDto.dbRespond(err, results));
  }
});

router.post('/addUser', async function(req, res, next) {
  let nullParam = isParamNull(req, 'body', ['username', 'password']);

  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, results } = await userService.findUserByUserName(req.body.username);

    if(err) {
      res.json(commonDto.dbRespond(err, []));
    }
    else if(results.length != 0) {
      res.json(commonDto.duplicateKeyRespond('用户名'));
    }
    else {
      let { err, results } = await userService.addUser(req.body.username, req.body.password, req.body.phone);
      res.json(commonDto.dbRespond(err, results.insertId, 'add user success'));
    }
  }
});

router.delete('/delUser', async function(req, res, next) {
  let nullParam = isParamNull(req, 'body', ['id']);

  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err } = await userService.delUser(req.body.id);

    if(!err) {
      let result = await userService.delRole4User(req.body.id);
      res.json(commonDto.dbRespond(result.err, [], 'del user success'));
    }
    else {
      res.json(commonDto.dbRespond(err, []));
    }
  }
});

router.post('/editUser', async function(req, res, next) {
  let nullParam = isParamNull(req, 'body', ['id', 'username', 'password']);

  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, results } = await userService.findUserByUserName(req.body.username);

    if(err) {
      res.json(commonDto.dbRespond(err, []));
    }
    else if(results.length != 0) {
      res.json(commonDto.duplicateKeyRespond('用户名'));
    }
    else {
      let { err } = await userService.editUser(req.body.id, req.body.username, req.body.password, req.body.phone);
      res.json(commonDto.dbRespond(err, [], 'edit user success'));
    }
  }
});

router.post('/editRole4User', async function(req, res, next) {
  let nullParam = isParamNull(req, 'body', ['uid', 'rid']);

  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    if(req.body.rid.includes(1)) {
      res.json(commonDto.errorRespond(constant.CODE_FORBIDDEN, '修改角色错误'));
    }

    let { err } = await userService.delRole4User(req.body.uid);

    if(!err) {
      let result = await userService.addRole4User(req.body.uid, req.body.rid);
      res.json(commonDto.dbRespond(result.err, [], 'editRole4User success'));
    }
    else {
      res.json(commonDto.dbRespond(err, []));
    }
  }
});

module.exports = router;
