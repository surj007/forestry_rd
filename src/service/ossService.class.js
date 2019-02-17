let OSS = require('ali-oss');
const crypto = require('crypto');

const { KEY_ACCESSKEYID, KEY_SECRETACCESSKEY, OSS_BUCKET, OSS_REGION } = require('../util/constant');

let ossClient = new OSS({
  region: OSS_REGION,
  accessKeyId: KEY_ACCESSKEYID,
  accessKeySecret: KEY_SECRETACCESSKEY,
  bucket: OSS_BUCKET
});

class OssService {
  constructor() {}

  getSign(path) {
    const config = {
      dirPath: `image/${path}/`,
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
    const Signature = crypto.createHmac('sha1', KEY_SECRETACCESSKEY).update(policy).digest("base64");
  
    return {
      Signature,
      policy,
      host,
      ossAccessKeyId: KEY_ACCESSKEYID,
      key: expireTime,
      success_action_status: 200,
      dirPath: config.dirPath
    };
  }

  getSignatureUrl(path, fileName) {
    return ossClient.signatureUrl(path + fileName, {
      expires: 3110400000
    });
  }
}

module.exports = OssService;

// let o = new OssService();
// console.log(o.getSignatureUrl('image/admin/', '11.png'));
// console.log(o.getSignatureUrl('image/admin/', '22.jpg'));