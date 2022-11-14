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
}

module.exports = { Country };
