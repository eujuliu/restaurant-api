import { InternalServerError, ValidationError } from 'core/domain/errors';
import { Request, Response } from 'express';
import { GetUserUseCase } from 'modules/users/use-cases/get-user/get-user-use-case';
import { bodyPropsIsEmpty } from '../utils/body-props-is-empty';
import { returnADateSometimeAfter } from '../utils/return-a-date-sometime-after';

export interface GetUserBodyProps {
  email: string;
  password: string;
}

export class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}
  async handle(request: Request, response: Response) {
    const body: GetUserBodyProps = request.body;

    if (bodyPropsIsEmpty(body)) {
      return response.status(400).json(
        new ValidationError({
          message: 'Some field is empty',
          action: 'Verify all fields and try again',
        })
      );
    }

    try {
      const { email, password } = body;
      const responseOrError = await this.getUserUseCase.execute({
        email,
        password,
      });

      if (responseOrError.isLeft()) {
        return response
          .status(responseOrError.value.statusCode)
          .json(responseOrError.value);
      }

      if (!request.cookies.session_id) {
        response.cookie('session_id', responseOrError.value, {
          secure: true,
          httpOnly: true,
          sameSite: 'lax',
          expires: returnADateSometimeAfter({ date: new Date(), hours: 12 }),
        });
      }

      return response.status(200).send();
    } catch (err) {
      return response
        .status(500)
        .json(new InternalServerError({ message: (err as Error).message }));
    }
  }
}
