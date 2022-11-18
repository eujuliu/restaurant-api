import { ValidationError } from 'core/domain/errors';
import { UseCase } from 'core/domain/UseCase';
import { Either, left, right } from 'core/logic/either';
import {
  InsecurePasswordError,
  PasswordsDoesNotMatchError,
} from 'modules/users/domain/errors';
import { Password } from 'modules/users/domain/password';
import { PersistenceUser, UserMap } from 'modules/users/mappers/user-map';
import { IUsersRepository } from 'modules/users/repositories/users-repository';

interface ChangePasswordRequest {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

type ChangePasswordResponse = Either<
  ValidationError | InsecurePasswordError | PasswordsDoesNotMatchError,
  string
>;

export class ChangePasswordUseCase
  implements UseCase<ChangePasswordRequest, ChangePasswordResponse>
{
  constructor(private usersRepository: IUsersRepository) {}
  async execute({
    email,
    oldPassword,
    newPassword,
    confirmNewPassword,
  }: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    const user = await this.usersRepository.findUserByEmail(email);
    const persistenceToDomain = UserMap.toDomain(user as PersistenceUser);

    if (
      !user ||
      !(await persistenceToDomain.password.comparePassword(oldPassword))
    ) {
      return left(new ValidationError({}));
    }

    if (newPassword !== confirmNewPassword) {
      return left(new PasswordsDoesNotMatchError({}));
    }

    const password = Password.create({ value: newPassword });

    if (password.isLeft()) {
      return left(new InsecurePasswordError({}));
    }

    const hashedNewPassword = await password.value.getHashedValue();

    await this.usersRepository.updatePassword(email, hashedNewPassword);

    return right('Password updated successfully');
  }
}
