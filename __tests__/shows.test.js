const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('shows route', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/shows should return a list of shows', async () => {
    const resp = await request(app).get('/shows');
    const dog1 = resp.body.find((char) => (char.id = 1));
    expect(dog1).toHaveProperty('title', 'Breaking Bad');
    expect(dog1).toHaveProperty('seasons', 7);
    expect(dog1).toHaveProperty('genre', 'Drama');
  });

  afterAll(() => {
    pool.end();
  });
});
