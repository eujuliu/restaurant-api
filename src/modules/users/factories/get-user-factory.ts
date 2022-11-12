import { GetUserController } from '../controllers/get-user/get-user-controller';
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository';
import { GetUserUseCase } from '../use-cases/get-user/get-user-use-case';

export const getUserFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const getUserUseCase = new GetUserUseCase(usersRepository);
  const getUserController = new GetUserController(getUserUseCase);

  return getUserController;
};
