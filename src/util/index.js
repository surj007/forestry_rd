const crypto = require('crypto');

const { KEY_ACCESSKEYID, KEY_SECRETACCESSKEY, OSS_BUCKET, OSS_REGION } = require('./constant');

exports.cryptoBySha256 = (data) => {
  return crypto.createHash('sha256').update(data).digest('base64').toString()
};

exports.ossSign = () => {
  const config = {
    dirPath: 'image/',
    expAfter: 60000,
    maxSize: 1048576000
  };
  
  const host = `http://${OSS_BUCKET}.${OSS_REGION}.aliyuncs.com`;
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
  const signature = crypto.createHmac('sha1', KEY_SECRETACCESSKEY).update(policy).digest("base64");

  return {
    signature,
    policy,
    host,
    ossAccessKeyId: KEY_ACCESSKEYID,
    key: expireTime,
    success_action_status: 200,
    dirPath: config.dirPath
  };
};

exports.isParamNull = (req, type, fields) => {
  for(let i of fields) {
    if(req[type][i] == undefined) {
      return i;
    }
  }

  return false;
}