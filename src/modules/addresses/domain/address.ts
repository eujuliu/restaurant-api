import { Either, left, right } from 'core/logic/either';
import { v4 as uuid } from 'uuid';
import { PostalCodeInvalidError } from './errors';
import { PostalCode } from './postal-code';
import validator from 'validator';

export interface AddressProps {
  name: string;
  address: string;
  address2: string | null;
  district: string | null;
  city: string;
  state: string | null;
  postalCode: string;
  userId: string;
}

export class Address {
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly address2: string | null;
  readonly district: string | null;
  readonly state: string | null;
  readonly city: string;
  readonly postalCode: PostalCode;
  readonly userId: string;
  readonly createdAt: string;
  readonly updatedAt: string;

  constructor(
    {
      name,
      address,
      address2,
      district,
      city,
      state,
      postalCode,
      userId,
      createdAt,
      updatedAt,
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
      state,
      postalCode,
      userId,
      createdAt,
      updatedAt,
    });
  }

  static create({
    name,
    address,
    address2,
    district,
    city,
    state,
    postalCode,
    userId,
  }: AddressProps): Either<PostalCodeInvalidError, Address> {
    const postalCodeOrError = PostalCode.create(postalCode);

    if (postalCodeOrError.isLeft()) {
      return left(new PostalCodeInvalidError({}));
    }

    if (address2 !== null && validator.isEmpty(address2)) address2 = null;
    if (district !== null && validator.isEmpty(district)) district = null;
    if (state !== null && validator.isEmpty(state)) state = null;

    return right(
      new Address({
        name,
        address,
        address2,
        district,
        city,
        state,
        userId,
        createdAt: new Date().toJSON(),
        updatedAt: new Date().toJSON(),
        postalCode: postalCodeOrError.value,
      })
    );
  }
}
