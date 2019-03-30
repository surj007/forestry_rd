const thrift =require('thrift');

const rpcService = require('./TestRpcService');
const rpcTypes = require('./TestRpcService_types');

function connectRpc () {
  const connection = thrift.createConnection('127.0.0.1', 8080, {
    transport : thrift.TBufferedTransport,
    protocol : thrift.TBinaryProtocol
  });
  const client = thrift.createClient(rpcService, connection);
  
  connection.on('error', function(e) {
      console.log('testRpcService err: ' + e);
      // setTimeout(connectRpc, 2000);
  });
  
  global.rpc.testRpcService.console = (data) => {
    return new Promise((resolve) => {
      client.console(data, (err, res) => {
        console.log(res);
        resolve({
          err,
          result: res
        });
      });
    });
  };
}

connectRpc();