import { Router } from 'express';
import { createAddressFactory } from 'modules/addresses/factories/create-address-factory';
import { deleteAddressFactory } from 'modules/addresses/factories/delete-address-factory';
import { getAddressesFactory } from 'modules/addresses/factories/get-addresses-factory';
import { updateAddressFactory } from 'modules/addresses/factories/update-address-factory';

const addressRouter = Router();

addressRouter.post('/addresses', (request, response) => {
  return createAddressFactory().handle(request, response);
});

addressRouter.put('/address', (request, response) => {
  return updateAddressFactory().handle(request, response);
});

addressRouter.get('/addresses', (request, response) => {
  return getAddressesFactory().handle(request, response);
});

addressRouter.delete('/address', (request, response) => {
  return deleteAddressFactory().handle(request, response);
});

export { addressRouter };
