import { AccountAlreadyExistsError } from 'modules/users/domain/errors';
import { InMemoryUsersRepository } from 'modules/users/repositories/in-memory/in-memory-users-repository';
import { IUsersRepository } from 'modules/users/repositories/users-repository';
import { CreateUserRequest, CreateUserUseCase } from './create-user-use-case';

describe('Create a new user (use case)', () => {
  let usersRepository: IUsersRepository;
  let createUserUseCase: CreateUserUseCase;
  let userData: CreateUserRequest;

  beforeAll(() => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: '@Test123',
      phone: '(11) 98888-8888',
    };
  });

  it('Should be able to create a new user', async () => {
    await createUserUseCase.execute(userData);

    const userFound = await usersRepository.findUserByEmail(userData.email);

    expect(userFound?.email).toBe(userData.email);
  });

  it('Should be not able to create an existing user', async () => {
    await createUserUseCase.execute(userData);
    const response = await createUserUseCase.execute(userData);
    expect(response.value).toStrictEqual(new AccountAlreadyExistsError({}));
  });
});
