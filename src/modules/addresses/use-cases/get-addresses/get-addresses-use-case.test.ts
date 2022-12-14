import { PersistenceAddress } from 'modules/addresses/mappers/address-map';
import { IAddressesRepository } from 'modules/addresses/repositories/addresses-repository';
import { InMemoryAddressRepository } from 'modules/addresses/repositories/in-memory/in-memory-address-repository';
import {
  CreateAddressRequest,
  CreateAddressUseCase,
} from '../create-address/create-address-use-case';
import { GetAddressesUseCase } from './get-addresses-use-case';

describe('Get addresses (use-case)', () => {
  let addressRepository: IAddressesRepository;
  let createAddressUseCase: CreateAddressUseCase;
  let getAddressesUseCase: GetAddressesUseCase;
  let addressData: CreateAddressRequest;

  beforeAll(() => {
    addressRepository = new InMemoryAddressRepository();
    createAddressUseCase = new CreateAddressUseCase(addressRepository);
    getAddressesUseCase = new GetAddressesUseCase(addressRepository);

    addressData = {
      name: 'Home',
      address: '21 Twenty-first Street',
      address2: null,
      district: 'Twenty-first',
      city: 'São Paulo',
      state: 'SP',
      postalCode: '10000-000',
      userId: '801482a1-6d71-4408-a91a-6829c62c6efd',
    };
  });

  it('Should be able to return all user addresses', async () => {
    await createAddressUseCase.execute(addressData);

    const addressesOrError = await getAddressesUseCase.execute({
      userId: addressData.userId,
    });

    const addresses = addressesOrError.value as Omit<
      PersistenceAddress,
      'userId'
    >[];

    expect(addresses[0].address).toBe(addressData.address);
  });
});
