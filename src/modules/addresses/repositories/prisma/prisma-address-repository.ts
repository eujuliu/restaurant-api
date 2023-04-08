import { prisma } from 'infra/prisma/client';
import { PersistenceAddress } from 'modules/addresses/mappers/address-map';
import { IAddressesRepository, updateData } from '../addresses-repository';

export class PrismaAddressRepository implements IAddressesRepository {
  async save({
    id,
    name,
    address,
    address2,
    district,
    city,
    state,
    postalCode,
    userId,
    created_at,
    updated_at,
  }: PersistenceAddress): Promise<void> {
    await prisma.address.create({
      data: {
        id,
        name,
        address,
        address2,
        district,
        city,
        state,
        postalCode,
        userId,
        created_at,
        updated_at,
      },
    });
  }

  async findAddressesByUserId(
    userId: string
  ): Promise<Omit<PersistenceAddress, 'userId'>[]> {
    const addresses = await prisma.address.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        address: true,
        address2: true,
        district: true,
        city: true,
        state: true,
        postalCode: true,
        created_at: true,
        updated_at: true,
      },
    });

    return addresses;
  }

  async findAddressById(id: string): Promise<PersistenceAddress | null> {
    const address = await prisma.address.findUnique({
      where: {
        id,
      },
    });

    return address;
  }

  async update(
    id: string,
    {
      name,
      address,
      address2,
      city,
      district,
      state,
      postalCode,
      updated_at,
    }: updateData
  ): Promise<void> {
    await prisma.address.update({
      where: {
        id,
      },
      data: {
        name,
        address,
        address2,
        city,
        district,
        state,
        postalCode,
        updated_at,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.address.delete({
      where: {
        id,
      },
    });
  }
}
