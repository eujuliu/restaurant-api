import { AddressAlreadyRegisteredError } from 'modules/addresses/domain/errors';
import { PersistenceAddress } from 'modules/addresses/mappers/address-map';
import { IAddressesRepository } from 'modules/addresses/repositories/addresses-repository';
import { InMemoryAddressRepository } from 'modules/addresses/repositories/in-memory/in-memory-address-repository';
import {
  CreateAddressRequest,
  CreateAddressUseCase,
} from './create-address-use-case';

describe('Create a new address (use-case)', () => {
  let addressRepository: IAddressesRepository;
  let createAddressUseCase: CreateAddressUseCase;
  let addressData: CreateAddressRequest;

  beforeAll(() => {
    addressRepository = new InMemoryAddressRepository();
    createAddressUseCase = new CreateAddressUseCase(addressRepository);
    addressData = {
      name: 'Home',
      address: 'R. Farme de Amoedo, 16',
      address2: '',
      district: 'Ipanema',
      city: 'Rio de Janeiro',
      postalCode: '22420-020',
      userId: '801482a1-6d71-4408-a91a-6829c62c6efd',
    };
  });

  it('Should be able to add a new address', async () => {
    await createAddressUseCase.execute(addressData);

    const addresses = (await addressRepository.findAddressesByUserId(
      addressData.userId
    )) as PersistenceAddress[];

    expect(addresses[0].address).toBe(addressData.address);
  });

  it('Should be not able to add a existing address', async () => {
    const response = await createAddressUseCase.execute(addressData);

    expect(response.value).toStrictEqual(new AddressAlreadyRegisteredError({}));
  });
});
