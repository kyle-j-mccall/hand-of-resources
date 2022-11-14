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
  static async insert({ title, author, released }) {
    const { rows } = await pool.query(
      `INSERT INTO books2 (title, author, released)
    values ($1, $2, $3)
    RETURNING *`,
      [title, author, released]
    );
    return new Book(rows[0]);
  }
  static async updateById(id, newAttrs) {
    const book = await Book.getById(id);

    if (!book) return null;

    const updatedData = { ...book, ...newAttrs };

    const { rows } = await pool.query(
      `
    UPDATE books2
    SET title = $2, author = $3, released = $4
    WHERE id = $1
    RETURNING *`,
      [id, updatedData.title, updatedData.author, updatedData.released]
    );

    return new Book(rows[0]);
  }
  static async deleteBook(id) {
    const { rows } = await pool.query(
      `
    DELETE FROM books2
    WHERE id = $1
    RETURNING *`,
      [id]
    );
    return new Book(rows[0]);
  }
}

module.exports = { Book };
