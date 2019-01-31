const SMSClient = require('@alicloud/sms-sdk');

const { KEY_ACCESSKEYID, KEY_SECRETACCESSKEY } = require('../util/constant');

class SmsService {
  constructor() {
    this.smsClient = new SMSClient({KEY_ACCESSKEYID, KEY_SECRETACCESSKEY});
  }

  sendIdentifyingCode(phoneNum) {
    return smsClient.sendSMS({
      PhoneNumbers: phoneNum,
      SignName: '大师链',
      TemplateCode: 'SMS_151231743',
      TemplateParam: '{"code":"12345"}'
    });
  }
}

exports.SmsService = SmsService;