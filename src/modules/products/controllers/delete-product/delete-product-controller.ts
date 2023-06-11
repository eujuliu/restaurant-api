import { InternalServerError } from 'core/domain/errors';
import { Response } from 'express';
import { CustomRequest } from 'infra/http/middleware/auth';
import { DeleteProductUseCase } from 'modules/products/use-cases/delete-product/delete-product-use-case';

export interface DeleteProductBodyProps {
  criteria: string[];
}

export class DeleteProductController {
  constructor(private deleteProductUseCase: DeleteProductUseCase) {}

  async handle(request: CustomRequest, response: Response) {
    const { criteria }: DeleteProductBodyProps = request.body;

    try {
      const decoded = request.decoded as { id: string };
      const responseOrError = await this.deleteProductUseCase.execute({
        criteria,
        userId: decoded.id,
      });

      if (responseOrError.isLeft()) {
        return response
          .status(responseOrError.value.statusCode)
          .json(responseOrError.value);
      }

      return response.status(200).json({
        message: responseOrError.value,
      });
    } catch (err) {
      return response
        .status(500)
        .json(new InternalServerError({ message: (err as Error).message }));
    }
  }
}
