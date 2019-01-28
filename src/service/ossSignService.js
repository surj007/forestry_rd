const crypto = require('crypto');

function sign() {
  const config = {
    dirPath: 'image/',
    bucket: 'forestry-bureau',
    region: 'oss-cn-shanghai',
    accessKeyId: 'LTAIUR8UPrDx2ABa',
    accessKeySecret: 'gEpafGvrP0uaLwNSH1LZhloIpNgTcv',
    expAfter: 60000,
    maxSize: 1048576000
  };
  
  const host = `http://${config.bucket}.${config.region}.aliyuncs.com`;
  const expireTime = new Date().getTime() + config.expAfter;
  const expiration = new Date(expireTime).toISOString();
  const policyString = JSON.stringify({
    expiration,
    conditions: [
      ['content-length-range', 0, config.maxSize],
      ['starts-with', '$key', config.dirPath]
    ]
  });
  const policy = Buffer.from(policyString).toString("base64");
  const signature = crypto.createHmac('sha1', config.accessKeySecret).update(policy).digest("base64");

  return {
    code: 200,
    message: 'ok',
    data: {
      signature,
      policy,
      host,
      ossAccessKeyId: config.accessKeyId,
      key: expireTime,
      success_action_status: 200,
      dirPath: config.dirPath
    }
  }
}

module.exports = {
  sign
};