import { Address } from './address';
import { PostalCodeInvalidError } from './errors';
import { v4 as uuid } from 'uuid';

describe('Create a new address (entity)', () => {
  it('Should be able to create an instance of Address', () => {
    const address = Address.create({
      name: 'Home',
      address: 'Av. Atlântica, 2266',
      address2: null,
      city: 'Rio de Janeiro',
      district: 'Copacabana',
      state: 'RJ',
      postalCode: '22041-001',
      userId: uuid(),
    });

    expect(address.value).toHaveProperty('id');
  });

  it('Should be not able to create an instance of address with an invalid postal code', () => {
    const address = Address.create({
      name: 'Home',
      address: 'Av. Atlântica, 2266',
      address2: null,
      city: 'Rio de Janeiro',
      district: 'Copacabana',
      state: 'RJ',
      postalCode: '11203',
      userId: uuid(),
    });

    expect(address.value).toStrictEqual(new PostalCodeInvalidError({}));
  });
});
