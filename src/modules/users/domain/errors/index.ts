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
      action: action || 'Verify the data and try again',
      errorId: errorId || uuid(),
      statusCode: statusCode || 400,
    });
  }
}

export class PhoneInvalidError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message: message || `This phone number is not valid.`,
      action: action || 'Verify the data and try again',
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

export class PasswordsDoesNotMatchError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message: message || 'Passwords does not match',
      action: action || 'Re-write the passwords and try again',
      errorId: errorId || uuid(),
      statusCode: statusCode || 400,
    });
  }
}

export class InvalidPermissionsError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message: message || 'Invalid permissions',
      action: action || 'This permissions is not allowed',
      errorId: errorId || uuid(),
      statusCode: statusCode || 400,
    });
  }
}
