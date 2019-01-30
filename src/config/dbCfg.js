// const mysql  = require('mysql');

// const envConfig = require('./envCfg');

// const connection = mysql.createConnection({     
//   host: envConfig.dbHost,
//   user: envConfig.dbUser,
//   password: envConfig.dbPassword,
//   port: '3306',
//   database: 'forestry'
// });

// connection.connect((err) => {
//   if(err){        
//     console.log('connect db err: ' + err);
//     return;
//   }
//   console.log('connect db success');
// });  

// global.db = connection;


const mysql  = require('mysql');

const envConfig = require('./envCfg');

const pool = mysql.createPool({     
  host: envConfig.dbHost,
  user: envConfig.dbUser,
  password: envConfig.dbPassword,
  port: '3306',
  database: 'forestry'
});

function query(sql, params, callback) {
  pool.getConnection((err, connection) => {
    if(err) {
      callback && callback(err, [], []);
      return;
    }
    connection.query(sql, params, (err, results, fields) => {
      connection.release();
      //pool.releaseConnection(connection);
      callback && callback(err, results, fields);
    });
  });
};

global.db = {
  query
};