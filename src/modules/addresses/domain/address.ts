import { Either, left, right } from 'core/logic/either';
import { v4 as uuid } from 'uuid';
import { PostalCodeInvalidError } from './errors';
import { PostalCode } from './postal-code';

export interface AddressProps {
  address: string;
  address2?: string;
  city: string;
  country: string;
  district?: string;
  postalCode: string;
}

export class Address {
  readonly id: string;
  address: string;
  address2?: string;
  city: string;
  country: string;
  district?: string;
  postalCode: PostalCode;
  constructor(
    {
      address,
      address2,
      city,
      district,
      postalCode,
      country,
    }: Omit<Address, 'id'>,
    id?: string
  ) {
    Object.assign(this, {
      id: id || uuid(),
      address,
      address2: address2 || '',
      city,
      postalCode,
      district,
      country,
    });
  }

  static create({
    address,
    address2,
    district,
    city,
    country,
    postalCode,
  }: AddressProps): Either<PostalCodeInvalidError, Address> {
    const postalCodeOrError = PostalCode.create(postalCode);

    if (postalCodeOrError.isLeft()) {
      return left(new PostalCodeInvalidError({}));
    }

    return right(
      new Address({
        address,
        address2,
        district,
        city,
        country,
        postalCode: postalCodeOrError.value,
      })
    );
  }
}
