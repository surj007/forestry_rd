const SMSClient = require('@alicloud/sms-sdk')

const accessKeyId = 'LTAIUR8UPrDx2ABa'
const secretAccessKey = 'gEpafGvrP0uaLwNSH1LZhloIpNgTcv'

let smsClient = new SMSClient({accessKeyId, secretAccessKey})

function sendSms(phoneNum) {
  return smsClient.sendSMS({
    PhoneNumbers: phoneNum,
    SignName: '大师链',
    TemplateCode: 'SMS_151231743',
    TemplateParam: '{"code":"12345"}'
  });
}

module.exports = {
  sendSms
};