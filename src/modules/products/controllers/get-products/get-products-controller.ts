import { InternalServerError } from 'core/domain/errors';
import { Response } from 'express';
import { CustomRequest } from 'infra/http/middleware/auth';
import { GetProductsUseCase } from 'modules/products/use-cases/get-products/get-products-use-case';

export class GetProductsController {
  constructor(private getProductsUseCase: GetProductsUseCase) {}

  async handle(request: CustomRequest, response: Response) {
    const { limit, offset }: { limit?: number; offset?: number } =
      request.query;

    try {
      const decoded = request.decoded as { id: string };

      const responseOrError = await this.getProductsUseCase.execute({
        userId: decoded.id,
        limit,
        offset,
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
