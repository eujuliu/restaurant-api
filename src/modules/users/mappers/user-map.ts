import { Email } from '../domain/email';
import { Password } from '../domain/password';
import { Permissions } from '../domain/permissions';
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
  permissions: string[];
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
    permissions,
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
      permissions: permissions.value,
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
    permissions,
    created_at,
    updated_at,
  }: PersistenceUser): User {
    const emailOrError = Email.create(email);
    const passwordOrError = Password.create({
      value: password,
      hashed: true,
    });
    const phoneOrError = Phone.create(phone);
    const permissionsOrError = Permissions.create(permissions);

    const domainUser = new User(
      {
        firstName,
        lastName,
        email: emailOrError.value as Email,
        password: passwordOrError.value as Password,
        phone: phoneOrError.value as Phone,
        emailIsVerified,
        permissions: permissionsOrError.value as Permissions,
        createdAt: created_at,
        updatedAt: updated_at,
      },
      id
    );

    return domainUser;
  }
}
