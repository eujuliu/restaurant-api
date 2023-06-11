import { UseCase } from 'core/domain/UseCase';
import { UnauthorizedError } from 'core/domain/errors';
import { Either, left, right } from 'core/logic/either';
import { Product } from 'modules/products/domain/product';
import { IProductsRepository } from 'modules/products/repositories/products-repository';
import { Permissions } from 'modules/users/domain/permissions';
import { IUsersRepository } from 'modules/users/repositories/users-repository';

export interface GetProductsRequest {
  userId: string;
  limit?: number;
  offset?: number;
}

export type GetProductsResponse = Either<
  UnauthorizedError,
  Omit<Product, 'createdBy'>[]
>;

export class GetProductsUseCase
  implements UseCase<GetProductsRequest, GetProductsResponse>
{
  constructor(
    private productsRepository: IProductsRepository,
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    userId,
    limit,
    offset,
  }: GetProductsRequest): Promise<GetProductsResponse> {
    const permissions = new Permissions(
      await this.usersRepository.permissions(userId)
    );
    const products: Omit<Product, 'createdBy'>[] = [];

    if (!permissions.has(['product:list::all', 'product:list::available'])) {
      return left(new UnauthorizedError({}));
    }

    if (limit && !offset) offset = 0;

    if (permissions.has(['product:list::all'])) {
      products.push(
        ...(await this.productsRepository.index(false, limit, offset))
      );
    }

    if (
      !permissions.has(['product:list::all']) &&
      permissions.has(['product:list::available'])
    ) {
      products.push(
        ...(await this.productsRepository.index(true, limit, offset))
      );
    }

    return right(products);
  }
}
