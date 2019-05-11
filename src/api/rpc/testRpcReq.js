function console (data) {
  return new Promise((resolve, reject) => {
    rpc.testRpc.console(data, (err, res) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

exports.console = console;