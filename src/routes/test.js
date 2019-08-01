const express = require('express');

const CommonDto = require('../dto/commonDto.class');
const testRpcReq = require('../api/rpc/testRpcReq');

const router = express.Router();
const commonDto = new CommonDto();

router.post('/testRpc', validate({
  query: {
    age: ['required']
  },
  body: {
    sex: ['notBlank'],
    id: ['number'],
    name: ['array']
  }
}), async function(req, res) {
  let { err, result } = await testRpcReq.console(req.body.data);
  res.json(commonDto.dbRespond(err, result, 'ok'));
});

module.exports = router;
