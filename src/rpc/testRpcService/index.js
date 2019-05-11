const thrift = require('thrift');

const rpcService = require('./TestRpcService');
const rpcTypes = require('./TestRpcService_types');

function connectRpc () {
  const connection = thrift.createConnection('127.0.0.1', 8080, {
    transport : thrift.TBufferedTransport,
    protocol : thrift.TBinaryProtocol
  });

  connection.on('error', function(err) {
    console.log('testRpcService err: ' + err);
    setTimeout(connectRpc, 2000);
  });

  global.rpc.testRpcClient = thrift.createClient(rpcService, connection);
}

connectRpc();