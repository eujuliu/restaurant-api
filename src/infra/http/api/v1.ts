import { Router } from 'express';
import { userRouter } from 'modules/users/infra/http/routes';

const router = Router();

router.use(userRouter);

export { router };
