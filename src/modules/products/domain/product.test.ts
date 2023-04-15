import { ValidationError } from 'core/domain/errors';
import { Product, ProductDataProps } from './product';
import { InvalidImageUrlError } from './errors';

describe('Create a new product (entity)', () => {
  let productData: ProductDataProps;

  beforeAll(() => {
    productData = {
      name: 'Classic Margherita',
      description:
        'A traditional Neapolitan pizza with tomato sauce, fresh mozzarella cheese, and fresh basil leaves on a thin and crispy crust.',
      price: 10.99,
      discount: 0,
      images: ['https://example.com/margherita.jpg'],
    };
  });

  it('Should be able to create a new product', () => {
    const productOrError = Product.create(productData);

    expect(productOrError.value).toBeInstanceOf(Product);
    expect(productOrError.value).toHaveProperty('id');
    expect(productOrError.value).toHaveProperty('createdAt');
    expect(productOrError.value).toHaveProperty('updatedAt');
  });

  it('Should be not able to create a product with price equal to 0', () => {
    const productOrError = Product.create({ ...productData, price: 0 });

    expect(productOrError.value).toStrictEqual(
      new ValidationError({
        message: `You pass an invalid price`,
        action: 'Change the price and try again',
      })
    );
  });

  it('Should be not able to add a product with invalid image url', () => {
    const invalidUrls = ['picsu/300', 'picsuotos/200/300'];

    const productOrError = Product.create({
      ...productData,
      images: invalidUrls,
    });

    expect(productOrError.value).toStrictEqual(
      new InvalidImageUrlError({
        message: `The url(s): ${invalidUrls.join(', ')} is not valid(s)`,
      })
    );
  });

  it('Should be not able to create a product with discount greater than the product price', () => {
    const productOrError = Product.create({ ...productData, discount: 70 });

    expect(productOrError.value).toStrictEqual(
      new ValidationError({
        message: `You pass an invalid discount, you can't discount more than 60% of the price`,
        action: 'Change the discount and try again',
      })
    );
  });
});
