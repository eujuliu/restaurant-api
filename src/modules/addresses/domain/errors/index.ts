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
      message: message || `This postal code is not valid.`,
      action: action || 'Verify the data and try again',
      errorId: errorId,
      statusCode: statusCode || 400,
    });
  }
}

export class AddressAlreadyRegisteredError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message: message || `This address is already registered`,
      action: action || 'Try another address',
      errorId: errorId,
      statusCode: statusCode || 400,
    });
  }
}
