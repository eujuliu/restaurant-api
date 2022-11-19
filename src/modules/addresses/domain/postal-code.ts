import { Either, left, right } from 'core/logic/either';
import { PostalCodeInvalidError } from './errors';
import validator from 'validator';

export class PostalCode {
  constructor(private readonly postalCode: string) {
    this.postalCode = postalCode;
  }

  get value(): string {
    return this.postalCode;
  }

  static create(
    postalCode: string
  ): Either<PostalCodeInvalidError, PostalCode> {
    if (!validator.isPostalCode(postalCode, 'BR')) {
      return left(new PostalCodeInvalidError({}));
    }

    return right(new PostalCode(postalCode));
  }
}
