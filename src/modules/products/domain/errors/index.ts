import { BaseError } from 'core/domain/errors';
import { v4 as uuid } from 'uuid';

interface ErrorProps {
  message?: string;
  action?: string;
  statusCode?: number;
  errorId?: string;
}

export class ProductAlreadyExistsError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message: message || `This product already exists.`,
      action: action || 'If is an another product try change the name.',
      errorId: errorId || uuid(),
      statusCode: statusCode || 400,
    });
  }
}

export class InvalidImageUrlError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message: message || `This url is not valid`,
      action: action || 'Try another url image.',
      errorId: errorId || uuid(),
      statusCode: statusCode || 400,
    });
  }
}

export class PermissionsError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message: message || 'This user has no permissions to do this action',
      action: action || 'Try with another user',
      errorId: errorId || uuid(),
      statusCode: statusCode || 401,
    });
  }
}
