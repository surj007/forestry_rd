const log4js = require('log4js');

log4js.configure({
  appenders: {
    serverLog: { 
      type: 'dateFile', 
      filename: './log/node',
      pattern: "_yyyy-MM-dd.log",
      alwaysIncludePattern: true,
    }
  },
  categories: {
    default: {
      appenders: ['serverLog'], 
      level: 'all'
    }
  },
  pm2: true
});

global.logger = log4js.getLogger();