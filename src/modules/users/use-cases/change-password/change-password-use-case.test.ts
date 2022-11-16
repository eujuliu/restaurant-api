import { ValidationError } from 'core/domain/errors';
import { PasswordsDoesNotMatchError } from 'modules/users/domain/errors';
import { Password } from 'modules/users/domain/password';
import { InMemoryUsersRepository } from 'modules/users/repositories/in-memory/in-memory-users-repository';
import { IUsersRepository } from 'modules/users/repositories/users-repository';
import {
  CreateUserRequest,
  CreateUserUseCase,
} from '../create-user/create-user-use-case';
import { ChangePasswordUseCase } from './change-password-use-case';

describe('Change password (use case)', () => {
  let usersRepository: IUsersRepository;
  let createUserUseCase: CreateUserUseCase;
  let changeUserPasswordUseCase: ChangePasswordUseCase;
  let userData: CreateUserRequest;

  beforeAll(() => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    changeUserPasswordUseCase = new ChangePasswordUseCase(usersRepository);

    userData = {
      firstName: 'Jonathan',
      lastName: 'Doe',
      email: 'jonathan@example.com',
      password: '@Test123',
      phone: '(11) 98888-8888',
    };
  });

  it('Should change the user password', async () => {
    await createUserUseCase.execute(userData);

    await changeUserPasswordUseCase.execute({
      email: userData.email,
      oldPassword: userData.password,
      newPassword: '@notheR123',
      confirmNewPassword: '@notheR123',
    });

    const user = await usersRepository.findUserByEmail(userData.email);

    const bcryptResult = await Password.comparePasswords(
      '@notheR123',
      user?.password || ''
    );

    expect(bcryptResult).toBe(true);
  });

  it('Should not change the password if the oldPassword is wrong', async () => {
    const response = await changeUserPasswordUseCase.execute({
      email: userData.email,
      oldPassword: '@Password123',
      newPassword: '@notheR123',
      confirmNewPassword: '@notheR123',
    });

    expect(response.value).toStrictEqual(new ValidationError({}));
  });

  it('Should not change the password if newPassword and newPasswordCompare does not match', async () => {
    const response = await changeUserPasswordUseCase.execute({
      email: userData.email,
      oldPassword: '@notheR123',
      newPassword: '@Other321',
      confirmNewPassword: '@Other421',
    });

    expect(response.value).toStrictEqual(new PasswordsDoesNotMatchError({}));
  });
});
