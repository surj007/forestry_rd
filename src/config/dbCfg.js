// const mysql  = require('mysql');

// const envConfig = require('./envCfg');

// function connectMysql () {
//   const connection = mysql.createConnection({
//     host: envConfig.dbHost,
//     user: envConfig.dbUser,
//     password: envConfig.dbPassword,
//     port: '3306',
//     database: 'forestry'
//   });
  
//   connection.connect((err) => {
//     if (err) {
//       console.log('connect db err: ' + err);
//       // 连接错误，2秒后重试
//       setTimeout(connectMysql, 2000);
//       return;
//     }
//     console.log('connect db success');

//     global.db = connection;
//   });

//   connection.on('error', (err) => {
//     // 如果是连接断开，自动重新连接
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//       connectMysql();
//     } 
//     console.log('db err: ' + err);
//   });
// }

// connectMysql();

const mysql  = require('mysql');

const envConfig = require('./envCfg');
// 也可以在一开始创建好不同库的连接
let poolListObj = {
  forestry: mysql.createPool({
    host: envConfig.dbHost,
    user: envConfig.dbUser,
    password: envConfig.dbPassword,
    port: '3306',
    database: 'forestry'
  })
};
// const pool = mysql.createPool({
//   host: envConfig.dbHost,
//   user: envConfig.dbUser,
//   password: envConfig.dbPassword,
//   port: '3306',
//   database: 'forestry'
// });

function query (sql, params, dbName = 'forestry') {
  if (poolListObj[dbName] === undefined) {
    poolListObj[dbName] = mysql.createPool({
      host: envConfig.dbHost,
      user: envConfig.dbUser,
      password: envConfig.dbPassword,
      port: '3306',
      database: dbName
    })
  }

  return new Promise((resolve) => {
    poolListObj[dbName].getConnection((err, connection) => {
      if (err) {
        logger.error('get mysql connection err: ' + err);
        resolve({
          err,
          results: [],
          fields: []
        });
      }
      else {
        connection.query(sql, params, (err, results, fields) => {
          connection.release();
          resolve({ err, results, fields });
        });
      }
    });
  });
};

global.db = {
  query
};
