const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('dogs route', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/dogs should return a list of dogs', async () => {
    const resp = await request(app).get('/dogs');
    const dog1 = resp.body.find((char) => (char.id = 1));
    expect(dog1).toHaveProperty('name', 'Lark');
    expect(dog1).toHaveProperty('age', 8);
    expect(dog1).toHaveProperty('color', 'Mauv');
  });

  it('/dogs/:id should return a dog detail', async () => {
    const resp = await request(app).get('/dogs/2');
    const jason = {
      id: '2',
      name: 'Jason',
      color: 'Purple',
      age: 5,
    };
    expect(resp.body).toEqual(jason);
  });

  it('POST /dogs should create a new dog in the database', async () => {
    const newDog = {
      name: 'Fluffy',
      color: 'black',
      age: 2,
    };
    const resp = await request(app).post('/dogs').send(newDog);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newDog,
    });
  });
  it('PUT /dogs/:id should update an existing dog', async () => {
    const resp = await request(app).put('/dogs/2').send({
      color: 'pink',
    });

    expect(resp.status).toBe(200);
    expect(resp.body.color).toBe('pink');
  });
  it('DELETE /dogs/:id should delete a dog', async () => {
    const resp = await request(app).delete('/dogs/2');
    expect(resp.status).toBe(200);

    const dogResp = await request(app).get('/dogs/2');
    expect(dogResp.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
