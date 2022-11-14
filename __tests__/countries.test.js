const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('countries route', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/countries should return a list of countries', async () => {
    const res = await request(app).get('/countries');
    const country1 = res.body.find((char) => (char.id = 1));

    expect(country1).toHaveProperty('name', 'Indonesia');
    expect(country1).toHaveProperty('language', 'Albanian');
    expect(country1).toHaveProperty('population', 919683);
  });

  it('/countries/:id should return country detail', async () => {
    const res = await request(app).get('/countries/3');
    const russia = {
      id: '3',
      name: 'Russia',
      language: 'Bengali',
      population: 103882,
    };

    expect(res.body).toEqual(russia);
  });

  afterAll(() => {
    pool.end();
  });
});
