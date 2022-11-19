import { Address } from './address';
import { PostalCodeInvalidError } from './errors';

describe('Create a new address (entity)', () => {
  it('Should be able to create an instance of Address', () => {
    const address = Address.create({
      address: 'Av. Atlântica, 2266',
      city: 'Rio de Janeiro',
      country: 'Brasil',
      district: 'Copacabana',
      postalCode: '22041-001',
    });

    expect(address.value).toHaveProperty('id');
  });

  it('Should be not able to create an instance of address with an invalid postal code', () => {
    const address = Address.create({
      address: 'Av. Atlântica, 2266',
      city: 'Rio de Janeiro',
      country: 'Brasil',
      district: 'Copacabana',
      postalCode: '11203',
    });

    expect(address.value).toStrictEqual(new PostalCodeInvalidError({}));
  });
});
