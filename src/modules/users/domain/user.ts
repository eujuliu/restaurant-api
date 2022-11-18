import { v4 as uuid } from 'uuid';
import { Email } from './email';
import { Password } from './password';
import { Phone } from './phone';
import { Either, left, right } from 'core/logic/either';
import {
  EmailInvalidError,
  InsecurePasswordError,
  PhoneInvalidError,
} from './errors';

interface UserDataProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  emailIsVerified: boolean;
}

export class User {
  readonly id: string;
  firstName: string;
  lastName: string;
  email: Email;
  password: Password;
  phone: Phone;
  emailIsVerified: boolean;

  constructor(
    {
      firstName,
      lastName,
      email,
      password,
      phone,
      emailIsVerified,
    }: Omit<User, 'id'>,
    id?: string
  ) {
    Object.assign(this, {
      id: id || uuid(),
      firstName,
      lastName,
      email,
      password,
      phone,
      emailIsVerified,
    });
  }

  static create({
    firstName,
    lastName,
    email,
    password,
    phone,
    emailIsVerified,
  }: UserDataProps): Either<
    EmailInvalidError | InsecurePasswordError | PhoneInvalidError,
    User
  > {
    const emailOrError: Either<EmailInvalidError, Email> = Email.create(email);
    const passwordOrError: Either<InsecurePasswordError, Password> =
      Password.create({ value: password });
    const phoneOrError: Either<PhoneInvalidError, Phone> = Phone.create(phone);

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    if (phoneOrError.isLeft()) {
      return left(phoneOrError.value);
    }

    return right(
      new User({
        firstName,
        lastName,
        email: emailOrError.value,
        password: passwordOrError.value,
        phone: phoneOrError.value,
        emailIsVerified,
      })
    );
  }
}
