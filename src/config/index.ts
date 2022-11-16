import 'dotenv/config';
import { v4 as uuid } from 'uuid';

export const SECRET = process.env.ACCESS_TOKEN_SECRET || uuid();
