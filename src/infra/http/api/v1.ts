import { Router } from 'express';
import { addressRouter } from 'modules/addresses/infra/http/routes';
import { userRouter } from 'modules/users/infra/http/routes';

const router = Router();

router.use(userRouter);
router.use(addressRouter);

export { router };
