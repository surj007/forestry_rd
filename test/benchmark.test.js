const app = require('../src/app.js');
const testApi = require('./testApi/index.js');

let cookie = null;
app.listen(80, () => {
  testApi.login().then(res => {
    cookie = res.headers['set-cookie'][0];
  
    // 循环api文件夹，请求所有接口
    benchmarkApi(testApi.login);
  });
});

function benchmarkApi (fn) {
  let timeArr = [];
  let cnt = 0;

  for (let i = 0; i < 10; i++) {
    timeArr[i] = Date.now();

    fn(cookie).then(() => {
      timeArr[i] = Date.now() - timeArr[i];

      cnt++;

      if (cnt === 10) {
        // 求出发送这么多次请求时间的平均值和方差
        console.log(fn.name, timeArr);
      }
    });
  }
}