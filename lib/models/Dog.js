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
    if (rows.length === 0) {
      return null;
    }
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

  static async updateById(id, newAttrs) {
    const dog = await Dog.getById(id);

    if (!dog) return null;

    const updatedData = { ...dog, ...newAttrs };

    const { rows } = await pool.query(
      `
    UPDATE dogs
    SET name = $2, color = $3, age = $4
    WHERE id = $1
    RETURNING *`,
      [id, updatedData.name, updatedData.color, updatedData.age]
    );

    return new Dog(rows[0]);
  }

  static async deleteDog(id) {
    const { rows } = await pool.query(
      `
    DELETE FROM dogs
    WHERE id = $1
    RETURNING *`,
      [id]
    );
    return new Dog(rows[0]);
  }
}

module.exports = { Dog };
