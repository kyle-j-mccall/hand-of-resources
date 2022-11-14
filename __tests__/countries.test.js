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
    expect(res.status).toBe(200);
    expect(country1).toHaveProperty('name', 'Indonesia');
    expect(country1).toHaveProperty('language', 'Albanian');
    expect(country1).toHaveProperty('population', 919683);
  });

  it('/countries/:id should return country detail', async () => {
    const resp = await request(app).get('/countries/3');
    const russia = {
      id: '3',
      name: 'Russia',
      language: 'Bengali',
      population: 103882,
    };

    expect(resp.body).toEqual(russia);
  });
  it('POST /countries should return a new country in the database', async () => {
    const newCountry = {
      name: 'U.S.A',
      population: 330000000,
      language: 'English',
    };
    const resp = await request(app).post('/countries').send(newCountry);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newCountry,
    });
  });
  it('PUT /countries/:id should update existing country', async () => {
    const resp = await request(app).put('/countries/2').send({
      language: 'Elvish',
    });
    console.log(resp.body);
    expect(resp.status).toBe(200);
    expect(resp.body.language).toBe('Elvish');
  });
  afterAll(() => {
    pool.end();
  });
});
