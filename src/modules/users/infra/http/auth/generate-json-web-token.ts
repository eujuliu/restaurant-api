import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function generateJsonWebToken(id: string, email: string): string {
  const SECRET = process.env.ACCESS_TOKEN_SECRET || '';
  const token = jwt.sign({ id, email }, SECRET, { expiresIn: '12h' });

  return token;
}
