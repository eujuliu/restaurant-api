import { IProductsRepository } from 'modules/products/repositories/products-repository';
import { IUsersRepository } from 'modules/users/repositories/users-repository';
import { CreateUserUseCase } from 'modules/users/use-cases/create-user/create-user-use-case';
import { CreateProductUseCase } from '../create-product/create-product-use-case';
import { InMemoryUsersRepository } from 'modules/users/repositories/in-memory/in-memory-users-repository';
import { InMemoryProductsRepository } from 'modules/products/repositories/in-memory/in-memory-products-repository';
import { PersistenceUser } from 'modules/users/mappers/user-map';
import { DeleteProductUseCase } from './delete-product-use-case';
import { ProductNotFoundError } from 'modules/products/domain/errors';

describe('Delete a product (use-case)', () => {
  let usersRepository: IUsersRepository;
  let productsRepository: IProductsRepository;
  let createUserUseCase: CreateUserUseCase;
  let createProductUseCase: CreateProductUseCase;
  let user: PersistenceUser;

  beforeAll(async () => {
    usersRepository = new InMemoryUsersRepository();
    productsRepository = new InMemoryProductsRepository();
    createProductUseCase = new CreateProductUseCase(
      productsRepository,
      usersRepository
    );
    createUserUseCase = new CreateUserUseCase(usersRepository);

    await createUserUseCase.execute({
      email: 'mike@example.com',
      firstName: 'Mike',
      lastName: 'Johnson',
      password: 'Secret#123',
      phone: '1234567890',
    });

    user = (await usersRepository.findUserByEmail(
      'mike@example.com'
    )) as PersistenceUser;

    await createProductUseCase.execute({
      userId: user.id,
      name: 'Cheeseburger 2',
      description:
        'A juicy beef patty topped with melted cheese, fresh lettuce, ripe tomatoes, and tangy pickles, served on a sesame seed bun.',
      price: 9.99,
      discount: 0.1,
      images: ['https://example.com/cheeseburger.jpg'],
      available: true,
    });
  });

  it('Should be able to delete a product', async () => {
    const deleteProductUseCase = new DeleteProductUseCase(
      productsRepository,
      usersRepository
    );
    const products = await productsRepository.index(false);

    const responseOrError = await deleteProductUseCase.execute({
      criteria: [products[0].id],
      userId: user.id,
    });

    expect(responseOrError.value).toBe('Product(s) deleted successfully');
  });

  it('Should be not able to delete a non-existing product', async () => {
    const deleteProductUseCase = new DeleteProductUseCase(
      productsRepository,
      usersRepository
    );
    const responseOrError = await deleteProductUseCase.execute({
      criteria: ['328129804281481'],
      userId: user.id,
    });

    expect(responseOrError.value).toStrictEqual(new ProductNotFoundError({}));
  });
});
