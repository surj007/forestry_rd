const redis = require('redis');
const client = redis.createClient();

client.on('ready', (err) => {
  if(err){        
    console.log('connect redis err: ' + err);
    
    return;
  }
  console.log('connect redis success');
});

global.redisClient = client;