import { PersistenceAddress } from 'modules/addresses/mappers/address-map';
import { IAddressesRepository, updateData } from '../addresses-repository';

export class InMemoryAddressRepository implements IAddressesRepository {
  private addresses: PersistenceAddress[] = [];
  async save(address: PersistenceAddress): Promise<void> {
    this.addresses.push(address);
  }

  async findAddressesByUserId(
    userId: string
  ): Promise<Omit<PersistenceAddress, 'userId'>[]> {
    const addresses = this.addresses
      .filter((address) => address.userId === userId)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(({ userId, ...rest }) => rest);

    return addresses;
  }

  async findAddressById(id: string): Promise<PersistenceAddress> {
    const address = this.addresses.filter((address) => address.id === id)[0];

    return address || null;
  }

  async update(
    id: string,
    { name, address, address2, district, city, postalCode }: updateData
  ): Promise<void> {
    const addressForUpdate = this.addresses.filter(
      (address) => address.id === id
    )[0];

    Object.assign(addressForUpdate, {
      name,
      address,
      address2,
      district,
      city,
      postalCode,
    });
  }
}
