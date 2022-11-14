const pool = require('../utils/pool');

class Car {
  id;
  make;
  model;
  year;

  constructor(row) {
    this.id = row.id;
    this.make = row.make;
    this.model = row.model;
    this.year = row.year;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM cars');
    console.log('carrr', rows);
    return rows.map((row) => new Car(row));
  }
}

module.exports = { Car };
