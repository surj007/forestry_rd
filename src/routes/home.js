const express = require('express');

const CommonDto = require('../dto/commonDto.class');
const HomeService = require('../service/homeService.class');

const router = express.Router();
const commonDto = new CommonDto();
const homeService = new HomeService();

router.get('/getDashboardData', async (req, res, next) => {
  let { err, results } = await homeService.getDashboardData();
  res.json(commonDto.dbRespond(err, results));
});

module.exports = router;