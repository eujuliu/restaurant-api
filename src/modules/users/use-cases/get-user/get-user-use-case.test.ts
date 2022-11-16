import { ValidationError } from 'core/domain/errors';
import { InMemoryUsersRepository } from 'modules/users/repositories/in-memory/in-memory-users-repository';
import { IUsersRepository } from 'modules/users/repositories/users-repository';
import {
  CreateUserRequest,
  CreateUserUseCase,
} from '../create-user/create-user-use-case';
import { GetUserUseCase } from './get-user-use-case';

describe('Get user (use case)', () => {
  let usersRepository: IUsersRepository;
  let createUserUseCase: CreateUserUseCase;
  let getUserUseCase: GetUserUseCase;
  let userData: CreateUserRequest;

  beforeAll(() => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    getUserUseCase = new GetUserUseCase(usersRepository);
    userData = {
      firstName: 'Hanna',
      lastName: 'Doe',
      email: 'hanna@example.com',
      password: '@Test123',
      phone: '(111) 111-1111',
    };
  });

  it('Should return a user id and email', async () => {
    await createUserUseCase.execute(userData);

    const response = await getUserUseCase.execute({
      email: userData.email,
      password: userData.password,
    });

    expect(response).toHaveProperty('value');
  });

  it('Should be not able to return a user when email does not exist', async () => {
    const response = await getUserUseCase.execute({
      email: 'test@example.com',
      password: '@Test1234',
    });

    expect(response.value).toStrictEqual(new ValidationError({}));
  });

  it('Should be not able to return a user when password is wrong', async () => {
    await createUserUseCase.execute(userData);

    const response = await getUserUseCase.execute({
      email: userData.email,
      password: '@Password123',
    });

    expect(response.value).toStrictEqual(new ValidationError({}));
  });
});
