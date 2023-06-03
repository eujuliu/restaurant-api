import { PrismaUsersRepository } from 'modules/users/repositories/prisma/prisma-users-repository';
import { PrismaProductsRepository } from '../repositories/prisma/prisma-products-repository';
import { GetProductsUseCase } from '../use-cases/get-products/get-products-use-case';
import { GetProductsController } from '../controllers/get-products/get-products-controller';

export const getProductsFactory = () => {
  const productsRepository = new PrismaProductsRepository();
  const usersRepository = new PrismaUsersRepository();
  const getProductsUseCase = new GetProductsUseCase(
    productsRepository,
    usersRepository
  );
  const getProductsController = new GetProductsController(getProductsUseCase);

  return getProductsController;
};
