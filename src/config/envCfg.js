const devConfig = {
  dbHost: 'localhost',
  dbUser: 'root',
  dbPassword: '123456'
};
const prodConfig = {
  dbHost: 'rm-m5e3585634j6ktw7v.mysql.rds.aliyuncs.com',
  dbUser: 'srj',
  dbPassword: 't2z90807!'
};

if(process.env.NODE_ENV == 'prod') {
  module.exports = prodConfig;
}
else {
  module.exports = devConfig;
}