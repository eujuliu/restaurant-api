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
      message:
        message || 'An internal server error occurred. Please try again later.',
      action: action || 'Contact the system administrator',
      errorId: errorId,
      statusCode: statusCode || 500,
    });
  }
}

export class ValidationError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message:
        message ||
        'Invalid input. Please provide valid data for the required fields.',
      action: action || 'Perform the requested operation',
      errorId: errorId,
      statusCode: statusCode || 400,
    });
  }
}

export class TokenError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message:
        message ||
        'Invalid token. Please provide a valid authentication token.',
      action: action || 'Authenticate user',
      errorId: errorId,
      statusCode: statusCode || 403,
    });
  }
}

export class UnauthorizedError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message:
        message ||
        'Access denied. You are not authorized to perform this action.',
      action: action || 'View confidential data',
      errorId: errorId,
      statusCode: statusCode || 401,
    });
  }
}
