const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('books route', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/books should return a list of books', async () => {
    const resp = await request(app).get('/books');
    const dog1 = resp.body.find((char) => (char.id = 1));
    expect(dog1).toHaveProperty('title', 'Business-focused');
    expect(dog1).toHaveProperty('author', 'Riki Jessopp');
    expect(dog1).toHaveProperty('released', expect.any(String));
  });
  it('/books/:id should return a dog detail', async () => {
    const resp = await request(app).get('/books/2');
    const expanded = {
      id: '2',
      title: 'Expanded',
      author: 'Alvan Tesyro',
      released: expect.any(String),
    };
    expect(resp.body).toEqual(expanded);
  });
  it('POST /books should create a new book in the database', async () => {
    const newBook = {
      title: 'Harry Potter',
      author: 'J.K Rowling',
      released: '1995-07-08T07:00:00.000Z',
    };
    const resp = await request(app).post('/books').send(newBook);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newBook,
    });
  });
  it('PUT /books/:id should update an existing dog', async () => {
    const resp = await request(app).put('/books/2').send({
      title: 'wonderful book',
    });

    expect(resp.status).toBe(200);
    expect(resp.body.title).toBe('wonderful book');
  });
  it('DELETE /books/:id should delete a book', async () => {
    const resp = await request(app).delete('/books/2');
    expect(resp.status).toBe(200);

    const bookResp = await request(app).get('/books/2');
    expect(bookResp.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
