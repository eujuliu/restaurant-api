import { Address } from './address';

test('Should be able to create a instance of Address', () => {
  const address = new Address({
    address: 'Av. Gen. San Martin, 856',
    city: 'Rio de Janeiro',
    country: 'Brasil',
    district: 'Leblon',
    postalCode: '22441014',
  });

  expect(address).toHaveProperty('id');
  expect(address.address).toBe('Av. Gen. San Martin, 856');
});
