const express = require('express');

const AuthDto = require('../dto/authDto.class');
const CommonDto = require('../dto/commonDto.class');
const LoginService = require('../service/loginService.class');
const UserService = require('../service/userService.class');
const { isParamNull } = require('../util/index');
const constant = require('../util/constant');

const router = express.Router();
const authDto = new AuthDto();
const commonDto = new CommonDto();
const loginService = new LoginService();
const userService = new UserService();

router.post('/login', async (req, res, next) => {
  let nullParam = isParamNull(req, 'body', ['username', 'password']);

  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, result } = await loginService.getUserInfoAndAuth(req.body.username, req.body.password);

    if(err) {
      res.json(commonDto.dbRespond(err, []));
    }

    if(!result) {
      res.json(authDto.authFailRespond());
    }
    else {
      let { err, results } = await loginService.getRoleByUserId(result.id);

      if(err) {
        res.json(commonDto.dbRespond(err, []));
      }
      else {
        req.session.userInfo = {
          uid: result.id,
          username: result.username,
          phone: result.phone,
          role: results
        };

        res.json(authDto.authSuccessRespond(req.session.userInfo));
      }
    }
  }
});

router.get('/logout', (req, res, next) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json(authDto.authLogoutRespond());
  });
});

router.get('/getUserBySession', async (req, res, next) => {
  if(req.session.userInfo) {
    res.json(commonDto.okRespond(req.session.userInfo));
  }
  else {
    res.json(authDto.authInvalidRespond());
  }
});

router.post('/changePwd', async (req, res, next) => {
  let nullParam = isParamNull(req, 'body', ['oldPwd', 'newPwd']);

  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, results } = await userService.changePwd(req.session.userInfo.uid, req.body.oldPwd, req.body.newPwd);

    if(err) {
      res.json(commonDto.dbRespond(err, results));
    }
    else if(results) {
      res.json(commonDto.okRespond());
    }
    else {
      res.json(commonDto.errorRespond(constant.CODE_CHANGEPWDERR, '原始密码错误，请重新填写'));
    }
  }
});

router.post('/changeUserInfo', async (req, res, next) => {
  let nullParam = isParamNull(req, 'body', ['phone']);

  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err } = await userService.changeUserInfo(req.session.userInfo.uid, req.body.phone);

    if(!err) {
      req.session.userInfo.phone = req.body.phone;
    }
    
    res.json(commonDto.dbRespond(err, req.session.userInfo));
  }
});

module.exports = router;
