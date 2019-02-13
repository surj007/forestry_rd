class Model {
  constructor() {}

  async selectWithNoConditions(tableName, column) {
    let { err, results, fields } = await db.query(`select ${column} from ${tableName}`, []);

    return { err, results };
  }

  async selectWithConditions(tableName, column, conditions, data) {
    let { err, results, fields } = await db.query(`select ${column} from ${tableName} where ${conditions}`, data);

    return { err, results };
  }

  async insert(tableName, column, format, data) {
    let { err, results, fields } = await db.query(`insert ${tableName} (${column}) values ${format}`, data);

    return { err, results };
  }

  async del(tableName, conditions, data) {
    let { err, results, fields } = await db.query(`delete from ${tableName} where ${conditions}`, data);

    return { err, results };
  }

  async update(tableName, format, conditions, data) {
    let { err, results, fields } = await db.query(`update ${tableName} set ${format} where ${conditions}`, data);

    return { err, results };
  }
}

module.exports = Model;
