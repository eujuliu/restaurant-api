import { PersistenceAddress } from 'modules/addresses/mappers/address-map';
import { IAddressesRepository } from '../addresses-repository';

export class InMemoryAddressRepository implements IAddressesRepository {
  private addresses: PersistenceAddress[] = [];
  async save(address: PersistenceAddress): Promise<void> {
    this.addresses.push(address);
  }

  async findAddressesByUserId(
    userId: string
  ): Promise<PersistenceAddress[] | null> {
    const addresses = this.addresses.filter(
      (address) => address.userId === userId
    );

    return addresses || null;
  }
}
