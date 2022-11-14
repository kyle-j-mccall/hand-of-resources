const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('dogs route', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/dogs should return a list of dogs', async () => {
    const res = await request(app).get('/dogs');
    const dog1 = res.body.find((char) => (char.id = 1));
    expect(dog1).toHaveProperty('name', 'Lark');
    expect(dog1).toHaveProperty('age', 8);
    expect(dog1).toHaveProperty('color', 'Mauv');
  });

  it('/dogs/:id should return a dog detail', async () => {
    const res = await request(app).get('/dogs/2');
    const jason = {
      id: 2,
      name: 'Jason',
      color: 'Purple',
      age: 5,
    };
    expect(res.body).toEqual(jason);
  });
  afterAll(() => {
    pool.end();
  });
});
