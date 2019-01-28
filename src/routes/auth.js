const express = require('express');

const respond = require('../api/respond');
const loginService = require('../service/loginService');
const dto = require('../dto/formatResDto');

const router = express.Router();

router.post('/login', function(req, res, next) {
  respond.isNullRespond(req, res, ['username', 'password'], () => {
    loginService.getUserInfoAndAuth(res, req.body.username, req.body.password, (userInfo) => {
      loginService.getRoleByUserId(res, userInfo.id, (roles) => {
        req.session.userInfo = {
          uid: userInfo.id,
          username: userInfo.username,
          phone: userInfo.phone,
          role: roles
        };
        res.json(req.session.userInfo);
      });
    });
  });
});

router.post('/logout', function(req, res, next) {
  req.session.destroy(() => {
    res.json(dto.resOk('登出成功'));
  });
});

module.exports = router;
