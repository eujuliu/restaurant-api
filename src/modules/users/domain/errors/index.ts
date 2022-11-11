import { BaseError } from 'core/domain/errors';
import { v4 as uuid } from 'uuid';

interface ErrorProps {
  message?: string;
  action?: string;
  statusCode?: number;
  errorId?: string;
}

export class EmailInvalidError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message: message || `This email is not valid.`,
      action: action || 'Try another email address',
      errorId: errorId || uuid(),
      statusCode: statusCode || 400,
    });
  }
}

export class InsecurePasswordError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message: message || 'This password is not secure.',
      action: action || 'Try another password',
      errorId: errorId || uuid(),
      statusCode: statusCode || 400,
    });
  }
}

export class AccountAlreadyExistsError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message:
        message || `Already exists a user registered with this email address`,
      action: action || 'If is you, try logging',
      errorId: errorId || uuid(),
      statusCode: statusCode || 400,
    });
  }
}

export class AccountDoNotExistsError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message: message || `Don't exist a account registered with this email`,
      action: action || 'Try to register a new account',
      errorId: errorId || uuid(),
      statusCode: statusCode || 404,
    });
  }
}

export class DataDoNotMatchError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message: message || `The email or password don't match`,
      action: action || 'Try another email or password',
      errorId: errorId || uuid(),
      statusCode: statusCode || 400,
    });
  }
}
