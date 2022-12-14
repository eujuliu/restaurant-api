import { Router } from 'express';
import { authenticateJsonWebToken } from 'infra/http/middleware/authenticate-json-web-token';
import { changePasswordFactory } from 'modules/users/factories/change-password-factory';
import { createUserFactory } from 'modules/users/factories/create-user-factory';
import { getUserFactory } from 'modules/users/factories/get-user-factory';

const userRouter = Router();

userRouter.post('/users', (request, response) => {
  return createUserFactory().handle(request, response);
});

userRouter.get('/user', (request, response) => {
  return getUserFactory().handle(request, response);
});

userRouter.put(
  '/user/security',
  authenticateJsonWebToken,
  (request, response) => {
    return changePasswordFactory().handle(request, response);
  }
);

export { userRouter };
