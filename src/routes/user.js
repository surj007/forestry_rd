const express = require('express');

const CommonDto = require('../dto/commonDto.class');
const PowerDto = require('../dto/powerDto.class');
const UserService = require('../service/userService.class');
const { isParamNull } = require('../util/index');

const router = express.Router();
const commonDto = new CommonDto();
const powerDto = new PowerDto();
const userService = new UserService();

router.get('/getUserWithRole', async function(req, res, next) {
  let { err, results } = await userService.findAllUserWithRole();
  res.json(commonDto.dbRespond(err, results));
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
      res.json(powerDto.usernameDuplicate());
    }
    else {
      let { err } = await userService.addUser(req.body.username, req.body.password, req.body.phone);
      res.json(commonDto.dbRespond(err, [], 'add user success'));
    }
  }
});

// 删除用户时，需要将 用户、角色对应关系 同时删除
router.delete('/delUser', async function(req, res, next) {
  let nullParam = isParamNull(req, 'body', ['id']);
  
  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err } = await userService.delUser(req.body.id);
    res.json(commonDto.dbRespond(err, [], 'del user success'));
  }
});

router.post('/editUser', async function(req, res, next) {
  let nullParam = isParamNull(req, 'body', ['id', 'username', 'password']);
  
  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err } = await userService.editUser(req.body.id, req.body.username, req.body.password, req.body.phone);
    res.json(commonDto.dbRespond(err, [], 'edit user success'));
  }
});

module.exports = router;
