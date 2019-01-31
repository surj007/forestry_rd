const express = require('express');

const Respond = require('../api/respond.class');
const LoginService = require('../service/loginService.class');

const router = express.Router();
const respond = new Respond();
const loginService = new LoginService();

router.post('/login', async function(req, res, next) {
  let isNull = respond.isNullRespond(req, res, 'body', ['username', 'password']);

  if(!isNull) {
    let userInfo = await loginService.getUserInfoAndAuth(res, req.body.username, req.body.password);

    if(userInfo) {
      let roles = await loginService.getRoleByUserId(res, userInfo.id);

      req.session.userInfo = {
        uid: userInfo.id,
        username: userInfo.username,
        phone: userInfo.phone,
        role: roles
      };

      respond.authSuccessRespond(res, req.session.userInfo);
    }
  }
});

router.get('/logout', (req, res, next) => {
  req.session.destroy(() => {
    respond.authLogoutRespond(res);
  });
});

module.exports = router;
