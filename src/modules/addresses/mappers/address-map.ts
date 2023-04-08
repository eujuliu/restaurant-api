import { Address } from '../domain/address';
import { PostalCode } from '../domain/postal-code';

export interface PersistenceAddress {
  id: string;
  name: string;
  address: string;
  address2: string | null;
  district: string | null;
  city: string;
  state: string | null;
  postalCode: string;
  userId: string;
  created_at: string;
  updated_at: string;
}

export class AddressMap {
  static toPersistence({
    id,
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
  }: Address): PersistenceAddress {
    return {
      id,
      name,
      address,
      address2,
      district,
      city,
      state,
      postalCode: postalCode.value,
      userId,
      created_at: createdAt,
      updated_at: updatedAt,
    };
  }

  static toDomain({
    id,
    name,
    address,
    address2,
    district,
    city,
    state,
    postalCode,
    userId,
    created_at,
    updated_at,
  }: PersistenceAddress): Address {
    const postalCodeOrError = PostalCode.create(postalCode);

    const domainAddress = new Address(
      {
        name,
        address,
        address2,
        district,
        city,
        state,
        postalCode: postalCodeOrError.value as PostalCode,
        userId,
        createdAt: created_at,
        updatedAt: updated_at,
      },
      id
    );

    return domainAddress;
  }
}
