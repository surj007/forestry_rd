class Model {
  constructor() {}

  selectWithNoConditions(tableName, column, callback) {
    db.query(`select ${column} from ${tableName}`, [], (err, results, fields) => {
      callback && callback(err, results)
    });
  }
  
  selectWithConditions(tableName, column, format, data, callback) {
    db.query(`select ${column} from ${tableName} where ${format}`, data, (err, results, fields) => {
      callback && callback(err, results)
    });
  }
  
  insert(tableName, column, format, data, callback) {
    db.query(`insert ${tableName} (${column}) values (${format})`, data, (err, results, fields) => {
      callback && callback(err, results)
    });
  };
  
  del(tableName, format, data, callback) {
    db.query(`delete from ${tableName} where ${format}`, data, (err, results, fields) => {
      callback && callback(err, results)
    });
  };
  
  update(tableName, format, conditions, data, callback) {
    db.query(`update ${tableName} set ${format} where ${conditions}`, data, (err, results, fields) => {
      callback && callback(err, results)
    });
  };
}

module.exports = Model;