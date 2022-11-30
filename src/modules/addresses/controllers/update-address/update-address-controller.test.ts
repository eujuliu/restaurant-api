import { app } from 'infra/http/app';
import request from 'supertest';
import { v4 as uuid } from 'uuid';

describe('PUT /v1/address (controller)', () => {
  let cookie: string[];
  let createJwtToken: request.Response;
  beforeAll(async () => {
    await request(app).post('/v1/users').send({
      firstName: 'Ana',
      lastName: 'Doe',
      email: 'ana@example.com',
      password: '@Test123',
      phone: '(11) 98888-8888',
    });

    createJwtToken = await request(app).get('/v1/user').send({
      email: 'ana@example.com',
      password: '@Test123',
    });

    cookie = createJwtToken.get('Set-Cookie') as string[];

    await request(app)
      .post('/v1/addresses')
      .send({
        name: 'Home',
        address: 'R. Caranguejo, 113',
        address2: null,
        district: 'Perequê',
        city: 'Ilhabela',
        state: 'SP',
        postalCode: '11630-000',
      })
      .set('Cookie', cookie);
  });

  it('Should be able to update an address', async () => {
    const addresses = await request(app)
      .get('/v1/addresses')
      .set('Cookie', cookie);
    const response = await request(app)
      .put('/v1/address')
      .send({
        id: addresses.body[0].id as string,
        name: 'Work',
        address: 'Rua Ana Virtebo de Souza, 311',
      })
      .set('Cookie', cookie);

    expect(response.status).toBe(200);
  });

  it('Should be not able to update a non existing address', async () => {
    const response = await request(app)
      .put('/v1/address')
      .send({
        id: uuid(),
        name: 'Work',
        address: 'Rua Ana Virtebo de Souza, 311',
      })
      .set('Cookie', cookie);

    expect(response.status).toBe(404);
  });
});
