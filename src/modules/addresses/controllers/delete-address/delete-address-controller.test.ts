import { app } from 'infra/http/app';
import request from 'supertest';
import { v4 as uuid } from 'uuid';

describe('DELETE /v1/address', () => {
  let cookie: string[];
  beforeAll(async () => {
    await request(app).post('/v1/users').send({
      firstName: 'Julia',
      lastName: 'Doe',
      email: 'julia@example.com',
      password: '@Test123',
      phone: '(11) 98888-8888',
    });

    const createJwt = await request(app).get('/v1/user').send({
      email: 'julia@example.com',
      password: '@Test123',
    });

    cookie = createJwt.get('Set-Cookie');

    await request(app)
      .post('/v1/addresses')
      .send({
        name: 'Home',
        address: '23, Twenty-third Street',
        address2: null,
        district: 'Twenty-third',
        city: 'São Paulo',
        state: 'SP',
        postalCode: '10000-000',
      })
      .set('Cookie', cookie);
  });
  it('Should be able to delete an existing address', async () => {
    const addresses = await request(app)
      .get('/v1/addresses')
      .set('Cookie', cookie);

    const response = await request(app)
      .delete('/v1/address')
      .send({
        id: addresses.body[0].id as string,
      })
      .set('Cookie', cookie);

    expect(response.status).toBe(202);
  });

  it('Should be not able to delete a non existing address', async () => {
    const response = await request(app)
      .delete('/v1/address')
      .send({
        id: uuid(),
      })
      .set('Cookie', cookie);

    expect(response.status).toBe(400);
  });
});
