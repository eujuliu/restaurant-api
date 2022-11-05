import { UnexpectedError } from 'core/logic/app-error';
import { Request, Response } from 'express';
import { CreateUserUseCase } from 'modules/users/use-cases/create-user/create-user-use-case';

export interface BodyProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  async handle(request: Request, response: Response) {
    const { firstName, lastName, email, password, phone }: BodyProps =
      await request.body;

    try {
      const valueOrError = await this.createUserUseCase.execute({
        firstName,
        lastName,
        email,
        password,
        phone,
      });

      if (valueOrError.isLeft()) {
        return response.status(400).json({
          error: valueOrError.value.message,
        });
      }

      return response.status(201).json({
        message: valueOrError.value,
      });
    } catch (err) {
      return response.status(500).json({
        error: new UnexpectedError(err),
      });
    }
  }
}
