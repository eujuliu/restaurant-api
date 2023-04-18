import { ProductAlreadyExistsError } from 'modules/products/domain/errors';
import { InMemoryProductsRepository } from 'modules/products/repositories/in-memory/in-memory-products-repository';
import { IProductsRepository } from 'modules/products/repositories/products-repository';
import {
  CreateProductUseCase,
  type CreateProductRequest,
} from 'modules/products/use-cases/create-product/create-product-use-case';

describe('Create a new product (use case)', () => {
  let productsRepository: IProductsRepository;
  let createProductUseCase: CreateProductUseCase;
  let productData: CreateProductRequest;

  beforeAll(() => {
    productsRepository = new InMemoryProductsRepository();
    createProductUseCase = new CreateProductUseCase(productsRepository);
    productData = {
      name: 'Spicy Pepperoni',
      description:
        'A classic American pizza with tomato sauce, mozzarella cheese, and spicy pepperoni sausage on a hand-tossed crust.',
      price: 12.99,
      discount: 0.2,
      images: ['https://example.com/pepperoni.jpg'],
    };
  });

  it('Should be able to create a new product', async () => {
    const productOrError = await createProductUseCase.execute(productData);

    const productExists = await productsRepository.exists(productData.name);

    expect(productOrError.value).toBeNull();
    expect(productExists).toBeTruthy();
  });

  it('Should be not able to create an existing product', async () => {
    await createProductUseCase.execute(productData);

    const productOrError = await createProductUseCase.execute(productData);

    expect(productOrError.value).toStrictEqual(
      new ProductAlreadyExistsError({})
    );
  });
});
