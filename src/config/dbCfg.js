const mysql  = require('mysql');

const envConfig = require('./envCfg');

const connection = mysql.createConnection({     
  host: envConfig.dbHost,
  user: envConfig.dbUser,
  password: envConfig.dbPassword,
  port: '3306',
  database: 'forestry'
});

connection.connect((err) => {
  if(err){        
    console.log('connect db err: ' + err);
    return;
  }
  console.log('connect db success');
});  

global.db = connection;