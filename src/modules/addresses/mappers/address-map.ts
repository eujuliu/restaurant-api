import { Address } from '../domain/address';
import { PostalCode } from '../domain/postal-code';

export interface PersistenceAddress {
  id: string;
  name: string;
  address: string;
  address2: string;
  district: string;
  city: string;
  postalCode: string;
  userId: string;
}

export class AddressMap {
  static toPersistence({
    id,
    name,
    address,
    address2,
    district,
    city,
    postalCode,
    userId,
  }: Address): PersistenceAddress {
    return {
      id,
      name,
      address,
      address2,
      district,
      city,
      postalCode: postalCode.value,
      userId,
    };
  }

  static toDomain({
    id,
    name,
    address,
    address2,
    district,
    city,
    postalCode,
    userId,
  }: PersistenceAddress): Address {
    const postalCodeOrError = PostalCode.create(postalCode);

    const domainAddress = new Address(
      {
        name,
        address,
        address2,
        district,
        city,
        postalCode: postalCodeOrError.value as PostalCode,
        userId,
      },
      id
    );

    return domainAddress;
  }
}
