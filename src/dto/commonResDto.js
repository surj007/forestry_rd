exports.commonRes = (code, msg, data) => {
  return {
    code: code,
    message: msg,
    data
  }
};