import { v4 as uuid } from 'uuid';
import { generateJsonWebToken } from './generate-json-web-token';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { SECRET } from 'config';

test('Should generate a new JSON WEB TOKEN', () => {
  const token = generateJsonWebToken(uuid(), 'test@example.com');

  const response = jwt.verify(token, SECRET);
  expect(!!response).toBeTruthy();
});
