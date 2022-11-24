import { app } from 'infra/http/app';
import request from 'supertest';

describe('GET /v1/user (controller)', () => {
  it('Should return an exiting user', async () => {
    await request(app).post('/v1/users').send({
      firstName: 'Hanna',
      lastName: 'Doe',
      email: 'hanna@example.com',
      password: '@Test123',
      phone: '(11) 98888-8888',
    });

    const response = await request(app).get('/v1/user').send({
      email: 'hanna@example.com',
      password: '@Test123',
    });

    const cookie = response.get('Set-Cookie') as string[];

    expect(response.status).toBe(200);
    expect(cookie[0].slice(0, 10)).toBe('session_id');
  });

  it('Should not return a non existing user', async () => {
    const response = await request(app).get('/v1/user').send({
      email: 'test@test.com',
      password: '@Test123',
    });

    expect(response.status).toBe(400);
  });
});
