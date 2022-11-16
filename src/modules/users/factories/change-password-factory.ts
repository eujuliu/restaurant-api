import { ChangePasswordController } from '../controllers/change-password/change-password-controller';
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository';
import { ChangePasswordUseCase } from '../use-cases/change-password/change-password-use-case';

export const changePasswordFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const changePasswordUseCase = new ChangePasswordUseCase(usersRepository);
  const changePasswordController = new ChangePasswordController(
    changePasswordUseCase
  );

  return changePasswordController;
};
