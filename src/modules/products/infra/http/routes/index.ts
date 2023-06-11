import { Router } from 'express';
import { CustomRequest, authenticateToken } from 'infra/http/middleware/auth';
import { createProductFactory } from 'modules/products/factories/create-product-factory';
import { deleteProductFactory } from 'modules/products/factories/delete-product-factory';
import { getProductsFactory } from 'modules/products/factories/get-products-factory';

const productRouter = Router();

productRouter.post('/products', authenticateToken, (request, response) => {
  return createProductFactory().handle(request as CustomRequest, response);
});

productRouter.get('/products', authenticateToken, (request, response) => {
  return getProductsFactory().handle(request as CustomRequest, response);
});

productRouter.delete('/product', authenticateToken, (request, response) => {
  return deleteProductFactory().handle(request as CustomRequest, response);
});

export { productRouter };
