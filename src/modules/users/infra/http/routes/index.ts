import { Router } from 'express';
import { CustomRequest, authenticateToken } from 'infra/http/middleware/auth';
import { changePasswordFactory } from 'modules/users/factories/change-password-factory';
import { createUserFactory } from 'modules/users/factories/create-user-factory';
import { getUserFactory } from 'modules/users/factories/get-user-factory';

const userRouter = Router();

userRouter.post('/users', (request, response) => {
  return createUserFactory().handle(request, response);
});

userRouter.post('/user', (request, response) => {
  return getUserFactory().handle(request, response);
});

userRouter.put('/user/security', authenticateToken, (request, response) => {
  return changePasswordFactory().handle(request as CustomRequest, response);
});

export { userRouter };
