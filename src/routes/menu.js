const express = require('express');

const CommonDto = require('../dto/commonDto.class');
const MenuService = require('../service/menuService.class');

const router = express.Router();
const commonDto = new CommonDto();
const menuService = new MenuService();

router.get('/getMenu', async function(req, res, next) {
  let { err, result } = await menuService.getMenu(req.session.userInfo.role);
  res.json(commonDto.dbRespond(err, result));
});

module.exports = router;