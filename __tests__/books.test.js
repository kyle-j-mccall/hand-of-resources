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

  afterAll(() => {
    pool.end();
  });
});
