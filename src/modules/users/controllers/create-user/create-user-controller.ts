import { InternalServerError, ValidationError } from 'core/domain/errors';
import { Request, Response } from 'express';
import { CreateUserUseCase } from 'modules/users/use-cases/create-user/create-user-use-case';
import { bodyPropsIsEmpty } from '../utils/body-props-is-empty';

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
    const body: CreateUserBodyProps = await request.body;

    if (bodyPropsIsEmpty(body)) {
      return response.status(400).json(
        new ValidationError({
          message: 'Some field is empty',
          action: 'Verify all fields and try again',
        })
      );
    }

    try {
      const { firstName, lastName, email, password, phone } = body;
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

      return response.status(201).send();
    } catch (err) {
      return response
        .status(500)
        .json(new InternalServerError({ message: (err as Error).message }));
    }
  }
}
