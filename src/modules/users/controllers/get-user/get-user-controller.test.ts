import { app } from 'infra/http/app';
import request from 'supertest';

describe('GET /users (controller)', () => {
  it('Should return an exiting user', async () => {
    await request(app).post('/users').send({
      firstName: 'Jonathan',
      lastName: 'Doe',
      email: 'jonathan@example.com',
      password: '@Test123',
      phone: '(111) 111-1111',
    });

    const response = await request(app).get('/users').send({
      email: 'jonathan@example.com',
      password: '@Test123',
    });

    expect(response.status).toBe(200);
  });

  it('Should not return a non existing user', async () => {
    const response = await request(app).get('/users').send({
      email: 'test@test.com',
      password: '@Test123',
    });

    expect(response.status).toBe(400);
  });
});
