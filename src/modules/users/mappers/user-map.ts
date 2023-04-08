import { Email } from '../domain/email';
import { Password } from '../domain/password';
import { Phone } from '../domain/phone';
import { User } from '../domain/user';

export interface PersistenceUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  emailIsVerified: boolean;
  created_at: string;
  updated_at: string;
}

export class UserMap {
  static async toPersistence({
    id,
    firstName,
    lastName,
    email,
    password,
    phone,
    emailIsVerified,
    createdAt,
    updatedAt,
  }: User): Promise<PersistenceUser> {
    return {
      id,
      firstName,
      lastName,
      email: email.value,
      password: await password.getHashedValue(),
      phone: phone.value,
      emailIsVerified,
      created_at: createdAt,
      updated_at: updatedAt,
    };
  }

  static toDomain({
    id,
    firstName,
    lastName,
    email,
    password,
    phone,
    emailIsVerified,
    created_at,
    updated_at,
  }: PersistenceUser): User {
    const emailOrError = Email.create(email);
    const passwordOrError = Password.create({
      value: password,
      hashed: true,
    });
    const phoneOrError = Phone.create(phone);

    const domainUser = new User(
      {
        firstName,
        lastName,
        email: emailOrError.value as Email,
        password: passwordOrError.value as Password,
        phone: phoneOrError.value as Phone,
        emailIsVerified,
        createdAt: created_at,
        updatedAt: updated_at,
      },
      id
    );

    return domainUser;
  }
}
