const pool = require('../utils/pool');

class Dog {
  id;
  name;
  color;
  age;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
    this.color = row.color;
  }

  static async getAll() {
    const { rows } = await pool.query('select * from dogs');
    console.log(rows);
    return rows.map((row) => new Dog(row));
  }
}

module.exports = { Dog };
