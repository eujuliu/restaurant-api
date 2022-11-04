import { UseCase } from 'core/domain/UseCase';
import { UnexpectedError } from 'core/logic/app-error';
import { Either, left, right } from 'core/logic/either';
import { User } from '../domain/user';
import {
  EmailInvalidError,
  InsecurePasswordError,
  AccountAlreadyExists,
} from '../errors';
import { IUsersRepository } from '../repositories/users-repository';

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
  | AccountAlreadyExists
  | UnexpectedError,
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
      return left(new AccountAlreadyExists(email));
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
    } catch (err) {
      return left(new UnexpectedError(err));
    }

    return right(`Welcome ${user.firstName}! Please confirm your email`);
  }
}
