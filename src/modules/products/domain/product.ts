import { ValidationError } from 'core/domain/errors';
import { Either, left, right } from 'core/logic/either';
import { v4 as uuid } from 'uuid';
import isURL from 'validator/lib/isURL';
import { InvalidImageUrlError } from './errors';

export interface ProductDataProps {
  name: string;
  description: string;
  price: number;
  discount: number | null;
  images: string[];
}

export class Product {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly discount: number | null;
  readonly createdAt: string;
  readonly images: string[];
  readonly updatedAt: string;

  constructor(
    {
      name,
      description,
      price,
      discount,
      createdAt,
      updatedAt,
      images,
    }: Omit<Product, 'id'>,
    id?: string
  ) {
    Object.assign(this, {
      id: id || uuid(),
      name,
      description,
      price,
      discount,
      createdAt,
      updatedAt,
      images,
    });
  }

  static create({
    name,
    description,
    price,
    discount,
    images,
  }: ProductDataProps): Either<
    InvalidImageUrlError | ValidationError,
    Product
  > {
    if (price === 0) {
      return left(
        new ValidationError({
          message: `You pass an invalid price`,
          action: 'Change the price and try again',
        })
      );
    }

    if (discount && (discount / 100) * price > price * 0.6) {
      return left(
        new ValidationError({
          message: `You pass an invalid discount, you can't discount more than 60% of the price`,
          action: 'Change the discount and try again',
        })
      );
    }

    if (description.length > 600) {
      return left(
        new ValidationError({
          message: 'The description is too long',
          action: 'Short the description and try again',
        })
      );
    }

    const invalidUrls = images.filter((url) => !isURL(url));

    if (invalidUrls.length > 0) {
      return left(
        new InvalidImageUrlError({
          message: `The url(s): ${invalidUrls.join(', ')} is not valid(s)`,
        })
      );
    }

    return right(
      new Product({
        name,
        description,
        price,
        discount,
        createdAt: new Date().toJSON(),
        updatedAt: new Date().toJSON(),
        images,
      })
    );
  }
}
