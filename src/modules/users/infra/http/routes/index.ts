import { Router } from 'express';
import { createUserFactory } from 'modules/users/factories/create-user-factory';

const userRouter = Router();

userRouter.post('/users', (request, response) => {
  return createUserFactory().handle(request, response);
});

export { userRouter };
