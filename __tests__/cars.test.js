const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('countries route', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/cars should return a list of cars', async () => {
    const resp = await request(app).get('/cars');
    const car1 = resp.body.find((char) => (char.id = 1));
    expect(resp.status).toBe(200);
    expect(car1).toHaveProperty('make', 'Kia');
    expect(car1).toHaveProperty('model', 'Rio');
    expect(car1).toHaveProperty('year', 2017);
  });
  it('/cars/:id should return a dog detail', async () => {
    const resp = await request(app).get('/cars/2');
    const toyota = {
      id: '2',
      make: 'Toyota',
      model: 'Tacoma',
      year: 2022,
    };
    expect(resp.body).toEqual(toyota);
  });
  afterAll(() => {
    pool.end();
  });
});
