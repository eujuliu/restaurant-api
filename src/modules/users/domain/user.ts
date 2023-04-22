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
import { Permissions } from './permissions';

interface UserDataProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  permissions: Permissions;
  emailIsVerified: boolean;
}

export class User {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: Email;
  readonly password: Password;
  readonly phone: Phone;
  readonly emailIsVerified: boolean;
  readonly permissions: Permissions;
  readonly createdAt: string;
  readonly updatedAt: string;

  constructor(
    {
      firstName,
      lastName,
      email,
      password,
      phone,
      emailIsVerified,
      permissions,
      createdAt,
      updatedAt,
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
      createdAt,
      updatedAt,
      permissions,
    });
  }

  static create({
    firstName,
    lastName,
    email,
    password,
    phone,
    permissions,
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
        createdAt: new Date().toJSON(),
        updatedAt: new Date().toJSON(),
        emailIsVerified,
        permissions,
      })
    );
  }
}
