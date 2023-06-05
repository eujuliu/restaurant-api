import { BaseError } from 'core/domain/errors';

interface ErrorProps {
  message?: string;
  action?: string;
  statusCode?: number;
  errorId?: string;
}

export class PostalCodeInvalidError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message: message || `Invalid postal code format.`,
      action: action || 'Please provide a valid postal code',
      errorId: errorId,
      statusCode: statusCode || 400,
    });
  }
}

export class AddressAlreadyRegisteredError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message: message || `The address is already registered.`,
      action: action || 'Please provide a different address',
      errorId: errorId,
      statusCode: statusCode || 409,
    });
  }
}
