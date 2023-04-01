import { app } from 'infra/http/app';
import request from 'supertest';
import { v4 as uuid } from 'uuid';

describe('DELETE /v1/address TEST1', () => {
  let token: string;
  beforeAll(async () => {
    await request(app).post('/v1/users').send({
      firstName: 'Julia',
      lastName: 'Doe',
      email: 'julia@example.com',
      password: '@Test123',
      phone: '(11) 98888-8888',
    });

    const createJwt = await request(app).post('/v1/user').send({
      email: 'julia@example.com',
      password: '@Test123',
    });

    token = createJwt.get('Set-Cookie')[0].split('; ')[0].split('=')[1];

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
      .set('Authorization', `Bearer ${token}`);
  });
  it('Should be able to delete an existing address', async () => {
    const addresses = await request(app)
      .get('/v1/addresses')
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .delete('/v1/address')
      .send({
        id: addresses.body[0].id as string,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(202);
  });

  it('Should be not able to delete a non existing address', async () => {
    const response = await request(app)
      .delete('/v1/address')
      .send({
        id: uuid(),
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
