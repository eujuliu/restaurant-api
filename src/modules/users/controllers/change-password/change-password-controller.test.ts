import { app } from 'infra/http/app';
import { generateJsonWebToken } from 'modules/users/infra/http/auth/generate-json-web-token';
import request from 'supertest';
import { CreateUserBodyProps } from '../create-user/create-user-controller';
import { v4 as uuid } from 'uuid';

describe('POST /user/security (controller)', () => {
  let userData: CreateUserBodyProps;

  beforeAll(() => {
    userData = {
      firstName: 'Jonathan',
      lastName: 'Doe',
      email: 'jonathan@example.com',
      password: '@Test123',
      phone: '(111) 111-1111',
    };
  });

  it('Should change the user password', async () => {
    const token = generateJsonWebToken(uuid(), userData.email);

    await request(app).post('/register').send(userData);

    const response = await request(app)
      .put('/user/security')
      .send({
        oldPassword: userData.password,
        newPassword: '@Other321',
        confirmNewPassword: '@Other321',
      })
      .set('Cookie', [`session_id=${token}`]);

    expect(response.status).toBe(200);
  });

  it('Should be not able to change the password if old password is wrong', async () => {
    const token = generateJsonWebToken(uuid(), userData.email);

    await request(app).post('/register').send(userData);

    const response = await request(app)
      .put('/user/security')
      .send({
        oldPassword: '@Password123',
        newPassword: '@Other321',
        confirmNewPassword: '@Other321',
      })
      .set('Cookie', [`session_id=${token}`]);

    expect(response.status).toBe(400);
  });
});
