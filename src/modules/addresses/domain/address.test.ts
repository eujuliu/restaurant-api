import { Address } from './address';
import { PostalCodeInvalidError } from './errors';
import { v4 as uuid } from 'uuid';

describe('Create a new address (entity)', () => {
  it('Should be able to create an instance of Address', () => {
    const addressOrError = Address.create({
      name: 'Home',
      address: 'Av. Atlântica, 2266',
      address2: null,
      city: 'Rio de Janeiro',
      district: 'Copacabana',
      state: 'RJ',
      postalCode: '22041-001',
      userId: uuid(),
    });

    expect(addressOrError.value).toBeInstanceOf(Address);
    expect(addressOrError.value).toHaveProperty('id');
    expect(addressOrError.value).toHaveProperty('createdAt');
    expect(addressOrError.value).toHaveProperty('updatedAt');
  });

  it('Should be not able to create an instance of address with an invalid postal code', () => {
    const addressOrError = Address.create({
      name: 'Home',
      address: 'Av. Atlântica, 2266',
      address2: null,
      city: 'Rio de Janeiro',
      district: 'Copacabana',
      state: 'RJ',
      postalCode: '11203',
      userId: uuid(),
    });

    expect(addressOrError.value).toStrictEqual(new PostalCodeInvalidError({}));
  });
});
