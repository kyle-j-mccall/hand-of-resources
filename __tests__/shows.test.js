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
  it('/shows/:id should return a show detail', async () => {
    const resp = await request(app).get('/shows/2');
    const theOffice = {
      id: '2',
      title: 'The Office',
      seasons: 9,
      genre: 'Comedy',
    };
    expect(resp.body).toEqual(theOffice);
  });

  afterAll(() => {
    pool.end();
  });
});
