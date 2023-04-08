import { PersistenceAddress } from '../mappers/address-map';

export interface updateData {
  name?: string;
  address?: string;
  address2?: string;
  district?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  updated_at: string;
}

export interface IAddressesRepository {
  save(address: PersistenceAddress): Promise<void>;
  findAddressesByUserId(
    userId: string
  ): Promise<Omit<PersistenceAddress, 'userId'>[]>;
  findAddressById(id: string): Promise<PersistenceAddress | null>;
  update(id: string, data: updateData): Promise<void>;
  delete(id: string): Promise<void>;
}
