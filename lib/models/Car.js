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
    return rows.map((row) => new Car(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM cars
    WHERE id =$1`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Car(rows[0]);
  }
  static async insert({ make, model, year }) {
    const { rows } = await pool.query(
      `INSERT INTO cars (make, model, year)
    values ($1, $2, $3)
    RETURNING *`,
      [make, model, year]
    );
    return new Car(rows[0]);
  }
  static async updateById(id, newAttrs) {
    const car = await Car.getById(id);

    if (!car) return null;

    const updatedData = { ...car, ...newAttrs };

    const { rows } = await pool.query(
      `
    UPDATE cars
    SET make = $2, model = $3, year = $4
    WHERE id = $1
    RETURNING *`,
      [id, updatedData.make, updatedData.model, updatedData.year]
    );
    return new Car(rows[0]);
  }
  static async deleteCar(id) {
    const { rows } = await pool.query(
      `
    DELETE FROM cars
    WHERE id = $1
    RETURNING *`,
      [id]
    );
    return new Car(rows[0]);
  }
}

module.exports = { Car };
