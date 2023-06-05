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
      message: message || `Invalid email format.`,
      action: action || 'Please provide a valid email address',
      errorId: errorId || uuid(),
      statusCode: statusCode || 400,
    });
  }
}

export class PhoneInvalidError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message: message || `Invalid phone number format.`,
      action: action || 'Please provide a valid phone number',
      errorId: errorId || uuid(),
      statusCode: statusCode || 400,
    });
  }
}

export class InsecurePasswordError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message: message || 'The password does not meet security requirements.',
      action: action || 'Please choose a stronger password',
      errorId: errorId || uuid(),
      statusCode: statusCode || 422,
    });
  }
}

export class AccountAlreadyExistsError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message:
        message || `An account with the same credentials already exists.`,
      action: action || 'Please use a different email',
      errorId: errorId || uuid(),
      statusCode: statusCode || 409,
    });
  }
}

export class PasswordsDoesNotMatchError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message: message || 'The passwords provided do not match.',
      action: action || 'Please ensure both passwords are identical',
      errorId: errorId || uuid(),
      statusCode: statusCode || 400,
    });
  }
}

export class InvalidPermissionsError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message:
        message || 'Invalid permissions to perform the requested action.',
      action: action || 'Please contact an administrator for assistance',
      errorId: errorId || uuid(),
      statusCode: statusCode || 403,
    });
  }
}

export class PermissionsError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message:
        message || 'Insufficient permissions to perform the requested action.',
      action:
        action ||
        'Please request appropriate permissions from an administrator',
      errorId: errorId || uuid(),
      statusCode: statusCode || 403,
    });
  }
}
