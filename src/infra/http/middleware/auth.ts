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
  try {
    const token = request.header('Authorization')?.replace('Bearer ', '');

    const decoded = jwt.verify(token as string, SECRET);

    (request as CustomRequest).decoded = decoded;

    next();
  } catch (err) {
    return response.status(401).json(new TokenError({}));
  }
}
