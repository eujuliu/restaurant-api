import { UseCase } from 'core/domain/UseCase';
import { InternalServerError } from 'core/domain/errors';
import { Either, left, right } from 'core/logic/either';
import { ProductAlreadyExistsError } from 'modules/products/domain/errors';
import { IProductsRepository } from 'modules/products/repositories/products-repository';
import { Product } from 'modules/products/domain/product';
import { IUsersRepository } from 'modules/users/repositories/users-repository';
import { Permissions } from 'modules/users/domain/permissions';
import { PermissionsError } from 'modules/users/domain/errors';

export interface CreateProductRequest {
  userId: string;
  name: string;
  price: number;
  description: string;
  discount: number | null;
  images: string[];
  available: boolean;
}

type CreateProductResponse = Either<
  ProductAlreadyExistsError | InternalServerError,
  void | null
>;

export class CreateProductUseCase
  implements UseCase<CreateProductRequest, CreateProductResponse>
{
  constructor(
    private productsRepository: IProductsRepository,
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    userId,
    name,
    description,
    price,
    discount,
    images,
    available,
  }: CreateProductRequest): Promise<CreateProductResponse> {
    const permissions = new Permissions(
      await this.usersRepository.permissions(userId)
    );
    const productExists = await this.productsRepository.exists(name);

    if (!permissions.has(['product:add'])) {
      return left(new PermissionsError({}));
    }

    if (productExists) {
      return left(new ProductAlreadyExistsError({}));
    }

    const productOrError = Product.create({
      name,
      description,
      price,
      discount,
      images,
      available,
      createdBy: userId,
    });

    if (productOrError.isLeft()) {
      return left(productOrError.value);
    }

    const product: Product = productOrError.value;

    await this.productsRepository.save(product);

    return right(null);
  }
}
