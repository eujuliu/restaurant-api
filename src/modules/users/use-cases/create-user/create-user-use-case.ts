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
import { UserMap } from 'modules/users/mappers/user-map';

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
  null | void
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
    const domainToPersistence = await UserMap.toPersistence(user);

    await this.usersRepository.save(domainToPersistence);

    return right(null);
  }
}
