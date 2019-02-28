const express = require('express');

const CommonDto = require('../../dto/commonDto.class');
const FileService = require('../../service/fileService.class');
const { isParamNull } = require('../../util/index');

const router = express.Router();
const commonDto = new CommonDto();
const fileService = new FileService();

router.get('/getFileInfo', async (req, res, next) => {
  let nullParam = isParamNull(req, 'query', ['fileName']);
  
  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, results } = await fileService.getFileInfo(req.query.fileName);
    res.json(commonDto.dbRespond(err, results));
  }
});

router.delete('/delFile', async (req, res, next) => {
  let nullParam = isParamNull(req, 'body', ['id']);
  
  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, results } = await fileService.delFile(req.body.id);
    res.json(commonDto.dbRespond(err, results));
  }
});

router.put('/addFile', async (req, res, next) => {
  let nullParam = isParamNull(req, 'body', ['name', 'url', 'size', 'type']);
  
  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, results } = await fileService.addFile(req.body.name, req.body.url, req.body.size, req.body.type);
    if(err || results) {
      res.json(commonDto.dbRespond(err, results));
    }
    else {
      res.json(commonDto.duplicateKeyRespond('文件名'));
    }
  }
});

router.post('/editFile', async (req, res, next) => {
  let nullParam = isParamNull(req, 'body', ['id', 'name', 'url', 'size', 'type']);
  
  if(nullParam) {
    res.json(commonDto.isNullRespond(nullParam));
  }
  else {
    let { err, results } = await fileService.editFile(req.body.id, req.body.name, req.body.url, req.body.size, req.body.type);
    res.json(commonDto.dbRespond(err, results));
  }
});

module.exports = router;