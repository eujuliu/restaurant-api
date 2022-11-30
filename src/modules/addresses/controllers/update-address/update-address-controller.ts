import { InternalServerError, ValidationError } from 'core/domain/errors';
import { bodyPropsIsEmpty } from 'core/domain/utils/body-props-is-empty';
import { Request, Response } from 'express';
import { UpdateAddressUseCase } from 'modules/addresses/use-cases/update-address/update-address-use-case';

interface UpdateAddressBodyProps {
  id: string;
  name?: string;
  address?: string;
  address2?: string;
  district?: string;
  city?: string;
  state?: string;
  postalCode?: string;
}

export class UpdateAddressController {
  constructor(private updateAddressUseCase: UpdateAddressUseCase) {}
  async handle(request: Request, response: Response) {
    if (!request.cookies.session_id) {
      return response.status(401).json(new ValidationError({}));
    }

    const {
      id,
      name,
      address,
      address2,
      district,
      city,
      state,
      postalCode,
    }: UpdateAddressBodyProps = await request.body;

    if (bodyPropsIsEmpty({ id })) {
      return response.status(400).json(
        new ValidationError({
          message: 'The ID is required',
          action: 'Please verify if the ID is present',
        })
      );
    }

    try {
      const responseOrError = await this.updateAddressUseCase.execute({
        id,
        name,
        address,
        address2,
        district,
        city,
        state,
        postalCode,
      });

      if (responseOrError.isLeft()) {
        return response
          .status(responseOrError.value.statusCode)
          .json(responseOrError.value);
      }

      return response.status(200).send();
    } catch (err) {
      return response
        .status(500)
        .json(new InternalServerError({ message: (err as Error).message }));
    }
  }
}
