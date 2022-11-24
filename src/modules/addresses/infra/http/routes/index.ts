import { Router } from 'express';
import { createAddressFactory } from 'modules/addresses/factories/create-address-factory';

const addressRouter = Router();

addressRouter.post('/addresses', (request, response) => {
  return createAddressFactory().handle(request, response);
});

export { addressRouter };
