import { InternalServerError, ValidationError } from 'core/domain/errors';
import { bodyPropsIsEmpty } from 'core/controller/utils/body-props-is-empty';
import { Request, Response } from 'express';
import { CreateUserUseCase } from 'modules/users/use-cases/create-user/create-user-use-case';

export interface CreateUserBodyProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  async handle(request: Request, response: Response) {
    const { firstName, lastName, email, password, phone } = request.body;

    if (bodyPropsIsEmpty({ firstName, lastName, email, password, phone })) {
      return response.status(400).json(
        new ValidationError({
          message: 'Some field is empty',
          action: 'Verify all fields and try again',
        })
      );
    }

    try {
      const responseOrError = await this.createUserUseCase.execute({
        firstName,
        lastName,
        email,
        password,
        phone,
      });

      if (responseOrError.isLeft()) {
        return response
          .status(responseOrError.value.statusCode)
          .json(responseOrError.value);
      }

      return response.status(201).json({
        message: `Welcome ${firstName} ${lastName}, please login to access your account`,
      });
    } catch (err) {
      return response
        .status(500)
        .json(new InternalServerError({ message: (err as Error).message }));
    }
  }
}
