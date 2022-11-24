import { UseCase } from 'core/domain/UseCase';
import { Either, left, right } from 'core/logic/either';
import { Address } from 'modules/addresses/domain/address';
import {
  AddressAlreadyRegisteredError,
  PostalCodeInvalidError,
} from 'modules/addresses/domain/errors';
import { AddressMap } from 'modules/addresses/mappers/address-map';
import { IAddressesRepository } from 'modules/addresses/repositories/addresses-repository';

export interface CreateAddressRequest {
  name: string;
  address: string;
  address2: string;
  district: string;
  city: string;
  postalCode: string;
  userId: string;
}

type CreateAddressResponse = Either<
  PostalCodeInvalidError | AddressAlreadyRegisteredError,
  null | void
>;

export class CreateAddressUseCase
  implements UseCase<CreateAddressRequest, CreateAddressResponse>
{
  constructor(private addressRepository: IAddressesRepository) {}

  async execute({
    name,
    address,
    address2,
    district,
    city,
    postalCode,
    userId,
  }: CreateAddressRequest): Promise<CreateAddressResponse> {
    const addresses = await this.addressRepository.findAddressesByUserId(
      userId
    );
    const addressAlreadyRegistered = addresses?.some(
      (address) => address.postalCode === postalCode || address.name === name
    );

    if (addressAlreadyRegistered) {
      return left(new AddressAlreadyRegisteredError({}));
    }

    const addressOrError = Address.create({
      name,
      address,
      address2,
      district,
      city,
      postalCode,
      userId,
    });

    if (addressOrError.isLeft()) {
      return left(addressOrError.value);
    }

    const persistenceAddress = AddressMap.toPersistence(addressOrError.value);

    this.addressRepository.save(persistenceAddress);

    return right(null);
  }
}
