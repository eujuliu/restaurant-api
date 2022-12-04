import { DeleteAddressController } from '../controllers/delete-address/delete-address-controller';
import { PrismaAddressRepository } from '../repositories/prisma/prisma-address-repository';
import { DeleteAddressUseCase } from '../use-cases/delete-address/delete-address-use-case';

export const deleteAddressFactory = () => {
  const addressesRepository = new PrismaAddressRepository();
  const deleteAddressUseCase = new DeleteAddressUseCase(addressesRepository);
  const deleteAddressController = new DeleteAddressController(
    deleteAddressUseCase
  );

  return deleteAddressController;
};
