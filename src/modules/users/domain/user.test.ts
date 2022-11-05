import { left } from 'core/logic/either';
import { EmailInvalidError, InsecurePasswordError } from './errors';
import { User } from './user';

describe('Create a new user (entity)', () => {
  it('Should be able to create a user instance of User', () => {
    const userOrError = User.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: '@Test123',
      phone: '(111) 111-1111',
      emailIsVerified: false,
    });

    expect(userOrError.value).toBeInstanceOf(User);
    expect(userOrError.value).toHaveProperty('id');
  });

  it('Should be not able to create a user with an invalid email', () => {
    const email = 'email.com';
    const userOrError = User.create({
      firstName: 'John',
      lastName: 'Doe',
      email,
      password: '@Test123',
      phone: '(111) 111-1111',
      emailIsVerified: false,
    });

    expect(userOrError).toStrictEqual(left(new EmailInvalidError(email)));
  });

  it('Should be not able to create a user with an invalid password', () => {
    const userOrError = User.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: '1234567',
      phone: '(111) 111-1111',
      emailIsVerified: false,
    });

    expect(userOrError).toStrictEqual(left(new InsecurePasswordError()));
  });
});
