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
    if (rows.length === 0) {
      return null;
    }
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

  static async updateById(id, newAttrs) {
    const country = await Country.getById(id);
    if (!country) return null;
    const updatedData = {
      ...country,
      ...newAttrs,
    };
    const { rows } = await pool.query(
      `
    UPDATE countries
    SET name = $2, language = $3, population = $4
    WHERE id = $1
    RETURNING *`,
      [id, updatedData.name, updatedData.language, updatedData.population]
    );

    return new Country(rows[0]);
  }

  static async deleteCountry(id) {
    const { rows } = await pool.query(
      `
    DELETE FROM countries
    WHERE id = $1
    RETURNING *`,
      [id]
    );
    console.log('rowssss', rows);
    return new Country(rows[0]);
  }
}

module.exports = { Country };
