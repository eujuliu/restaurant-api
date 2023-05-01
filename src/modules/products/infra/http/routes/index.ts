import { Router } from 'express';
import { CustomRequest, authenticateToken } from 'infra/http/middleware/auth';
import { createProductFactory } from 'modules/products/factories/create-product-factory';

const productRouter = Router();

productRouter.post('/products', authenticateToken, (request, response) => {
  return createProductFactory().handle(request as CustomRequest, response);
});

export { productRouter };
