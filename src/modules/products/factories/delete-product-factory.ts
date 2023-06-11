import { PrismaUsersRepository } from 'modules/users/repositories/prisma/prisma-users-repository';
import { PrismaProductsRepository } from '../repositories/prisma/prisma-products-repository';
import { DeleteProductUseCase } from '../use-cases/delete-product/delete-product-use-case';
import { DeleteProductController } from '../controllers/delete-product/delete-product-controller';

export const deleteProductFactory = () => {
  const productsRepository = new PrismaProductsRepository();
  const usersRepository = new PrismaUsersRepository();
  const deleteProductUseCase = new DeleteProductUseCase(
    productsRepository,
    usersRepository
  );
  const deleteProductController = new DeleteProductController(
    deleteProductUseCase
  );

  return deleteProductController;
};
