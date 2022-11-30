import { UpdateAddressController } from '../controllers/update-address/update-address-controller';
import { PrismaAddressRepository } from '../repositories/prisma/prisma-address-repository';
import { UpdateAddressUseCase } from '../use-cases/update-address/update-address-use-case';

export const updateAddressFactory = () => {
  const addressRepository = new PrismaAddressRepository();
  const updateAddressUseCase = new UpdateAddressUseCase(addressRepository);
  const updateAddressController = new UpdateAddressController(
    updateAddressUseCase
  );

  return updateAddressController;
};
