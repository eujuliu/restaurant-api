import { v4 as uuid } from 'uuid';

interface BaseErrorProps {
  message: string;
  action: string;
  statusCode: number;
  errorId: string;
}

interface ErrorProps {
  message: string;
  action?: string;
  statusCode?: number;
  errorId?: string;
}

export class BaseError extends Error {
  name: string;
  action: string;
  statusCode: number;
  errorId: string;
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
      errorId: errorId || uuid(),
      statusCode: statusCode || 500,
    });
  }
}
