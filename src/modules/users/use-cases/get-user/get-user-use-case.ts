import { ValidationError } from 'core/domain/errors';
import { UseCase } from 'core/domain/UseCase';
import { Either, left, right } from 'core/logic/either';
import { Email } from 'modules/users/domain/email';
import { EmailInvalidError } from 'modules/users/domain/errors';
import { generateJsonWebToken } from 'modules/users/infra/http/auth/generate-json-web-token';
import { UserMap } from 'modules/users/mappers/user-map';
import { IUsersRepository } from 'modules/users/repositories/users-repository';

interface GetUserRequest {
  email: string;
  password: string;
}

type GetUserResponse = Either<ValidationError, EmailInvalidError | string>;

export class GetUserUseCase
  implements UseCase<GetUserRequest, GetUserResponse>
{
  constructor(private usersRepository: IUsersRepository) {}
  async execute({ email, password }: GetUserRequest): Promise<GetUserResponse> {
    const emailOrError = Email.create(email);

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    const user = await this.usersRepository.findUserByEmail(
      emailOrError.value.value
    );

    if (!user) {
      return left(new ValidationError({}));
    }

    const persistenceUserToDomain = UserMap.toDomain(user);

    const comparePasswords =
      await persistenceUserToDomain.password.comparePassword(password);

    if (!comparePasswords) {
      return left(new ValidationError({}));
    }

    const token = generateJsonWebToken(user.id, user.email);

    return right(token);
  }
}
