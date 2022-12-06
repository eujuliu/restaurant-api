import { InternalServerError } from 'core/domain/errors';
import { Request, Response } from 'express';
import { GetAddressesUseCase } from 'modules/addresses/use-cases/get-addresses/get-addresses-use-case';

export class GetAddressesController {
  constructor(private getAddressesUseCase: GetAddressesUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const decoded_token: { id: string } = response.locals.decoded_token;

      const responseOrError = await this.getAddressesUseCase.execute({
        userId: decoded_token.id,
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
