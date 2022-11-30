import { InternalServerError, ValidationError } from 'core/domain/errors';
import { Request, Response } from 'express';
import { GetAddressesUseCase } from 'modules/addresses/use-cases/get-addresses/get-addresses-use-case';
import jwt from 'jsonwebtoken';
import { SECRET } from 'config';

export class GetAddressesController {
  constructor(private getAddressesUseCase: GetAddressesUseCase) {}
  async handle(request: Request, response: Response) {
    if (!request.cookies.session_id) {
      return response.status(401).json(new ValidationError({}));
    }

    try {
      const decoded = jwt.verify(await request.cookies.session_id, SECRET);

      const responseOrError = await this.getAddressesUseCase.execute({
        userId: (<{ id: string }>decoded).id,
      });

      if (responseOrError.isLeft()) {
        return response
          .status(responseOrError.value.statusCode)
          .json(responseOrError.value);
      }

      return response.status(200).json(responseOrError.value);
    } catch (err) {
      return response
        .status(500)
        .json(new InternalServerError({ message: (err as Error).message }));
    }
  }
}
