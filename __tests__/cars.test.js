const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('cars route', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it.skip('/cars should return a list of cars', async () => {
    const resp = await request(app).get('/cars');
    const car1 = resp.body.find((char) => (char.id = 1));
    expect(resp.status).toBe(200);
    expect(car1).toHaveProperty('make', 'Kia');
    expect(car1).toHaveProperty('model', 'Rio');
    expect(car1).toHaveProperty('year', 2017);
  });
  it.skip('/cars/:id should return a car detail', async () => {
    const resp = await request(app).get('/cars/2');
    const toyota = {
      id: '2',
      make: 'Toyota',
      model: 'Tacoma',
      year: 2022,
    };
    expect(resp.body).toEqual(toyota);
  });
  it.skip('POST /cars should create a new car in the database', async () => {
    const newCar = {
      make: 'Fluffy',
      model: 'black',
      year: 2018,
    };
    const resp = await request(app).post('/cars').send(newCar);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newCar,
    });
  });
  it.skip('PUT /cars/:id should update an existing car', async () => {
    const resp = await request(app).put('/cars/2').send({
      model: 'Supra',
    });

    expect(resp.status).toBe(200);
    expect(resp.body.model).toBe('Supra');
  });
  it.skip('DELETE /cars/:id should delete a car', async () => {
    const resp = await request(app).delete('/cars/2');
    expect(resp.status).toBe(200);

    const carResp = await request(app).get('/cars/2');
    expect(carResp.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
