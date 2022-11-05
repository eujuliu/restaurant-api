import { Either, left, right } from '../../../core/logic/either';
import validator from 'validator';
import { EmailInvalidError } from './errors';

export class Email {
  private readonly email: string;

  constructor(email: string) {
    this.email = email;
  }

  get value(): string {
    return this.email;
  }

  static create(email: string): Either<EmailInvalidError, Email> {
    if (!validator.isEmail(email)) {
      return left(new EmailInvalidError(email));
    }

    return right(new Email(email));
  }
}
