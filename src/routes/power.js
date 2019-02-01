const express = require('express');

const CommonDto = require('../dto/commonDto.class');
const PowerDto = require('../dto/powerDto.class');
const PowerService = require('../service/powerService.class');
const { isParamNull } = require('../util/index');

const router = express.Router();
const commonDto = new CommonDto();
const powerDto = new PowerDto();
const powerService = new PowerService();

router.get('/getUserAndRole', async function(req, res, next) {
  let { err, results } = await powerService.findAllUserAndRole();
  res.json(commonDto.dbRespond(err, results));
});

router.post('/addUser', async function(req, res, next) {
  let nullParam = isParamNull(req, 'body', ['username', 'password']);
  
  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, results } = await powerService.findUser(req.body.username);

    if(err) {
      res.json(commonDto.dbRespond(err, []));
    }
    else if(results.length != 0) {
      res.json(powerDto.usernameDuplicate());
    }
    else {
      let { err } = await powerService.addUser(req.body.username, req.body.password, req.body.phone);
      res.json(commonDto.dbRespond(err, [], 'add user success'));
    }
  }
});

router.delete('/delUser', async function(req, res, next) {
  let nullParam = isParamNull(req, 'body', ['id']);
  
  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err } = await powerService.delUser(req.body.id);
    res.json(commonDto.dbRespond(err, [], 'del user success'));
  }
});

router.post('/editUser', async function(req, res, next) {
  let nullParam = isParamNull(req, 'body', ['id', 'username', 'password']);
  
  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err } = await powerService.editUser(req.body.id, req.body.username, req.body.password, req.body.phone);
    res.json(commonDto.dbRespond(err, [], 'edit user success'));
  }
});

module.exports = router;
