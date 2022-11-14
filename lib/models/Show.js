const pool = require('../utils/pool');

class Show {
  id;
  title;
  seasons;
  genre;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.seasons = row.seasons;
    this.genre = row.genre;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM shows');

    return rows.map((row) => new Show(row));
  }
}

module.exports = { Show };
