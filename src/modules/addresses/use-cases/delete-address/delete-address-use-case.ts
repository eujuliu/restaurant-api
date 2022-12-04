import { ValidationError } from 'core/domain/errors';
import { UseCase } from 'core/domain/UseCase';
import { Either, left, right } from 'core/logic/either';
import { IAddressesRepository } from 'modules/addresses/repositories/addresses-repository';

interface DeleteAddressRequest {
  id: string;
}

type DeleteAddressResponse = Either<ValidationError, null>;

export class DeleteAddressUseCase
  implements UseCase<DeleteAddressRequest, DeleteAddressResponse>
{
  constructor(private addressesRepository: IAddressesRepository) {}
  async execute({ id }: DeleteAddressRequest): Promise<DeleteAddressResponse> {
    const address = await this.addressesRepository.findAddressById(id);

    if (!address) {
      return left(
        new ValidationError({ message: 'Not found any address with this id' })
      );
    }

    await this.addressesRepository.delete(id);

    return right(null);
  }
}
