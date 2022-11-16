import { app } from 'infra/http/app';
import request from 'supertest';

describe('GET /login (controller)', () => {
  it('Should return an exiting user', async () => {
    await request(app).post('/register').send({
      firstName: 'Hanna',
      lastName: 'Doe',
      email: 'hanna@example.com',
      password: '@Test123',
      phone: '(111) 111-1111',
    });

    const response = await request(app).get('/login').send({
      email: 'hanna@example.com',
      password: '@Test123',
    });

    expect(response.status).toBe(200);
  });

  it('Should not return a non existing user', async () => {
    const response = await request(app).get('/login').send({
      email: 'test@test.com',
      password: '@Test123',
    });

    expect(response.status).toBe(400);
  });
});
