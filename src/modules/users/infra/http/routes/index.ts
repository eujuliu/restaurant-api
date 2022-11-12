import { Router } from 'express';
import { createUserFactory } from 'modules/users/factories/create-user-factory';
import { getUserFactory } from 'modules/users/factories/get-user-factory';

const userRouter = Router();

userRouter.post('/users', (request, response) => {
  return createUserFactory().handle(request, response);
});

userRouter.get('/users', (request, response) => {
  return getUserFactory().handle(request, response);
});

export { userRouter };
