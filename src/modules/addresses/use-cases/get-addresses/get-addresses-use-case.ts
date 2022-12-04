import { ValidationError } from 'core/domain/errors';
import { UseCase } from 'core/domain/UseCase';
import { Either, left, right } from 'core/logic/either';
import { PersistenceAddress } from 'modules/addresses/mappers/address-map';
import { IAddressesRepository } from 'modules/addresses/repositories/addresses-repository';

export interface GetAddressesRequest {
  userId: string;
}

type GetAddressesResponse = Either<
  ValidationError,
  Omit<PersistenceAddress, 'userId'>[]
>;

export class GetAddressesUseCase
  implements UseCase<GetAddressesRequest, GetAddressesResponse>
{
  constructor(private addressRepository: IAddressesRepository) {}
  async execute({
    userId,
  }: GetAddressesRequest): Promise<GetAddressesResponse> {
    const addresses = await this.addressRepository.findAddressesByUserId(
      userId
    );

    if (!addresses) {
      return left(new ValidationError({ message: 'Not found any addresses' }));
    }

    return right(addresses);
  }
}
