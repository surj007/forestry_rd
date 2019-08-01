// redis能够掉线自动重连
const redis = require('redis');

const redisClient = redis.createClient({
  /*
  host
  port
  url
  password
  */
  retry_strategy: (options) => {
    if (options.error.code === 'ECONNREFUSED') { 
      console.error('redis连接被拒绝');
      logger.error('redis连接被拒绝');
    }
    // reconnect after 退避算法
    return Math.max(options.attempt * 100, 3000);
  }
});

redisClient.on('ready', (err) => {
  if (err) {        
    console.log('connect redis err: ' + err);
    return;
  }
  console.log('connect redis success');
});

redisClient.on('error', (err) => {
  console.log('redis err: ' + err);
});

global.redisClient = redisClient;