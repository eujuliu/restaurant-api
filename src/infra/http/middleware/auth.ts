import { SECRET } from 'config';
import { TokenError } from 'core/domain/errors';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface CustomRequest extends Request {
  decoded: string | jwt.JwtPayload;
}

export async function authenticateToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return response.status(401).json(new TokenError({}));
  }

  const decoded = jwt.verify(token, SECRET);

  (request as CustomRequest).decoded = decoded;

  next();
}
