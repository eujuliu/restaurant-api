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
      message: message || 'An Internal Server Error occurred',
      action: action || 'Please contact the support',
      errorId: errorId,
      statusCode: statusCode || 500,
    });
  }
}

export class ValidationError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message: message || 'A validation error occurred',
      action: action || 'Change the data and try again',
      errorId: errorId,
      statusCode: statusCode || 400,
    });
  }
}

export class TokenError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message: message || 'Invalid token',
      action: action || 'If you are not authenticated, please authenticate',
      errorId: errorId,
      statusCode: statusCode || 400,
    });
  }
}
