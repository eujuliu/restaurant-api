import { Router } from 'express';
import { CustomRequest, authenticateToken } from 'infra/http/middleware/auth';
import { createAddressFactory } from 'modules/addresses/factories/create-address-factory';
import { deleteAddressFactory } from 'modules/addresses/factories/delete-address-factory';
import { getAddressesFactory } from 'modules/addresses/factories/get-addresses-factory';
import { updateAddressFactory } from 'modules/addresses/factories/update-address-factory';

const addressRouter = Router();

addressRouter.post('/addresses', authenticateToken, (request, response) => {
  return createAddressFactory().handle(request as CustomRequest, response);
});

addressRouter.put('/address', authenticateToken, (request, response) => {
  return updateAddressFactory().handle(request, response);
});

addressRouter.get('/addresses', authenticateToken, (request, response) => {
  return getAddressesFactory().handle(request as CustomRequest, response);
});

addressRouter.delete('/address', authenticateToken, (request, response) => {
  return deleteAddressFactory().handle(request, response);
});

export { addressRouter };
