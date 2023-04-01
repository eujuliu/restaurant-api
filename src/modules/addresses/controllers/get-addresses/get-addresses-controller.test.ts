import { app } from 'infra/http/app';
import request from 'supertest';

describe('GET /v1/addresses', () => {
  beforeAll(async () => {
    await request(app).post('/v1/users').send({
      firstName: 'Lucas',
      lastName: 'Doe',
      email: 'lucas@example.com',
      password: '@Test123',
      phone: '(11) 98888-8888',
    });
  });

  it('Should be able to return all user addresses', async () => {
    const createJwt = await request(app).post('/v1/user').send({
      email: 'lucas@example.com',
      password: '@Test123',
    });

    const token = createJwt.get('Set-Cookie')[0].split('; ')[0].split('=')[1];

    await request(app)
      .post('/v1/addresses')
      .send({
        name: 'Home',
        address: '21 Twenty-first Street',
        address2: null,
        district: 'Twenty-first',
        city: 'São Paulo',
        state: 'SP',
        postalCode: '10000-000',
      })
      .set('Authorization', `Bearer ${token}`);

    const addresses = await request(app)
      .get('/v1/addresses')
      .set('Authorization', `Bearer ${token}`);

    expect(addresses.body[0].address).toBe('21 Twenty-first Street');
  });
});
