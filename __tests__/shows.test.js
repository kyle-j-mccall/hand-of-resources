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
  it('POST /shows should create a new show in the database', async () => {
    const newShow = {
      title: 'Rings of Power',
      seasons: 1,
      genre: 'Fantasy',
    };
    const resp = await request(app).post('/shows').send(newShow);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newShow,
    });
  });
  it('PUT /shows/:id should update an existing show', async () => {
    const resp = await request(app).put('/shows/2').send({
      seasons: 5,
    });

    expect(resp.status).toBe(200);
    expect(resp.body.seasons).toBe(5);
  });

  afterAll(() => {
    pool.end();
  });
});
