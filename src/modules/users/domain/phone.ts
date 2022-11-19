import { Either, left, right } from 'core/logic/either';
import { PhoneInvalidError } from './errors';
import validator from 'validator';
import { normalizePhone } from './utils/normalize-phone';

export class Phone {
  private readonly phone: string;
  constructor(phone: string) {
    this.phone = phone;
  }

  get value(): string {
    return this.phone;
  }

  static create(phone: string): Either<PhoneInvalidError, Phone> {
    if (!validator.isMobilePhone(phone, 'pt-BR')) {
      return left(new PhoneInvalidError({}));
    }

    const normalizedPhone = normalizePhone(55, phone);

    return right(new Phone(normalizedPhone));
  }
}
