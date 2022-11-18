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
  static async toPersistence(domainUser: User): Promise<PersistenceUser> {
    return {
      id: domainUser.id,
      firstName: domainUser.firstName,
      lastName: domainUser.lastName,
      email: domainUser.email.value,
      password: await domainUser.password.getHashedValue(),
      phone: domainUser.phone.value,
      emailIsVerified: domainUser.emailIsVerified,
    };
  }

  static toDomain(persistenceUser: PersistenceUser): User {
    const emailOrError = Email.create(persistenceUser.email);
    const passwordOrError = Password.create({
      value: persistenceUser.password,
      hashed: true,
    });
    const phoneOrError = Phone.create(persistenceUser.phone);

    const domainUser = new User({
      firstName: persistenceUser.firstName,
      lastName: persistenceUser.lastName,
      email: emailOrError.value as Email,
      password: passwordOrError.value as Password,
      phone: phoneOrError.value as Phone,
      emailIsVerified: persistenceUser.emailIsVerified,
    });

    return domainUser;
  }
}
