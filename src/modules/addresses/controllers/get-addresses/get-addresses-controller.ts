import { InternalServerError } from 'core/domain/errors';
import { Response } from 'express';
import { CustomRequest } from 'infra/http/middleware/auth';
import { GetAddressesUseCase } from 'modules/addresses/use-cases/get-addresses/get-addresses-use-case';

export class GetAddressesController {
  constructor(private getAddressesUseCase: GetAddressesUseCase) {}
  async handle(request: CustomRequest, response: Response) {
    try {
      const decoded = request.decoded as { id: string };

      const responseOrError = await this.getAddressesUseCase.execute({
        userId: decoded.id,
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
