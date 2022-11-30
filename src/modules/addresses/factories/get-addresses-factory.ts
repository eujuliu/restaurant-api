import { GetAddressesController } from '../controllers/get-addresses/get-addresses-controller';
import { PrismaAddressRepository } from '../repositories/prisma/prisma-address-repository';
import { GetAddressesUseCase } from '../use-cases/get-addresses/get-addresses-use-case';

export const getAddressesFactory = () => {
  const addressRepository = new PrismaAddressRepository();
  const getAddressesUseCase = new GetAddressesUseCase(addressRepository);
  const getAddressesController = new GetAddressesController(
    getAddressesUseCase
  );

  return getAddressesController;
};
