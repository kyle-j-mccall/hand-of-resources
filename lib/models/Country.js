const { request } = require('../app');
const pool = require('../utils/pool');

class Country {
  id;
  name;
  language;
  population;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.language = row.language;
    this.population = row.population;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM countries');

    return rows.map((row) => new Country(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM countries WHERE id = $1', [
      id,
    ]);
    return new Country(rows[0]);
  }

  static async insert({ name, population, language }) {
    const { rows } = await pool.query(
      `
    INSERT INTO countries (name, population, language)
    VALUES ($1, $2, $3)
    RETURNING *`,
      [name, population, language]
    );
    return new Country(rows[0]);
  }
}

module.exports = { Country };
