import { PrismaUsersRepository } from 'modules/users/repositories/prisma/prisma-users-repository';
import { PrismaProductsRepository } from '../repositories/prisma/prisma-products-repository';
import { CreateProductUseCase } from '../use-cases/create-product/create-product-use-case';
import { CreateProductController } from '../controllers/create-product/create-product-controller';

export const createProductFactory = () => {
  const productsRepository = new PrismaProductsRepository();
  const usersRepository = new PrismaUsersRepository();
  const createProductUseCase = new CreateProductUseCase(
    productsRepository,
    usersRepository
  );
  const createProductController = new CreateProductController(
    createProductUseCase
  );

  return createProductController;
};
