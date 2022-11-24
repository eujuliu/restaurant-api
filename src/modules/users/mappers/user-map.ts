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
  }: User): Promise<PersistenceUser> {
    return {
      id,
      firstName,
      lastName,
      email: email.value,
      password: await password.getHashedValue(),
      phone: phone.value,
      emailIsVerified,
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
      },
      id
    );

    return domainUser;
  }
}
