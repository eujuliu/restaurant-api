import { InternalServerError } from 'core/domain/errors';
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
        message: responseOrError.value,
      });
    } catch (err) {
      return response
        .status(500)
        .json(new InternalServerError({ message: (err as Error).message }));
    }
  }
}
