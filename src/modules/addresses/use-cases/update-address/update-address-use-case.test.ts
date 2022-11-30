import { ResourceNotFoundError } from 'core/domain/errors';
import { IAddressesRepository } from 'modules/addresses/repositories/addresses-repository';
import { InMemoryAddressRepository } from 'modules/addresses/repositories/in-memory/in-memory-address-repository';
import {
  CreateAddressRequest,
  CreateAddressUseCase,
} from '../create-address/create-address-use-case';
import { UpdateAddressUseCase } from './update-address-use-case';

describe('Update address (use-case)', () => {
  let addressRepository: IAddressesRepository;
  let createAddressUseCase: CreateAddressUseCase;
  let updateAddressUseCase: UpdateAddressUseCase;
  let addressData: CreateAddressRequest;

  beforeAll(() => {
    addressRepository = new InMemoryAddressRepository();
    createAddressUseCase = new CreateAddressUseCase(addressRepository);
    updateAddressUseCase = new UpdateAddressUseCase(addressRepository);

    addressData = {
      name: 'Home',
      address: '222, Twenty-second Street',
      address2: null,
      district: 'Twenty-second',
      city: 'São Paulo',
      state: 'SP',
      postalCode: '10000-000',
      userId: '801482a1-6d71-4408-a91a-6829c62c6efd',
    };
  });

  it('Should be able to update the address', async () => {
    await createAddressUseCase.execute(addressData);
    const addressesNotUpdated = await addressRepository.findAddressesByUserId(
      addressData.userId
    );

    await updateAddressUseCase.execute({
      id: addressesNotUpdated[0].id,
      address: '22, Twenty-second Street',
    });

    const addressesUpdated = await addressRepository.findAddressesByUserId(
      addressData.userId
    );

    expect(addressesUpdated[0].address).toBe('22, Twenty-second Street');
  });

  it('Should be not able to update a non existing address', async () => {
    const response = await updateAddressUseCase.execute({
      id: '208682a1-6d39-4408-a91a-6859c62c6fed',
      address: '22, Twenty-second Street',
    });

    expect(response.value).toStrictEqual(new ResourceNotFoundError({}));
  });
});
