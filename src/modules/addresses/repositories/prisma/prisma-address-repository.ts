import { prisma } from 'infra/prisma/client';
import { PersistenceAddress } from 'modules/addresses/mappers/address-map';
import { IAddressesRepository } from '../addresses-repository';

export class PrismaAddressRepository implements IAddressesRepository {
  async save({
    id,
    name,
    address,
    address2,
    district,
    city,
    postalCode,
    userId,
  }: PersistenceAddress): Promise<void> {
    await prisma.address.create({
      data: {
        id,
        name,
        address,
        address2,
        district,
        city,
        postalCode,
        userId,
      },
    });
  }

  async findAddressesByUserId(
    userId: string
  ): Promise<PersistenceAddress[] | null> {
    const addresses = await prisma.address.findMany({
      where: {
        userId,
      },
    });

    return addresses;
  }
}
