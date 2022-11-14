const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('countries route', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it.skip('/countries should return a list of countries', async () => {
    const res = await request(app).get('/countries');
    const country1 = res.body.find((char) => (char.id = 1));
    expect(res.status).toBe(200);
    expect(country1).toHaveProperty('name', 'Indonesia');
    expect(country1).toHaveProperty('language', 'Albanian');
    expect(country1).toHaveProperty('population', 919683);
  });

  it.skip('/countries/:id should return country detail', async () => {
    const resp = await request(app).get('/countries/3');
    const russia = {
      id: '3',
      name: 'Russia',
      language: 'Bengali',
      population: 103882,
    };

    expect(resp.body).toEqual(russia);
  });
  it.skip('POST /countries should return a new country in the database', async () => {
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
  it.skip('PUT /countries/:id should update existing country', async () => {
    const resp = await request(app).put('/countries/2').send({
      language: 'Elvish',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.language).toBe('Elvish');
  });

  it.skip('DELETE /countries/:id should delete a country', async () => {
    const resp = await request(app).delete('/countries/2');
    expect(resp.status).toBe(200);

    const countryResp = await request(app).get('/countries/2');
    expect(countryResp.body).toBe(null);
  });
  afterAll(() => {
    pool.end();
  });
});
