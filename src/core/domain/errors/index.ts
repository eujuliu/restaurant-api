import { v4 as uuid } from 'uuid';

interface BaseErrorProps {
  message: string;
  action: string;
  statusCode: number;
  errorId?: string;
}

interface ErrorProps {
  message?: string;
  action?: string;
  statusCode?: number;
  errorId?: string;
}

export class BaseError extends Error {
  readonly name: string;
  readonly action: string;
  readonly statusCode: number;
  readonly errorId: string;
  constructor({ action, errorId, message, statusCode }: BaseErrorProps) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.action = action;
    this.statusCode = statusCode;
    this.errorId = errorId || uuid();
  }
}

export class InternalServerError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message: message || 'An internal server error occurred.',
      action: action || 'Contact the system administrator',
      errorId: errorId,
      statusCode: statusCode || 500,
    });
  }
}

export class ValidationError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message: message || 'Validation failed for the request.',
      action: action || 'Correct the input fields and try again',
      errorId: errorId,
      statusCode: statusCode || 422,
    });
  }
}

export class TokenError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message: message || 'Invalid or expired token.',
      action: action || 'Generate a new token and try again',
      errorId: errorId,
      statusCode: statusCode || 401,
    });
  }
}

export class UnauthorizedError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message: message || 'Unauthorized access.',
      action: action || 'Please authenticate and provide valid credentials',
      errorId: errorId,
      statusCode: statusCode || 401,
    });
  }
}
