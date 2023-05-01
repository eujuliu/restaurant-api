import { ProductAlreadyExistsError } from 'modules/products/domain/errors';
import { InMemoryProductsRepository } from 'modules/products/repositories/in-memory/in-memory-products-repository';
import { IProductsRepository } from 'modules/products/repositories/products-repository';
import {
  CreateProductUseCase,
  type CreateProductRequest,
} from 'modules/products/use-cases/create-product/create-product-use-case';
import { PersistenceUser } from 'modules/users/mappers/user-map';
import { InMemoryUsersRepository } from 'modules/users/repositories/in-memory/in-memory-users-repository';
import { IUsersRepository } from 'modules/users/repositories/users-repository';
import { CreateUserUseCase } from 'modules/users/use-cases/create-user/create-user-use-case';

describe('Create a new product (use case)', () => {
  let productsRepository: IProductsRepository;
  let usersRepository: IUsersRepository;
  let createProductUseCase: CreateProductUseCase;
  let createUserUseCase: CreateUserUseCase;
  let productData: CreateProductRequest;

  beforeAll(async () => {
    usersRepository = new InMemoryUsersRepository();
    productsRepository = new InMemoryProductsRepository();
    createProductUseCase = new CreateProductUseCase(
      productsRepository,
      usersRepository
    );
    createUserUseCase = new CreateUserUseCase(usersRepository);

    await createUserUseCase.execute({
      email: 'janedoe@example.com',
      firstName: 'Jane',
      lastName: 'Doe',
      password: 'Password1!',
      phone: '1234567890',
    });

    const user = (await usersRepository.findUserByEmail(
      'janedoe@example.com'
    )) as PersistenceUser;

    productData = {
      userId: user.id,
      name: 'Spicy Pepperoni',
      description:
        'A classic American pizza with tomato sauce, mozzarella cheese, and spicy pepperoni sausage on a hand-tossed crust.',
      price: 12.99,
      discount: 0.2,
      images: ['https://example.com/pepperoni.jpg'],
      available: true,
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
