import { app } from 'infra/http/app';
import request from 'supertest';
import { CreateUserBodyProps } from '../create-user/create-user-controller';

describe('PUT /v1/user/security (controller)', () => {
  let userData: CreateUserBodyProps;
  let returnJwt: request.Response;

  beforeAll(async () => {
    userData = {
      firstName: 'Jonathan',
      lastName: 'Doe',
      email: 'jonathan@example.com',
      password: '@Test123',
      phone: '(11) 98888-8888',
    };

    await request(app).post('/v1/users').send(userData);

    returnJwt = await request(app).post('/v1/user').send({
      email: 'jonathan@example.com',
      password: '@Test123',
    });
  });

  it('Should be able to change the user password', async () => {
    const token = returnJwt.get('Set-Cookie')[0].split('; ')[0].split('=')[1];

    const response = await request(app)
      .put('/v1/user/security')
      .send({
        oldPassword: userData.password,
        newPassword: '@Other321',
        confirmNewPassword: '@Other321',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('Should be not able to change the password, if the old password is wrong', async () => {
    const token = returnJwt.get('Set-Cookie')[0].split('; ')[0].split('=')[1];

    const response = await request(app)
      .put('/v1/user/security')
      .send({
        oldPassword: '@Password123',
        newPassword: '@Other321',
        confirmNewPassword: '@Other321',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(422);
  });

  it('Should be not able to change the password, if the session_id does not exist', async () => {
    const response = await request(app).put('/v1/user/security').send({
      oldPassword: '@Password123',
      newPassword: '@Other321',
      confirmNewPassword: '@Other321',
    });

    expect(response.status).toBe(401);
  });
});
