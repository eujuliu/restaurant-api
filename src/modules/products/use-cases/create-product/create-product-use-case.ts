import { UseCase } from 'core/domain/UseCase';
import { InternalServerError } from 'core/domain/errors';
import { Either, left, right } from 'core/logic/either';
import { ProductAlreadyExistsError } from 'modules/products/domain/errors';
import { IProductsRepository } from 'modules/products/repositories/products-repository';
import { Product } from 'modules/products/domain/product';

export interface CreateProductRequest {
  name: string;
  price: number;
  description: string;
  discount: number | null;
  images: string[];
}

type CreateProductResponse = Either<
  ProductAlreadyExistsError | InternalServerError,
  void | null
>;

export class CreateProductUseCase
  implements UseCase<CreateProductRequest, CreateProductResponse>
{
  constructor(private productsRepository: IProductsRepository) {}

  async execute({
    name,
    description,
    price,
    discount,
    images,
  }: CreateProductRequest): Promise<CreateProductResponse> {
    const productExists = await this.productsRepository.exists(name);

    if (productExists) {
      return left(new ProductAlreadyExistsError({}));
    }

    const productOrError = Product.create({
      name,
      description,
      price,
      discount,
      images,
    });

    if (productOrError.isLeft()) {
      return left(productOrError.value);
    }

    const product: Product = productOrError.value;

    this.productsRepository.save(product);

    return right(null);
  }
}
