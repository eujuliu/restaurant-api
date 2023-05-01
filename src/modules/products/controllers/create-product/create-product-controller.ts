import { InternalServerError, ValidationError } from 'core/domain/errors';
import { bodyPropsIsEmpty } from 'core/controller/utils/body-props-is-empty';
import { Response } from 'express';
import { CustomRequest } from 'infra/http/middleware/auth';
import { CreateProductUseCase } from 'modules/products/use-cases/create-product/create-product-use-case';

export interface CreateProductBodyProps {
  name: string;
  price: number;
  description: string;
  discount: number | null;
  available: boolean;
  images: string[];
}

export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  async handle(request: CustomRequest, response: Response) {
    const {
      name,
      price,
      discount,
      description,
      images,
      available,
    }: CreateProductBodyProps = await request.body;

    if (
      bodyPropsIsEmpty({
        name,
        price,
        description,
        discount,
        available,
      })
    ) {
      return response.status(400).json(
        new ValidationError({
          message: 'Some field is empty',
          action: 'Verify all fields and try again',
        })
      );
    }

    try {
      const decoded = request.decoded as { id: string };
      const responseOrError = await this.createProductUseCase.execute({
        userId: decoded.id,
        name,
        price,
        discount,
        description,
        images,
        available,
      });

      if (responseOrError.isLeft()) {
        return response
          .status(responseOrError.value.statusCode)
          .json(responseOrError.value);
      }

      return response.status(201).json({
        message: `Product ${name} was created successfully`,
      });
    } catch (err) {
      return response
        .status(500)
        .json(new InternalServerError({ message: (err as Error).message }));
    }
  }
}
