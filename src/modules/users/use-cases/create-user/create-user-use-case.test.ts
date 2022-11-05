import { AccountAlreadyExists } from 'modules/users/domain/errors';
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
      firstName: 'Hanna',
      lastName: 'Doe',
      email: 'hanna@example.com',
      password: '@Test123',
      phone: '(111) 111-1111',
    };
  });

  it('Should be able to create a new user', async () => {
    const response = await createUserUseCase.execute(userData);

    const findUserResponse = await usersRepository.findUserByEmail(
      userData.email
    );

    expect(response.value).toBe(
      `Welcome ${userData.firstName}! Please confirm your email`
    );
    expect(findUserResponse?.email).toBe(userData.email);
  });

  it('Should be not able to create an existing user', async () => {
    await createUserUseCase.execute(userData);
    const response = await createUserUseCase.execute(userData);

    expect(response.value).toStrictEqual(
      new AccountAlreadyExists(userData.email)
    );
  });
});
