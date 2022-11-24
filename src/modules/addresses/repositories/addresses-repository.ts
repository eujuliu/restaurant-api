import { PersistenceAddress } from '../mappers/address-map';

export interface IAddressesRepository {
  save(address: PersistenceAddress): Promise<void>;
  findAddressesByUserId(userId: string): Promise<PersistenceAddress[] | null>;
}
