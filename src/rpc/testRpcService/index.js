const thrift =require('thrift');

const rpcService = require('./TestRpcService');
const rpcTypes = require('./TestRpcService_types');

const connection = thrift.createConnection('127.0.0.1', 8080, {
    transport : thrift.TBufferedTransport,
    protocol : thrift.TBinaryProtocol
});
const client = thrift.createClient(rpcService, connection);

connection.on("error", function(e) {
    console.log("testRpcService error: " + e);
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