import { CreateAddressController } from '../controllers/create-address/create-address-controller';
import { PrismaAddressRepository } from '../repositories/prisma/prisma-address-repository';
import { CreateAddressUseCase } from '../use-cases/create-address/create-address-use-case';

export const createAddressFactory = () => {
  const addressRepository = new PrismaAddressRepository();
  const createAddressUseCase = new CreateAddressUseCase(addressRepository);
  const createAddressController = new CreateAddressController(
    createAddressUseCase
  );

  return createAddressController;
};
