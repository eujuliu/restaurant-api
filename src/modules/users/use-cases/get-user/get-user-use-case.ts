import { InternalServerError } from 'core/domain/errors';
import { UseCase } from 'core/domain/UseCase';
import { Either, left, right } from 'core/logic/either';
import { Email } from 'modules/users/domain/email';
import {
  AccountDoNotExistsError,
  DataDoNotMatchError,
  EmailInvalidError,
} from 'modules/users/domain/errors';
import { Password } from 'modules/users/domain/password';
import { IUsersRepository } from 'modules/users/repositories/users-repository';

interface GetUserRequest {
  email: string;
  password: string;
}

type GetUserResponse = Either<
  AccountDoNotExistsError,
  EmailInvalidError | { id: string; email: string }
>;

export class GetUserUseCase
  implements UseCase<GetUserRequest, GetUserResponse>
{
  constructor(private usersRepository: IUsersRepository) {}
  async execute({ email, password }: GetUserRequest): Promise<GetUserResponse> {
    const emailOrError = Email.create(email);

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    try {
      const user = await this.usersRepository.findUserByEmail(
        emailOrError.value.value
      );

      if (!user) {
        return left(new AccountDoNotExistsError({}));
      }

      const comparePasswords = await Password.comparePasswords(
        password,
        user.password
      );

      if (!comparePasswords) {
        return left(new DataDoNotMatchError({}));
      }

      return right({ id: user.id, email: user.email });
    } catch (err) {
      return left(new InternalServerError({ message: (err as Error).message }));
    }
  }
}
