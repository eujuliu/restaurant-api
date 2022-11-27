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
      address: 'R. Caranguejo, 113',
      address2: null,
      district: 'Perequê',
      city: 'Ilhabela',
      state: 'SP',
      postalCode: '11630-000',
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
      address: 'Rua Ana Virtebo de Souza, 305',
    });

    const addressesUpdated = await addressRepository.findAddressesByUserId(
      addressData.userId
    );

    expect(addressesUpdated[0].address).toBe('Rua Ana Virtebo de Souza, 305');
  });

  it('Should be not able to update a non existing address', async () => {
    const response = await updateAddressUseCase.execute({
      id: '208682a1-6d39-4408-a91a-6859c62c6fed',
      address: 'Rua Ana Virtebo de Souza, 305',
    });

    expect(response.value).toStrictEqual(new ResourceNotFoundError({}));
  });
});
