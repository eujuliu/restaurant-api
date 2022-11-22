import 'dotenv/config';

export const SECRET = process.env.ACCESS_TOKEN_SECRET as string;
export const PORT = process.env.PORT || 3000;
