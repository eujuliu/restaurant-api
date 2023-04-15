import {
  EmailInvalidError,
  InsecurePasswordError,
  PhoneInvalidError,
} from './errors';
import { User } from './user';

describe('Create a new user (entity)', () => {
  it('Should be able to create a user instance of User', () => {
    const userOrError = User.create({
      firstName: 'Alex',
      lastName: 'Doe',
      email: 'alex@example.com',
      password: '@Test123',
      phone: '(11) 98888-8888',
      emailIsVerified: false,
    });

    expect(userOrError.value).toBeInstanceOf(User);
    expect(userOrError.value).toHaveProperty('id');
    expect(userOrError.value).toHaveProperty('createdAt');
    expect(userOrError.value).toHaveProperty('updatedAt');
  });

  it('Should be not able to create a user with an invalid email', () => {
    const email = 'email.com';
    const userOrError = User.create({
      firstName: 'Alex',
      lastName: 'Doe',
      email,
      password: '@Test123',
      phone: '(11) 98888-8888',
      emailIsVerified: false,
    });

    expect(userOrError.value).toStrictEqual(new EmailInvalidError({}));
  });

  it('Should be not able to create a user with an invalid password', () => {
    const userOrError = User.create({
      firstName: 'Alex',
      lastName: 'Doe',
      email: 'alex@example.com',
      password: '1234567',
      phone: '(11) 98888-8888',
      emailIsVerified: false,
    });

    expect(userOrError.value).toStrictEqual(new InsecurePasswordError({}));
  });

  it('Should be not able to create a user with an invalid phone', () => {
    const userOrError = User.create({
      firstName: 'Alex',
      lastName: 'Doe',
      email: 'alex@example.com',
      password: '@Test123',
      phone: '(11) 8888-888',
      emailIsVerified: false,
    });

    expect(userOrError.value).toStrictEqual(new PhoneInvalidError({}));
  });
});
