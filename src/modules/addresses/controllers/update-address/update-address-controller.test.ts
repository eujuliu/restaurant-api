import { app } from 'infra/http/app';
import request from 'supertest';
import { v4 as uuid } from 'uuid';

describe('PUT /v1/address (controller)', () => {
  let token: string;
  beforeAll(async () => {
    await request(app).post('/v1/users').send({
      firstName: 'Ana',
      lastName: 'Doe',
      email: 'ana@example.com',
      password: '@Test123',
      phone: '(11) 98888-8888',
    });

    const createJwt = await request(app).post('/v1/user').send({
      email: 'ana@example.com',
      password: '@Test123',
    });

    token = createJwt.get('Set-Cookie')[0].split('; ')[0].split('=')[1];

    await request(app)
      .post('/v1/addresses')
      .send({
        name: 'Home',
        address: '222, Twenty-second Street',
        address2: null,
        district: 'Twenty-second',
        city: 'São Paulo',
        state: 'SP',
        postalCode: '10000-000',
      })
      .set('Authorization', `Bearer ${token}`);
  });

  it('Should be able to update an address', async () => {
    const addresses = await request(app)
      .get('/v1/addresses')
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .put('/v1/address')
      .send({
        id: addresses.body[0].id as string,
        name: 'Work',
        address: '22, Twenty-second Street',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('Should be not able to update a non existing address', async () => {
    const response = await request(app)
      .put('/v1/address')
      .send({
        id: uuid(),
        name: 'Work',
        address: '22, Twenty-second Street',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
