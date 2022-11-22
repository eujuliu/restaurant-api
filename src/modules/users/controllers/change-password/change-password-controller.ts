import { Request, Response } from 'express';
import { ChangePasswordUseCase } from 'modules/users/use-cases/change-password/change-password-use-case';
import { InternalServerError, ValidationError } from 'core/domain/errors';
import { SECRET } from 'config';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { bodyPropsIsEmpty } from '../utils/body-props-is-empty';

export interface ChangePasswordBodyProps {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export class ChangePasswordController {
  constructor(private changePasswordUseCase: ChangePasswordUseCase) {}
  async handle(request: Request, response: Response) {
    if (!request.cookies.session_id) {
      return response.status(401).json(new ValidationError({}));
    }

    const body: ChangePasswordBodyProps = request.body;

    if (bodyPropsIsEmpty(body)) {
      return response.status(400).json(
        new ValidationError({
          message: 'Some field is empty',
          action: 'Verify all fields and try again',
        })
      );
    }

    try {
      const { oldPassword, newPassword, confirmNewPassword } = body;
      const decoded = jwt.verify(await request.cookies.session_id, SECRET);

      const responseOrError = await this.changePasswordUseCase.execute({
        email: (<{ email: string }>decoded).email,
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
