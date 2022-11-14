const pool = require('../utils/pool');

class Book {
  id;
  title;
  author;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.author = row.author;
    this.released = row.released;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM books2');

    return rows.map((row) => new Book(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from books2 WHERE id = $1', [
      id,
    ]);
    if (rows.length === 0) {
      return null;
    }
    return new Book(rows[0]);
  }
}

module.exports = { Book };
