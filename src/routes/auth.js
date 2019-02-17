const express = require('express');

const AuthDto = require('../dto/authDto.class');
const CommonDto = require('../dto/commonDto.class');
const LoginService = require('../service/loginService.class');
const { isParamNull } = require('../util/index');

const router = express.Router();
const authDto = new AuthDto();
const commonDto = new CommonDto();
const loginService = new LoginService();

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

module.exports = router;
