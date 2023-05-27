require('tsconfig-paths/register');

import { app } from 'infra/http/app';
import request from 'supertest';

const setup = async () => {
  await request(app).post('/v1/users').send({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'janedoe@example.com',
    password: 'Password1!',
    phone: '1234567890',
  });
};

module.exports = setup;
