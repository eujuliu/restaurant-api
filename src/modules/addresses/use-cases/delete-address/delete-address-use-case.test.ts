import { IAddressesRepository } from 'modules/addresses/repositories/addresses-repository';
import { InMemoryAddressRepository } from 'modules/addresses/repositories/in-memory/in-memory-address-repository';
import {
  CreateAddressRequest,
  CreateAddressUseCase,
} from '../create-address/create-address-use-case';
import { DeleteAddressUseCase } from './delete-address-use-case';
import { v4 as uuid } from 'uuid';
import { ValidationError } from 'core/domain/errors';

describe('Delete address (use-case)', () => {
  let addressRepository: IAddressesRepository;
  let createAddressUseCase: CreateAddressUseCase;
  let addressData: CreateAddressRequest;
  let deleteAddressUseCase: DeleteAddressUseCase;

  beforeAll(async () => {
    addressRepository = new InMemoryAddressRepository();
    createAddressUseCase = new CreateAddressUseCase(addressRepository);
    deleteAddressUseCase = new DeleteAddressUseCase(addressRepository);

    addressData = {
      name: 'Home',
      address: '23, Twenty-third Street',
      address2: null,
      district: 'Twenty-third',
      city: 'São Paulo',
      state: 'SP',
      postalCode: '10000-000',
      userId: '801482a1-6d71-4408-a91a-6829c62c6efd',
    };

    await createAddressUseCase.execute(addressData);
  });
  it('Should be able to delete an address', async () => {
    const addresses = await addressRepository.findAddressesByUserId(
      addressData.userId
    );

    await deleteAddressUseCase.execute({ id: addresses[0].id });

    const address = await addressRepository.findAddressById(addresses[0].id);

    expect(address).toBe(null);
  });

  it('Should be not able to delete a non existing address', async () => {
    const responseOrError = await deleteAddressUseCase.execute({ id: uuid() });

    expect(responseOrError.value).toStrictEqual(
      new ValidationError({ message: 'Not found any address with this id' })
    );
  });
});
