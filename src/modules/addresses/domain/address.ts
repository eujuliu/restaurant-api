import { Either, left, right } from 'core/logic/either';
import { v4 as uuid } from 'uuid';
import { PostalCodeInvalidError } from './errors';
import { PostalCode } from './postal-code';

export interface AddressProps {
  name: string;
  address: string;
  address2: string;
  district: string;
  city: string;
  postalCode: string;
  userId: string;
}

export class Address {
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly address2: string;
  readonly district: string;
  readonly city: string;
  readonly postalCode: PostalCode;
  readonly userId: string;
  constructor(
    {
      name,
      address,
      address2,
      district,
      city,
      postalCode,
      userId,
    }: Omit<Address, 'id'>,
    id?: string
  ) {
    Object.assign(this, {
      id: id || uuid(),
      name,
      address,
      address2,
      district,
      city,
      postalCode,
      userId,
    });
  }

  static create({
    name,
    address,
    address2,
    district,
    city,
    postalCode,
    userId,
  }: AddressProps): Either<PostalCodeInvalidError, Address> {
    const postalCodeOrError = PostalCode.create(postalCode);

    if (postalCodeOrError.isLeft()) {
      return left(new PostalCodeInvalidError({}));
    }

    return right(
      new Address({
        name,
        address,
        address2,
        district,
        city,
        userId,
        postalCode: postalCodeOrError.value,
      })
    );
  }
}
