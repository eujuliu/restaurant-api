import { CreateUserController } from '../controllers/create-user/create-user-controller';
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository';
import { CreateUserUseCase } from '../use-cases/create-user/create-user-use-case';

export const createUserFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUserUseCase(usersRepository);
  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
};
