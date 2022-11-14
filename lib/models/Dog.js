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
    const { rows } = await pool.query('SELECT * FROM dogs');

    return rows.map((row) => new Dog(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from dogs WHERE id = $1', [id]);
    return new Dog(rows[0]);
  }

  static async insert({ name, color, age }) {
    const { rows } = await pool.query(
      `INSERT INTO dogs (name, color, age)
    values ($1, $2, $3)
    RETURNING *`,
      [name, color, age]
    );
    return new Dog(rows[0]);
  }
}

module.exports = { Dog };
