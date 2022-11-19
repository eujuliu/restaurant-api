import { BaseError } from 'core/domain/errors';
import { v4 as uuid } from 'uuid';

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
      errorId: errorId || uuid(),
      statusCode: statusCode || 400,
    });
  }
}
