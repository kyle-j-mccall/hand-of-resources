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
  static async insert({ title, seasons, genre }) {
    const { rows } = await pool.query(
      `INSERT INTO shows (title, seasons, genre)
    values ($1, $2, $3)
    RETURNING *`,
      [title, seasons, genre]
    );
    return new Show(rows[0]);
  }
  static async updateById(id, newAttrs) {
    const show = await Show.getById(id);

    if (!show) return null;

    const updatedData = { ...show, ...newAttrs };

    const { rows } = await pool.query(
      `
    UPDATE shows
    SET title = $2, seasons = $3, genre = $4
    WHERE id = $1
    RETURNING *`,
      [id, updatedData.title, updatedData.seasons, updatedData.genre]
    );

    return new Show(rows[0]);
  }

  static async deleteShow(id) {
    const { rows } = await pool.query(
      `
    DELETE FROM shows
    WHERE id = $1
    RETURNING *`,
      [id]
    );

    return new Show(rows[0]);
  }
}

module.exports = { Show };
