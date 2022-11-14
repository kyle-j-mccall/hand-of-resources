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
  static async getById(id) {
    const { rows } = await pool.query('SELECT * from shows WHERE id = $1', [
      id,
    ]);
    if (rows.length === 0) {
      return null;
    }
    return new Show(rows[0]);
  }
}

module.exports = { Show };
