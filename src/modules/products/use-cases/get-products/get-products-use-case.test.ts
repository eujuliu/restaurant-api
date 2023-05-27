import { IProductsRepository } from 'modules/products/repositories/products-repository';
import { IUsersRepository } from 'modules/users/repositories/users-repository';
import {
  CreateProductRequest,
  CreateProductUseCase,
} from '../create-product/create-product-use-case';
import { CreateUserUseCase } from 'modules/users/use-cases/create-user/create-user-use-case';
import { InMemoryUsersRepository } from 'modules/users/repositories/in-memory/in-memory-users-repository';
import { InMemoryProductsRepository } from 'modules/products/repositories/in-memory/in-memory-products-repository';
import { PersistenceUser } from 'modules/users/mappers/user-map';
import { GetProductsUseCase } from './get-products-use-case';

describe('Get products (use case)', () => {
  let productsRepository: IProductsRepository;
  let usersRepository: IUsersRepository;
  let createProductUseCase: CreateProductUseCase;
  let createUserUseCase: CreateUserUseCase;
  let user: PersistenceUser;

  beforeAll(async () => {
    usersRepository = new InMemoryUsersRepository();
    productsRepository = new InMemoryProductsRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    createProductUseCase = new CreateProductUseCase(
      productsRepository,
      usersRepository
    );

    await createUserUseCase.execute({
      email: 'michael@example.com',
      firstName: 'Michael',
      lastName: 'Johnson',
      password: 'Password1!',
      phone: '1234567890',
    });

    user = (await usersRepository.findUserByEmail(
      'michael@example.com'
    )) as PersistenceUser;

    const products: CreateProductRequest[] = [
      {
        userId: user.id,
        name: 'Pizza',
        description: 'Delicious pizza with various toppings',
        price: 9.99,
        discount: 0,
        images: ['pizza1.jpg', 'pizza2.jpg'],
        available: true,
      },
      {
        userId: user.id,
        name: 'Burger',
        description: 'Juicy beef burger with cheese and veggies',
        price: 6.99,
        discount: 0.5,
        images: ['burger1.jpg', 'burger2.jpg'],
        available: true,
      },
      {
        userId: user.id,
        name: 'Salad',
        description: 'Fresh garden salad with mixed greens',
        price: 4.99,
        discount: 0,
        images: ['salad1.jpg', 'salad2.jpg'],
        available: true,
      },
      {
        userId: user.id,
        name: 'Sushi',
        description: 'Assortment of sushi rolls and sashimi',
        price: 12.99,
        discount: 0.2,
        images: ['sushi1.jpg', 'sushi2.jpg'],
        available: true,
      },
    ];

    Promise.all([
      products.forEach((product) => createProductUseCase.execute(product)),
    ]);
  });

  it('Should return a list of products', async () => {
    const getProductsUseCase = new GetProductsUseCase(
      productsRepository,
      usersRepository
    );

    const result = await getProductsUseCase.execute({ userId: user.id });

    expect(
      result.isRight() &&
        result.value.every((product) => Object.hasOwn(product, 'id'))
    ).toBe(true);
  });
});
