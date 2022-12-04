import { InternalServerError, ValidationError } from 'core/domain/errors';
import { bodyPropsIsEmpty } from 'core/domain/utils/body-props-is-empty';
import { Request, Response } from 'express';
import { DeleteAddressUseCase } from 'modules/addresses/use-cases/delete-address/delete-address-use-case';

interface DeleteAddressBodyProps {
  id: string;
}

export class DeleteAddressController {
  constructor(private deleteAddressUseCase: DeleteAddressUseCase) {}
  async handle(request: Request, response: Response) {
    if (!request.cookies.session_id) {
      return response.status(401).json(new ValidationError({}));
    }

    const { id }: DeleteAddressBodyProps = await request.body;

    if (bodyPropsIsEmpty({ id })) {
      return response.status(400).json(
        new ValidationError({
          message: 'The ID is required',
          action: 'Please verify if the ID is present',
        })
      );
    }

    try {
      const responseOrError = await this.deleteAddressUseCase.execute({ id });

      if (responseOrError.isLeft()) {
        return response
          .status(responseOrError.value.statusCode)
          .json(responseOrError.value);
      }

      return response.status(202).send();
    } catch (err) {
      return response
        .status(500)
        .json(new InternalServerError({ message: (err as Error).message }));
    }
  }
}
