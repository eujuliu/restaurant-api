import { SECRET } from 'config';
import { ValidationError } from 'core/domain/errors';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function authenticateJsonWebToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.cookies.session_id;

  if (!token) {
    return response.status(401).json(new ValidationError({}));
  }

  response.locals.decoded_token = jwt.verify(token, SECRET);

  next();
}
