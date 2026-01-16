import { Router } from 'express';
import { addressRouter } from 'modules/addresses/infra/http/routes';
import { productRouter } from 'modules/products/infra/http/routes';
import { userRouter } from 'modules/users/infra/http/routes';

const router = Router();

router.get('ping', (request, response) => {
  response.send('pong');
});
router.use(userRouter);
router.use(addressRouter);
router.use(productRouter);

export { router };
