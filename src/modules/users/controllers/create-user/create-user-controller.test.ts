import { app } from 'infra/http/app';
import request from 'supertest';
import { CreateUserBodyProps } from './create-user-controller';

describe('POST /v1/users (controller)', () => {
  let userData: CreateUserBodyProps;

  beforeAll(() => {
    userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: '@Test1234',
      phone: '(11) 98888-8888',
    };
  });

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/v1/users').send(userData);

    expect(response.status).toBe(201);
  });

  it('Should be not able to create a existing user', async () => {
    await request(app).post('/v1/users').send(userData);

    const response = await request(app).post('/v1/users').send(userData);

    expect(response.status).toBe(400);
    expect(response.body.message).toStrictEqual(
      'Already exists a user registered with this email address'
    );
  });
});
