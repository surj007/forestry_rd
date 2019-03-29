global.$validate = (rules) => {
  return function (req, res, next) {
    let message = [];
    // i: query、body
    for (let i in rules) {
      // j 字段名
      for (let j in rules[i]) {
        // item函数名
        rules[i][j].forEach((item) => {
          let result = eval(`${item}(req[i][j], j)`);
          if (result) {
            message.push(result);
          }
        });
      }
    }
    if (message.length === 0) {
      next();
    }
    else {
      res.status(400).json({
        code: 2,
        message: '参数错误',
        data: message.join(', ')
      });
    }
  }
}

function required (data, field) {
  if (data !== '' && !data) {
    return `缺少${field}字段`;
  }
  return null;
}

function number (data, field) {
  if (typeof data !== 'number') {
    return `${field}字段应为number类型`;
  }
  return null;
}

function notBlank (data, field) {
  if (typeof data === 'string' && data.length !== 0) {
    return null;
  }
  return `${field}字段应为非空字符串`;
}

function array (data, field) {
  if (data instanceof Array) {
    return null;
  }
  return `${field}字段应为数组`;
}