import { app } from 'infra/http/app';
import request from 'supertest';

describe('POST /v1/addresses (controller)', () => {
  beforeAll(async () => {
    await request(app).post('/v1/users').send({
      firstName: 'Jennifer',
      lastName: 'Doe',
      email: 'jennifer@example.com',
      password: '@Test123',
      phone: '(11) 98888-8888',
    });
  });

  it('Should be able to create a new address', async () => {
    const getUserResponse = await request(app).post('/v1/user').send({
      email: 'jennifer@example.com',
      password: '@Test123',
    });

    const token = getUserResponse
      .get('Set-Cookie')[0]
      .split('; ')[0]
      .split('=')[1];

    const response = await request(app)
      .post('/v1/addresses')
      .send({
        name: 'Home',
        address: '20, Twentieth Street',
        address2: null,
        district: 'Twentieth',
        city: 'São Paulo',
        state: 'SP',
        postalCode: '10000-000',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
  });

  it('Should be not able to add an address if the cookie does not exist', async () => {
    const response = await request(app).post('/v1/addresses').send({
      name: 'Home',
      address: '20, Twentieth Street',
      address2: null,
      district: 'Twentieth',
      city: 'São Paulo',
      state: 'SP',
      postalCode: '10000-000',
    });

    expect(response.status).toBe(401);
  });
});
