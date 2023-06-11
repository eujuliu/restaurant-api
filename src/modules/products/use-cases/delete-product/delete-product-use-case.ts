import { UseCase } from 'core/domain/UseCase';
import { Either, left, right } from 'core/logic/either';
import { ProductNotFoundError } from 'modules/products/domain/errors';
import { IProductsRepository } from 'modules/products/repositories/products-repository';
import { PermissionsError } from 'modules/users/domain/errors';
import { Permissions } from 'modules/users/domain/permissions';
import { IUsersRepository } from 'modules/users/repositories/users-repository';

interface DeleteProductRequest {
  userId: string;
  criteria: string[];
}

type DeleteProductResponse = Either<
  ProductNotFoundError | PermissionsError,
  string | void
>;

export class DeleteProductUseCase
  implements UseCase<DeleteProductRequest, DeleteProductResponse>
{
  constructor(
    private productsRepository: IProductsRepository,
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    userId,
    criteria,
  }: DeleteProductRequest): Promise<DeleteProductResponse> {
    const permissions = new Permissions(
      await this.usersRepository.permissions(userId)
    );

    if (!permissions.has(['product:delete'])) {
      return left(new PermissionsError({}));
    }

    const products = await this.productsRepository.findProductsById(criteria);

    if (
      products.length < 1 ||
      products.some((product) => !criteria.includes(product.id))
    ) {
      return left(new ProductNotFoundError({}));
    }

    await this.productsRepository.delete(criteria);

    return right('Product(s) deleted successfully');
  }
}
