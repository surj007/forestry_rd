const express = require('express');

const CommonDto = require('../dto/commonDto.class');
const { isParamNull } = require('../util/index');

const router = express.Router();
const commonDto = new CommonDto();

router.post('/testRpc', async function(req, res, next) {
  let nullParam = isParamNull(req, 'body', ['data']);
  
  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, result } = await rpc.testRpcService.console(req.body.data);
    res.json(commonDto.dbRespond(err, result, 'ok'));
  }
});

module.exports = router;
