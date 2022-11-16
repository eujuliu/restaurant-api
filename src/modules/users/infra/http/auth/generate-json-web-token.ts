import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { SECRET } from 'config';

export function generateJsonWebToken(id: string, email: string): string {
  const token = jwt.sign({ id, email }, SECRET, { expiresIn: '12h' });

  return token;
}
