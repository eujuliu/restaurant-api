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
      message: message || `A product with the same identifier already exists.`,
      action: action || 'Choose a unique product identifier',
      errorId: errorId || uuid(),
      statusCode: statusCode || 409,
    });
  }
}

export class InvalidImageUrlError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message: message || `Invalid image URL provided for the product.`,
      action: action || 'Provide a valid image URL',
      errorId: errorId || uuid(),
      statusCode: statusCode || 422,
    });
  }
}

export class ProductNotFoundError extends BaseError {
  constructor({ message, action, errorId, statusCode }: ErrorProps) {
    super({
      message: message || 'The requested product could not be found.',
      action: action || 'Check the product identifier and try again',
      errorId: errorId || uuid(),
      statusCode: statusCode || 404,
    });
  }
}
