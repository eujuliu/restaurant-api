import { app } from 'infra/http/app';
import request from 'supertest';
import { CreateUserBodyProps } from './create-user-controller';

describe('POST /register (controller)', () => {
  let userData: CreateUserBodyProps;

  beforeAll(() => {
    userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: '@Test1234',
      phone: '(111) 111-1111',
    };
  });

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/register').send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toStrictEqual({
      message: `Welcome ${userData.firstName}! Please confirm your email`,
    });
  });

  it('Should be not able to create a existing user', async () => {
    await request(app).post('/register').send(userData);

    const response = await request(app).post('/register').send(userData);

    expect(response.status).toBe(400);
    expect(response.body.message).toStrictEqual(
      'Already exists a user registered with this email address'
    );
  });
});
