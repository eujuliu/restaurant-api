import { UseCase } from 'core/domain/UseCase';
import { Either, left, right } from 'core/logic/either';
import { User } from 'modules/users/domain/user';
import {
  AccountAlreadyExistsError,
  EmailInvalidError,
  InsecurePasswordError,
} from 'modules/users/domain/errors';
import { IUsersRepository } from 'modules/users/repositories/users-repository';
import { InternalServerError } from 'core/domain/errors';

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

type CreateUserResponse = Either<
  | EmailInvalidError
  | InsecurePasswordError
  | AccountAlreadyExistsError
  | InternalServerError,
  string
>;

export class CreateUserUseCase
  implements UseCase<CreateUserRequest, CreateUserResponse>
{
  constructor(private usersRepository: IUsersRepository) {}
  async execute({
    firstName,
    lastName,
    email,
    password,
    phone,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const userAlreadyExists = await this.usersRepository.exists(email);

    if (userAlreadyExists) {
      return left(new AccountAlreadyExistsError({}));
    }

    const userOrError = User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      emailIsVerified: false,
    });

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const user: User = userOrError.value;

    try {
      await this.usersRepository.save({
        ...user,
        email: user.email.value,
        password: await user.password.getHashedValue(),
      });

      return right(`Welcome ${user.firstName}! Please confirm your email`);
    } catch (err) {
      return left(new InternalServerError({ message: (err as Error).message }));
    }
  }
}
