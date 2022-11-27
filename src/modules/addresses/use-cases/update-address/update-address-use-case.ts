import { ResourceNotFoundError, ValidationError } from 'core/domain/errors';
import { UseCase } from 'core/domain/UseCase';
import { Either, left, right } from 'core/logic/either';
import { PostalCode } from 'modules/addresses/domain/postal-code';
import { IAddressesRepository } from 'modules/addresses/repositories/addresses-repository';

export interface UpdateAddressRequest {
  id: string;
  name?: string;
  address?: string;
  address2?: string;
  district?: string;
  city?: string;
  postalCode?: string;
}

type UpdateAddressResponse = Either<
  ResourceNotFoundError | ValidationError,
  null | void
>;

export class UpdateAddressUseCase
  implements UseCase<UpdateAddressRequest, UpdateAddressResponse>
{
  constructor(private addressRepository: IAddressesRepository) {}
  async execute({
    id,
    name,
    address,
    address2,
    district,
    city,
    postalCode,
  }: UpdateAddressRequest): Promise<UpdateAddressResponse> {
    const addressExists = await this.addressRepository.findAddressById(id);

    if (!addressExists) {
      return left(new ResourceNotFoundError({}));
    }

    if (postalCode) {
      const postalCodeOrError = PostalCode.create(postalCode);

      if (postalCodeOrError.isLeft()) {
        return left(new ValidationError({}));
      }

      await this.addressRepository.update(id, {
        postalCode: postalCodeOrError.value.value,
      });

      return right(null);
    }

    await this.addressRepository.update(id, {
      name,
      address,
      address2,
      district,
      city,
    });

    return right(null);
  }
}
