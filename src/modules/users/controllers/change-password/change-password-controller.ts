import 'dotenv/config';

import { Response } from 'express';
import { ChangePasswordUseCase } from 'modules/users/use-cases/change-password/change-password-use-case';
import { InternalServerError, ValidationError } from 'core/domain/errors';
import { bodyPropsIsEmpty } from 'core/controller/utils/body-props-is-empty';
import { CustomRequest } from 'infra/http/middleware/auth';

export interface ChangePasswordBodyProps {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export class ChangePasswordController {
  constructor(private changePasswordUseCase: ChangePasswordUseCase) {}
  async handle(request: CustomRequest, response: Response) {
    const {
      oldPassword,
      newPassword,
      confirmNewPassword,
    }: ChangePasswordBodyProps = request.body;

    if (bodyPropsIsEmpty({ oldPassword, newPassword, confirmNewPassword })) {
      return response.status(400).json(
        new ValidationError({
          message: 'Some field is empty',
          action: 'Verify all fields and try again',
        })
      );
    }

    try {
      const decoded = request.decoded as { email: string };

      const responseOrError = await this.changePasswordUseCase.execute({
        email: decoded.email,
        oldPassword,
        newPassword,
        confirmNewPassword,
      });

      if (responseOrError.isLeft()) {
        return response
          .status(responseOrError.value.statusCode)
          .json(responseOrError.value);
      }

      return response.status(200).send();
    } catch (err) {
      return response
        .status(500)
        .json(new InternalServerError({ message: (err as Error).message }));
    }
  }
}
